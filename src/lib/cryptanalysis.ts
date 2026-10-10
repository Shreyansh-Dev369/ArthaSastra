import { ALPHABET, caesar } from './ciphers';
import { CryptanalysisResult, LetterFrequencyItem, CaesarCandidate } from '../types/dispatch';

/**
 * Standard English letter frequency distribution in percentages (A-Z).
 * Sourced from cryptographic standard frequency corpora (Beker & Piper / Lewand).
 */
export const ENGLISH_EXPECTED_FREQUENCIES: Record<string, number> = {
  a: 8.167, b: 1.492, c: 2.782, d: 4.253, e: 12.702,
  f: 2.228, g: 2.015, h: 6.094, i: 6.966, j: 0.153,
  k: 0.772, l: 4.025, m: 2.406, n: 6.749, o: 7.507,
  p: 1.929, q: 0.095, r: 5.987, s: 6.327, t: 9.056,
  u: 2.758, v: 0.978, w: 2.360, x: 0.150, y: 1.974,
  z: 0.074,
};

/**
 * Extracts and normalizes alphabetic characters.
 */
export function extractLetters(text: string): string[] {
  return [...text.toLowerCase()].filter(c => ALPHABET.includes(c));
}

/**
 * Calculates the Friedman Index of Coincidence (IC) of a text.
 * Formula: IC = sum(f_i * (f_i - 1)) / (N * (N - 1))
 * - Typical English monoalphabetic ciphertext: IC ~ 0.065 to 0.068
 * - Typical polyalphabetic / random ciphertext: IC ~ 0.0385 (approaching 1/26)
 */
export function calculateIndexOfCoincidence(text: string): number {
  const letters = extractLetters(text);
  const n = letters.length;
  if (n < 2) return 0;

  const counts: Record<string, number> = {};
  for (const char of letters) {
    counts[char] = (counts[char] || 0) + 1;
  }

  const numerator = Object.values(counts).reduce((acc, count) => acc + count * (count - 1), 0);
  const denominator = n * (n - 1);

  return numerator / denominator;
}

/**
 * Calculates Pearson's Chi-Square statistic comparing observed letter counts to expected English counts.
 * Formula: Chi2 = sum((observed_i - expected_i)^2 / expected_i)
 * Lower values indicate a closer fit to English orthography.
 */
export function calculateChiSquareScore(text: string): number {
  const letters = extractLetters(text);
  const n = letters.length;
  if (n === 0) return Infinity;

  const counts: Record<string, number> = {};
  for (const ch of ALPHABET) {
    counts[ch] = 0;
  }
  for (const ch of letters) {
    counts[ch] = (counts[ch] || 0) + 1;
  }

  let chiSquare = 0;
  for (const ch of ALPHABET) {
    const expectedCount = (n * ENGLISH_EXPECTED_FREQUENCIES[ch]) / 100;
    const observedCount = counts[ch];
    const diff = observedCount - expectedCount;
    chiSquare += (diff * diff) / (expectedCount || 0.001);
  }

  return chiSquare;
}

/**
 * Exhaustive Caesar shift cryptanalysis testing all 26 shift candidates (0-25).
 * Evaluates candidate plaintexts using Chi-Square scoring.
 */
export function crackCaesarCandidates(ciphertext: string): CaesarCandidate[] {
  const candidates: CaesarCandidate[] = [];

  for (let shift = 0; shift < 26; shift++) {
    const decrypted = caesar(ciphertext, shift, true);
    const score = calculateChiSquareScore(decrypted);
    candidates.push({
      shift,
      score,
      plain: decrypted,
    });
  }

  // Sort candidates by lowest chi-square score (best fit to English)
  return candidates.sort((a, b) => a.score - b.score);
}

/**
 * Full cryptanalytic profile:
 * - Complete A-Z frequency table (all 26 letters).
 * - Index of coincidence calculation.
 * - Top Caesar shift candidates.
 * - Scholarly diagnostic commentary.
 */
export function analyzeCiphertext(text: string): CryptanalysisResult {
  const letters = extractLetters(text);
  const totalLetters = letters.length;

  // Build complete 26-letter counts
  const counts: Record<string, number> = {};
  for (const ch of ALPHABET) {
    counts[ch] = 0;
  }
  for (const ch of letters) {
    counts[ch]++;
  }

  const frequencies: LetterFrequencyItem[] = ALPHABET.split('').map(letter => {
    const count = counts[letter];
    const observedPercent = totalLetters > 0 ? (count / totalLetters) * 100 : 0;
    const expectedPercent = ENGLISH_EXPECTED_FREQUENCIES[letter];
    return {
      letter: letter.toUpperCase(),
      count,
      observedPercent,
      expectedPercent,
    };
  });

  const ic = calculateIndexOfCoincidence(text);
  const candidates = crackCaesarCandidates(text);
  const bestCandidate = candidates[0] || { shift: 0, score: Infinity, plain: text };

  // Formulate scholarly educational notes
  let notes = `Sample contains ${totalLetters} alphabetic characters. Index of Coincidence (IC) is ${ic.toFixed(4)}. `;
  if (totalLetters < 25) {
    notes += `CAUTION: Sample is short (<25 letters). Statistical distributions are prone to severe sampling error, rendering IC and frequency heuristics volatile. `;
  } else if (ic >= 0.055) {
    notes += `The elevated IC (${ic.toFixed(4)} >= 0.055) reflects high statistical variance, characteristic of unshifted natural English or monoalphabetic substitution (e.g. Caesar). `;
  } else {
    notes += `The depressed IC (${ic.toFixed(4)} < 0.055) reflects a flattened frequency distribution, which often indicates polyalphabetic mixing (e.g. Vigenère) or uniform random noise. `;
  }

  notes += `Best Caesar candidate is Shift ${bestCandidate.shift} (Chi-Square: ${bestCandidate.score.toFixed(2)}). Note that chi-square is an empirical heuristic, not absolute mathematical proof.`;

  return {
    ic,
    letterCount: totalLetters,
    frequencies,
    bestShift: bestCandidate.shift,
    bestScore: bestCandidate.score,
    bestPlain: bestCandidate.plain,
    candidates,
    notes,
  };
}
