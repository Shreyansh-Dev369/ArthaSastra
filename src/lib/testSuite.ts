import { caesar, vigenere, reciprocal, RECIPROCAL_TABLE, ALPHABET } from './ciphers';
import {
  canonicalizePacketData,
  computeHmacSha256,
  verifyHmacSeal,
  verifyAndReceiveDispatch,
  exportPacketToJson,
  importPacketFromJson,
} from './crypto';
import {
  calculateIndexOfCoincidence,
  crackCaesarCandidates,
  analyzeCiphertext,
} from './cryptanalysis';
import { CanonicalDispatchPacket, TestExecutionResult } from '../types/dispatch';

export interface TestCaseDefinition {
  id: string;
  title: string;
  category: 'ciphers' | 'authentication' | 'authorization' | 'cryptanalysis' | 'lifecycle';
  description: string;
  run: () => Promise<boolean> | boolean;
}

export const TEST_SUITE_DEFINITIONS: TestCaseDefinition[] = [
  {
    id: 'ciphers-caesar-roundtrip',
    title: 'Caesar Cipher Round-Trip & Punctuation',
    category: 'ciphers',
    description: 'Verifies that Caesar encryption followed by decryption reproduces the original text, preserving mixed casing, punctuation, and whitespace.',
    run: () => {
      const original = 'Meet the royal envoy at Dawn, near the Eastern Gate #4!';
      const encrypted = caesar(original, 7);
      const decrypted = caesar(encrypted, 7, true);
      return original === decrypted && encrypted !== original;
    },
  },
  {
    id: 'ciphers-caesar-normalization',
    title: 'Caesar Shift Modulo Normalization',
    category: 'ciphers',
    description: 'Ensures Caesar handles shifts greater than 26 and negative shifts symmetrically.',
    run: () => {
      const original = 'Secret Royal Edict';
      const shifted57 = caesar(original, 57); // 57 % 26 = 5
      const shifted5 = caesar(original, 5);
      const shiftedNeg = caesar(original, -21); // -21 % 26 = 5
      return shifted57 === shifted5 && shiftedNeg === shifted5;
    },
  },
  {
    id: 'ciphers-vigenere-roundtrip',
    title: 'Vigenère Polyalphabetic Round-Trip',
    category: 'ciphers',
    description: 'Verifies Vigenère encryption and decryption over polyalphabetic key sequences, correctly skipping non-alphabetic chars.',
    run: () => {
      const original = 'Protect the treasury scrolls: Treaty of Pataliputra 320 BCE!';
      const key = 'arthasastra';
      const enc = vigenere(original, key);
      const dec = vigenere(enc, key, true);
      return original === dec && enc !== original;
    },
  },
  {
    id: 'ciphers-vigenere-invalid-key',
    title: 'Vigenère Key Validation Error Handling',
    category: 'ciphers',
    description: 'Ensures Vigenère throws a meaningful descriptive error when given an empty or non-alphabetic keyword.',
    run: () => {
      try {
        vigenere('Test message', '12345!@#');
        return false;
      } catch (err) {
        return err instanceof Error && err.message.includes('Keyword must contain');
      }
    },
  },
  {
    id: 'ciphers-reciprocal-roundtrip',
    title: 'Reciprocal Substitution Round-Trip',
    category: 'ciphers',
    description: 'Verifies that applying reciprocal substitution twice restores the original text.',
    run: () => {
      const original = 'Gupta Empire Mandate — Top Secret Dispatch!';
      const enc = reciprocal(original);
      const dec = reciprocal(enc);
      return original === dec && enc !== original;
    },
  },
  {
    id: 'ciphers-reciprocal-involution',
    title: 'Reciprocal Table Involution (f(f(x)) === x)',
    category: 'ciphers',
    description: 'Mathematically verifies that every letter in the 26-letter alphabet maps to a partner such that Table[Table[ch]] === ch.',
    run: () => {
      const keys = Object.keys(RECIPROCAL_TABLE);
      if (keys.length !== 26) return false;
      return keys.every(ch => RECIPROCAL_TABLE[RECIPROCAL_TABLE[ch]] === ch && RECIPROCAL_TABLE[ch] !== ch);
    },
  },
  {
    id: 'cryptanalysis-full-alphabet',
    title: 'Full 26-Letter Frequency Distribution Coverage',
    category: 'cryptanalysis',
    description: 'Audits the frequency analysis module to confirm it tracks all 26 letters (A–Z) without truncation.',
    run: () => {
      const sample = 'The quick brown fox jumps over the lazy dog';
      const res = analyzeCiphertext(sample);
      const letterLetters = res.frequencies.map(f => f.letter).sort().join('');
      return res.frequencies.length === 26 && letterLetters === ALPHABET.toUpperCase();
    },
  },
  {
    id: 'cryptanalysis-ic-range',
    title: 'Index of Coincidence Bound Verification',
    category: 'cryptanalysis',
    description: 'Verifies Friedman IC returns a mathematically valid value within the [0, 1] probability range.',
    run: () => {
      const ic1 = calculateIndexOfCoincidence('mississippi');
      const ic2 = calculateIndexOfCoincidence('aaaaaaaaaaaa');
      const ic3 = calculateIndexOfCoincidence('abcdefghijklmnopqrstuvwxyz');
      return ic1 >= 0 && ic1 <= 1 && ic2 === 1 && ic3 === 0;
    },
  },
  {
    id: 'cryptanalysis-caesar-recovery',
    title: 'Caesar Shift Recovery via Chi-Square Heuristic',
    category: 'cryptanalysis',
    description: 'Validates that the Caesar breaker accurately identifies the expected shift on a natural English corpus.',
    run: () => {
      const corpus = 'The ancient royal treasury records indicate that grain stores in the northern citadel are sufficient for winter campaigns.';
      const shifted = caesar(corpus, 9);
      const candidates = crackCaesarCandidates(shifted);
      return candidates[0].shift === 9;
    },
  },
  {
    id: 'cryptanalysis-empty-safe',
    title: 'Cryptanalysis Edge Case Handling',
    category: 'cryptanalysis',
    description: 'Confirms that empty strings or symbol-only inputs do not trigger crashes or divide-by-zero exceptions.',
    run: () => {
      const res = analyzeCiphertext('12345 !@#$%^&*()');
      return res.letterCount === 0 && res.ic === 0 && res.frequencies.length === 26;
    },
  },
  {
    id: 'auth-valid-hmac',
    title: 'HMAC-SHA-256 Deterministic Generation & Verification',
    category: 'authentication',
    description: 'Verifies that Web Crypto API HMAC-SHA-256 authenticates canonical data deterministically with a shared secret key.',
    run: async () => {
      const payload = 'ARTHASASTRA-CANONICAL-TEST-STRING';
      const key = 'royal-seal-key-42';
      const seal = await computeHmacSha256(payload, key);
      const { verified } = await verifyHmacSeal(payload, key, seal);
      return verified && seal.length === 64;
    },
  },
  {
    id: 'auth-wrong-key-rejection',
    title: 'Rejection of Incorrect Verification Key',
    category: 'authentication',
    description: 'Confirms that an incorrect verification key fails HMAC verification.',
    run: async () => {
      const payload = 'ARTHASASTRA-CANONICAL-TEST-STRING';
      const seal = await computeHmacSha256(payload, 'correct-key');
      const { verified } = await verifyHmacSeal(payload, 'wrong-key', seal);
      return !verified;
    },
  },
  {
    id: 'auth-tampered-body-rejection',
    title: 'Rejection of Tampered Ciphertext Body',
    category: 'authentication',
    description: 'Confirms that altering a single character in the encrypted message body invalidates the seal.',
    run: async () => {
      const packet: CanonicalDispatchPacket = {
        version: '1.0',
        from: 'envoy_kautilya',
        level: 'secret',
        cipher: 'caesar',
        params: { shift: 5 },
        body: 'yjxy rjxxflj',
        createdAt: '2026-10-10T12:00:00Z',
        seal: '',
      };
      const canonical = canonicalizePacketData(packet);
      packet.seal = await computeHmacSha256(canonical, 'secret-key');

      // Tamper body
      const tamperedPacket = { ...packet, body: packet.body + 'x' };
      const res = await verifyAndReceiveDispatch(tamperedPacket, 'secret-key', 'secret');
      return !res.isValid && res.status === 'integrity_failed';
    },
  },
  {
    id: 'auth-tampered-sender-rejection',
    title: 'Rejection of Tampered Sender Identity (Audit Fix)',
    category: 'authentication',
    description: 'Audited vulnerability fix: tampering with sender identity must cause HMAC seal mismatch.',
    run: async () => {
      const packet: CanonicalDispatchPacket = {
        version: '1.0',
        from: 'envoy_kautilya',
        level: 'secret',
        cipher: 'caesar',
        params: { shift: 5 },
        body: 'yjxy rjxxflj',
        createdAt: '2026-10-10T12:00:00Z',
        seal: '',
      };
      packet.seal = await computeHmacSha256(canonicalizePacketData(packet), 'secret-key');

      // Tamper sender identity
      const tampered = { ...packet, from: 'imposter_agent' };
      const res = await verifyAndReceiveDispatch(tampered, 'secret-key', 'secret');
      return !res.isValid && res.status === 'integrity_failed';
    },
  },
  {
    id: 'auth-tampered-shift-rejection',
    title: 'Rejection of Tampered Cipher Parameter (Audit Fix)',
    category: 'authentication',
    description: 'Audited vulnerability fix: tampering with the Caesar shift parameter must invalidate the seal tag.',
    run: async () => {
      const packet: CanonicalDispatchPacket = {
        version: '1.0',
        from: 'envoy_kautilya',
        level: 'secret',
        cipher: 'caesar',
        params: { shift: 5 },
        body: 'yjxy rjxxflj',
        createdAt: '2026-10-10T12:00:00Z',
        seal: '',
      };
      packet.seal = await computeHmacSha256(canonicalizePacketData(packet), 'secret-key');

      // Tamper shift from 5 to 19
      const tampered = { ...packet, params: { shift: 19 } };
      const res = await verifyAndReceiveDispatch(tampered, 'secret-key', 'secret');
      return !res.isValid && res.status === 'integrity_failed';
    },
  },
  {
    id: 'auth-tampered-level-rejection',
    title: 'Rejection of Tampered Classification Level (Audit Fix)',
    category: 'authentication',
    description: 'Audited vulnerability fix: tampering with message classification must invalidate the seal tag.',
    run: async () => {
      const packet: CanonicalDispatchPacket = {
        version: '1.0',
        from: 'envoy_kautilya',
        level: 'secret',
        cipher: 'caesar',
        params: { shift: 5 },
        body: 'yjxy rjxxflj',
        createdAt: '2026-10-10T12:00:00Z',
        seal: '',
      };
      packet.seal = await computeHmacSha256(canonicalizePacketData(packet), 'secret-key');

      // Tamper classification from secret to open
      const tampered = { ...packet, level: 'open' as const };
      const res = await verifyAndReceiveDispatch(tampered, 'secret-key', 'secret');
      return !res.isValid && res.status === 'integrity_failed';
    },
  },
  {
    id: 'auth-denied-clearance-open',
    title: 'Clearance Policy: Open Receiver Denied Secret Packet',
    category: 'authorization',
    description: 'Audited policy fix: Receiver with Open clearance must be denied Secret dispatch, even with authentic seal.',
    run: async () => {
      const packet: CanonicalDispatchPacket = {
        version: '1.0',
        from: 'envoy_kautilya',
        level: 'secret',
        cipher: 'caesar',
        params: { shift: 5 },
        body: 'yjxy rjxxflj',
        createdAt: '2026-10-10T12:00:00Z',
        seal: '',
      };
      packet.seal = await computeHmacSha256(canonicalizePacketData(packet), 'shared-key');

      const res = await verifyAndReceiveDispatch(packet, 'shared-key', 'open');
      return res.isValid && !res.isAuthorized && res.status === 'verified_denied' && !res.decryptedText;
    },
  },
  {
    id: 'auth-denied-clearance-counsel',
    title: 'Clearance Policy: Counsel Receiver Denied Secret Packet',
    category: 'authorization',
    description: 'Receiver with Counsel clearance cannot read Secret dispatches.',
    run: async () => {
      const packet: CanonicalDispatchPacket = {
        version: '1.0',
        from: 'prime_minister',
        level: 'secret',
        cipher: 'caesar',
        params: { shift: 5 },
        body: 'yjxy rjxxflj',
        createdAt: '2026-10-10T12:00:00Z',
        seal: '',
      };
      packet.seal = await computeHmacSha256(canonicalizePacketData(packet), 'shared-key');

      const res = await verifyAndReceiveDispatch(packet, 'shared-key', 'counsel');
      return res.isValid && !res.isAuthorized && res.status === 'verified_denied' && !res.decryptedText;
    },
  },
  {
    id: 'auth-approved-clearance-secret',
    title: 'Clearance Policy: Secret Receiver Authorized & Decrypts',
    category: 'authorization',
    description: 'Receiver with Secret clearance is authorized to decrypt valid Secret packet.',
    run: async () => {
      const plain = 'Fortifications inspected and secure at western rampart.';
      const shift = 7;
      const packet: CanonicalDispatchPacket = {
        version: '1.0',
        from: 'commander_senapati',
        level: 'secret',
        cipher: 'caesar',
        params: { shift },
        body: caesar(plain, shift),
        createdAt: '2026-10-10T12:00:00Z',
        seal: '',
      };
      packet.seal = await computeHmacSha256(canonicalizePacketData(packet), 'shared-key');

      const res = await verifyAndReceiveDispatch(packet, 'shared-key', 'secret');
      return res.isValid && res.isAuthorized && res.status === 'verified_authorized' && res.decryptedText === plain;
    },
  },
  {
    id: 'lifecycle-export-import-roundtrip',
    title: 'Full Lifecycle: Export, Import, Verification & Decrypt',
    category: 'lifecycle',
    description: 'Validates complete end-to-end serialization round trip: export to JSON string, re-import with schema validation, seal verification, and decryption.',
    run: async () => {
      const originalPlain = 'The royal seal remains unbroken across provinces.';
      const key = 'pataliputra-2026';
      const packet: CanonicalDispatchPacket = {
        version: '1.0',
        from: 'royal_scribe',
        level: 'counsel',
        cipher: 'vigenere',
        params: { key: 'kautilya' },
        body: vigenere(originalPlain, 'kautilya'),
        createdAt: '2026-10-10T14:30:00Z',
        seal: '',
      };
      packet.seal = await computeHmacSha256(canonicalizePacketData(packet), key);

      // Export
      const jsonExport = exportPacketToJson(packet);
      // Import
      const importResult = importPacketFromJson(jsonExport);
      if (!importResult.success || !importResult.packet) return false;

      // Verify and receive
      const verification = await verifyAndReceiveDispatch(importResult.packet, key, 'counsel');
      return (
        verification.isValid &&
        verification.isAuthorized &&
        verification.decryptedText === originalPlain
      );
    },
  },
];

export async function executeTestSuite(): Promise<TestExecutionResult[]> {
  const results: TestExecutionResult[] = [];

  for (const test of TEST_SUITE_DEFINITIONS) {
    const startTime = performance.now();
    let passed = false;
    let error: string | undefined;

    try {
      passed = await test.run();
    } catch (err: unknown) {
      passed = false;
      error = err instanceof Error ? err.message : String(err);
    }
    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

    results.push({
      id: test.id,
      title: test.title,
      category: test.category,
      passed,
      description: test.description,
      error,
      durationMs,
    });
  }

  return results;
}
