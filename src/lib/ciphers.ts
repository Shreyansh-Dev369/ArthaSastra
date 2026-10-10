export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Classical Caesar Substitution Cipher
 * Preserves casing, whitespace, and punctuation.
 * Normalizes any integer shift key (positive, negative, large).
 */
export function caesar(text: string, shift: number, decrypt = false): string {
  let k = ((Number(shift) || 0) % 26 + 26) % 26;
  if (decrypt) {
    k = (26 - k) % 26;
  }

  return [...text].map(char => {
    const lower = char.toLowerCase();
    const idx = ALPHABET.indexOf(lower);
    if (idx < 0) return char;

    const shiftedChar = ALPHABET[(idx + k) % 26];
    return char === lower ? shiftedChar : shiftedChar.toUpperCase();
  }).join('');
}

/**
 * Deterministic Linear Congruential Generator (LCG)
 * Seed 7 preserved from historical baseline demonstration.
 */
function createLcg(seed = 7): () => number {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * Generate a 13-pair reciprocal substitution table (involution: f(f(x)) === x).
 */
export function generateReciprocalTable(seed = 7): Record<string, string> {
  const letters = [...ALPHABET];
  const rnd = createLcg(seed);

  // Fisher-Yates shuffle with seeded LCG
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const temp = letters[i];
    letters[i] = letters[j];
    letters[j] = temp;
  }

  const table: Record<string, string> = {};
  for (let i = 0; i < letters.length; i += 2) {
    const a = letters[i];
    const b = letters[i + 1];
    table[a] = b;
    table[b] = a;
  }

  return table;
}

export const RECIPROCAL_TABLE = generateReciprocalTable(7);

/**
 * Reciprocal Pair Substitution Cipher
 * Swapping letters according to seeded involution mapping.
 */
export function reciprocal(text: string, table: Record<string, string> = RECIPROCAL_TABLE): string {
  return [...text].map(char => {
    const lower = char.toLowerCase();
    const mapped = table[lower];
    if (!mapped) return char;
    return char === lower ? mapped : mapped.toUpperCase();
  }).join('');
}

/**
 * Classical Vigenère Polyalphabetic Cipher
 * Requires an alphabetic keyword. Preserves non-alphabetic characters without incrementing key stream.
 */
export function vigenere(text: string, key: string, decrypt = false): string {
  const cleanKey = (key || '').toLowerCase().replace(/[^a-z]/g, '');
  if (!cleanKey) {
    throw new Error('Keyword must contain at least one alphabetic letter (A-Z).');
  }

  let keyIndex = 0;
  return [...text].map(char => {
    const lower = char.toLowerCase();
    const charIdx = ALPHABET.indexOf(lower);
    if (charIdx < 0) return char;

    const keyShift = ALPHABET.indexOf(cleanKey[keyIndex % cleanKey.length]);
    keyIndex++;

    const offset = decrypt ? (charIdx - keyShift + 26) % 26 : (charIdx + keyShift) % 26;
    const transformed = ALPHABET[offset];
    return char === lower ? transformed : transformed.toUpperCase();
  }).join('');
}
