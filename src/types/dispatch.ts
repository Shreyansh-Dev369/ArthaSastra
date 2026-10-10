export type ClearanceLevel = 'open' | 'counsel' | 'secret';

export type CipherAlgorithm = 'caesar' | 'vigenere' | 'reciprocal';

export interface CipherParams {
  shift?: number;
  key?: string;
}

export interface CanonicalDispatchPacket {
  version: string;
  from: string;
  level: ClearanceLevel;
  cipher: CipherAlgorithm;
  params: CipherParams;
  body: string;
  createdAt: string;
  seal: string;
}

export interface VerificationResult {
  isValid: boolean;
  isAuthorized: boolean;
  status: 'verified_authorized' | 'verified_denied' | 'integrity_failed' | 'malformed';
  reasons: string[];
  decryptedText?: string;
  calculatedSeal?: string;
  receivedSeal?: string;
  tamperedFields?: string[];
  timestamp: string;
}

export interface LetterFrequencyItem {
  letter: string;
  count: number;
  observedPercent: number;
  expectedPercent: number;
}

export interface CaesarCandidate {
  shift: number;
  score: number;
  plain: string;
}

export interface CryptanalysisResult {
  ic: number;
  letterCount: number;
  frequencies: LetterFrequencyItem[];
  bestShift: number;
  bestScore: number;
  bestPlain: string;
  candidates: CaesarCandidate[];
  notes: string;
}

export interface TestExecutionResult {
  id: string;
  title: string;
  category: 'ciphers' | 'authentication' | 'authorization' | 'cryptanalysis' | 'lifecycle';
  passed: boolean;
  description: string;
  error?: string;
  durationMs: number;
}
