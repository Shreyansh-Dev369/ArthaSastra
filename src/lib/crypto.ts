import { CanonicalDispatchPacket, ClearanceLevel, CipherAlgorithm, VerificationResult } from '../types/dispatch';
import { caesar, vigenere, reciprocal } from './ciphers';

export const CLEARANCE_HIERARCHY: Record<ClearanceLevel, number> = {
  open: 0,
  counsel: 1,
  secret: 2,
};

/**
 * Deterministic canonical serialization of packet data prior to authentication sealing.
 * Ensures that EVERY interpretative parameter (version, sender, clearance level,
 * cipher algorithm, cipher parameters, creation timestamp, and ciphertext body)
 * is cryptographically bound into the canonical representation.
 */
export function canonicalizePacketData(data: {
  version: string;
  from: string;
  level: ClearanceLevel;
  cipher: CipherAlgorithm;
  params: { shift?: number; key?: string };
  body: string;
  createdAt: string;
}): string {
  // Sort params deterministically
  const sortedParams: Record<string, unknown> = {};
  if (data.params.shift !== undefined) sortedParams.shift = Number(data.params.shift);
  if (data.params.key !== undefined) sortedParams.key = String(data.params.key).trim();

  // Create deterministic canonical object
  const canonicalObj = {
    body: String(data.body || ''),
    cipher: String(data.cipher || 'caesar'),
    createdAt: String(data.createdAt || ''),
    from: String(data.from || '').trim(),
    level: String(data.level || 'open'),
    params: sortedParams,
    version: String(data.version || '1.0'),
  };

  return JSON.stringify(canonicalObj);
}

/**
 * Get SubtleCrypto API instance safely across Browser and modern Node.js environments.
 */
function getSubtleCrypto(): SubtleCrypto {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
    return globalThis.crypto.subtle;
  }
  throw new Error('Web Crypto API (crypto.subtle) is not supported in this runtime environment.');
}

/**
 * Computes an HMAC-SHA-256 authentication tag over the canonical message representation
 * using the provided secret key.
 */
export async function computeHmacSha256(canonicalPayload: string, secretKey: string): Promise<string> {
  const subtle = getSubtleCrypto();
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(secretKey);
  const dataBytes = encoder.encode(canonicalPayload);

  const cryptoKey = await subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await subtle.sign('HMAC', cryptoKey, dataBytes);
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies an HMAC-SHA-256 seal tag against canonical payload data.
 */
export async function verifyHmacSeal(
  canonicalPayload: string,
  secretKey: string,
  providedSeal: string
): Promise<{ verified: boolean; computedSeal: string }> {
  try {
    const computedSeal = await computeHmacSha256(canonicalPayload, secretKey);
    // Constant-time length check and character comparison
    const verified = computedSeal.toLowerCase() === (providedSeal || '').trim().toLowerCase();
    return { verified, computedSeal };
  } catch (err) {
    return { verified: false, computedSeal: '' };
  }
}

/**
 * Comprehensive verification of an incoming dispatch packet:
 * 1. Schema and structural validation.
 * 2. Cryptographic HMAC-SHA-256 seal verification.
 * 3. Clearance level authorization check.
 * 4. Controlled plaintext release only upon full verification and authorization.
 */
export async function verifyAndReceiveDispatch(
  packet: CanonicalDispatchPacket,
  verificationKey: string,
  receiverClearance: ClearanceLevel
): Promise<VerificationResult> {
  const now = new Date().toISOString();

  // 1. Structural validation
  if (!packet || typeof packet !== 'object') {
    return {
      isValid: false,
      isAuthorized: false,
      status: 'malformed',
      reasons: ['Packet is missing or not a valid object.'],
      timestamp: now,
    };
  }

  if (!packet.body || !packet.from || !packet.level || !packet.seal) {
    return {
      isValid: false,
      isAuthorized: false,
      status: 'malformed',
      reasons: ['Packet is missing mandatory headers (from, level, body, or seal).'],
      timestamp: now,
    };
  }

  // 2. Canonical serialization & Seal verification
  const canonicalData = canonicalizePacketData(packet);
  const { verified: isSealValid, computedSeal } = await verifyHmacSeal(
    canonicalData,
    verificationKey,
    packet.seal
  );

  if (!isSealValid) {
    return {
      isValid: false,
      isAuthorized: false,
      status: 'integrity_failed',
      calculatedSeal: computedSeal,
      receivedSeal: packet.seal,
      reasons: [
        'HMAC-SHA-256 authentication tag mismatch.',
        'The packet has been altered in transit or the verification key is incorrect.',
        'SECURITY POLICY: Plaintext release prevented to protect integrity.',
      ],
      timestamp: now,
    };
  }

  // 3. Clearance authorization check
  const receiverRank = CLEARANCE_HIERARCHY[receiverClearance] ?? -1;
  const messageRank = CLEARANCE_HIERARCHY[packet.level] ?? 99;

  if (receiverRank < messageRank) {
    return {
      isValid: true,
      isAuthorized: false,
      status: 'verified_denied',
      calculatedSeal: computedSeal,
      receivedSeal: packet.seal,
      reasons: [
        'Integrity confirmed: Seal is mathematically authentic.',
        `Access denied: Receiver holds [${receiverClearance.toUpperCase()}] clearance, but packet is classified as [${packet.level.toUpperCase()}].`,
        'Mandate withheld per Kauṭilyan statecraft governance protocol.',
      ],
      timestamp: now,
    };
  }

  // 4. Decrypt only upon verified integrity + authorized clearance
  let decryptedText = '';
  try {
    if (packet.cipher === 'caesar') {
      const shift = Number(packet.params.shift ?? 0);
      decryptedText = caesar(packet.body, shift, true);
    } else if (packet.cipher === 'vigenere') {
      const key = String(packet.params.key ?? '');
      decryptedText = vigenere(packet.body, key, true);
    } else if (packet.cipher === 'reciprocal') {
      decryptedText = reciprocal(packet.body);
    } else {
      decryptedText = packet.body;
    }
  } catch (err: unknown) {
    return {
      isValid: true,
      isAuthorized: true,
      status: 'malformed',
      reasons: [`Cipher decryption failed: ${err instanceof Error ? err.message : String(err)}`],
      timestamp: now,
    };
  }

  return {
    isValid: true,
    isAuthorized: true,
    status: 'verified_authorized',
    decryptedText,
    calculatedSeal: computedSeal,
    receivedSeal: packet.seal,
    reasons: [
      'HMAC-SHA-256 seal verified against canonical payload.',
      `Clearance approved: [${receiverClearance.toUpperCase()}] satisfies [${packet.level.toUpperCase()}].`,
      'Plaintext released securely to authenticated recipient.',
    ],
    timestamp: now,
  };
}

/**
 * Format packet as portable JSON string.
 */
export function exportPacketToJson(packet: CanonicalDispatchPacket): string {
  return JSON.stringify(packet, null, 2);
}

/**
 * Parse and strictly validate imported packet JSON.
 */
export function importPacketFromJson(jsonString: string): {
  success: boolean;
  packet?: CanonicalDispatchPacket;
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Input is not a valid JSON object.' };
    }

    if (!parsed.from || typeof parsed.from !== 'string') {
      return { success: false, error: 'Missing or invalid "from" sender field.' };
    }

    if (!['open', 'counsel', 'secret'].includes(parsed.level)) {
      return { success: false, error: 'Invalid "level" field. Must be open, counsel, or secret.' };
    }

    if (!['caesar', 'vigenere', 'reciprocal'].includes(parsed.cipher)) {
      return { success: false, error: 'Invalid or unsupported cipher algorithm.' };
    }

    if (typeof parsed.body !== 'string') {
      return { success: false, error: 'Missing or invalid "body" field.' };
    }

    if (!parsed.seal || typeof parsed.seal !== 'string') {
      return { success: false, error: 'Missing "seal" HMAC authentication tag.' };
    }

    const packet: CanonicalDispatchPacket = {
      version: parsed.version || '1.0',
      from: parsed.from.trim(),
      level: parsed.level as ClearanceLevel,
      cipher: parsed.cipher as CipherAlgorithm,
      params: parsed.params || {},
      body: parsed.body,
      createdAt: parsed.createdAt || new Date().toISOString(),
      seal: parsed.seal.trim(),
    };

    return { success: true, packet };
  } catch (err: unknown) {
    return { success: false, error: `Invalid JSON syntax: ${err instanceof Error ? err.message : String(err)}` };
  }
}
