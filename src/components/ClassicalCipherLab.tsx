'use client';

import React, { useState } from 'react';
import { caesar, vigenere, reciprocal, RECIPROCAL_TABLE, ALPHABET } from '../lib/ciphers';
import { Copy, Check, Info, ShieldAlert, ArrowRightLeft, Sparkles } from 'lucide-react';

export const ClassicalCipherLab: React.FC = () => {
  const [activeCipher, setActiveCipher] = useState<'caesar' | 'vigenere' | 'reciprocal'>('caesar');
  const [inputText, setInputText] = useState('Attack at dawn! Guard the eastern bastion.');
  const [caesarShift, setCaesarShift] = useState<number>(5);
  const [vigKeyword, setVigKeyword] = useState<string>('mantra');
  const [copiedEnc, setCopiedEnc] = useState(false);
  const [copiedDec, setCopiedDec] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Perform active transformation
  let encrypted = '';
  let decrypted = '';

  try {
    if (activeCipher === 'caesar') {
      encrypted = caesar(inputText, caesarShift, false);
      decrypted = caesar(encrypted, caesarShift, true);
    } else if (activeCipher === 'vigenere') {
      encrypted = vigenere(inputText, vigKeyword, false);
      decrypted = vigenere(encrypted, vigKeyword, true);
    } else {
      encrypted = reciprocal(inputText);
      decrypted = reciprocal(encrypted);
    }
    if (errorMessage) setErrorMessage(null);
  } catch (err: unknown) {
    encrypted = err instanceof Error ? err.message : 'Transformation error';
    decrypted = '—';
  }

  const handleCopy = async (text: string, isEnc: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isEnc) {
        setCopiedEnc(true);
        setTimeout(() => setCopiedEnc(false), 2000);
      } else {
        setCopiedDec(true);
        setTimeout(() => setCopiedDec(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <section id="ciphers" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-charcoal-700/60">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-bronze-500/40 bg-bronze-500/10 text-xs font-mono text-bronze-300 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 02 / Classical Mechanisms</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-ivory-100 tracking-tight">
          Classical Cipher Laboratory
        </h2>
        <p className="text-sm sm:text-base text-ivory-300/80 leading-relaxed">
          Examine the mathematical behavior of monoalphabetic, polyalphabetic, and involutory reciprocal substitution.
          Notice how structure, casing, and spaces persist while letters shift.
        </p>
      </div>

      <div className="bg-charcoal-900/80 border border-charcoal-700/80 rounded-2xl p-6 sm:p-8 shadow-archival-card space-y-6">
        {/* Cipher Mode Switcher */}
        <div className="flex flex-wrap gap-2.5 border-b border-charcoal-700/80 pb-4">
          <button
            onClick={() => setActiveCipher('caesar')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              activeCipher === 'caesar'
                ? 'bg-bronze-500 text-obsidian-950 font-bold shadow-seal'
                : 'bg-charcoal-800 text-ivory-300 hover:bg-charcoal-700'
            }`}
          >
            Caesar Shift (Monoalphabetic)
          </button>
          <button
            onClick={() => setActiveCipher('vigenere')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              activeCipher === 'vigenere'
                ? 'bg-bronze-500 text-obsidian-950 font-bold shadow-seal'
                : 'bg-charcoal-800 text-ivory-300 hover:bg-charcoal-700'
            }`}
          >
            Vigenère Tableau (Polyalphabetic)
          </button>
          <button
            onClick={() => setActiveCipher('reciprocal')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              activeCipher === 'reciprocal'
                ? 'bg-bronze-500 text-obsidian-950 font-bold shadow-seal'
                : 'bg-charcoal-800 text-ivory-300 hover:bg-charcoal-700'
            }`}
          >
            Reciprocal Pairs (Involution)
          </button>
        </div>

        {/* Input Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold tracking-wider uppercase text-ivory-300">
            Source Text Input
          </label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={2}
            className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl px-4 py-2.5 text-sm text-ivory-100 font-mono focus:outline-none focus:border-bronze-400"
            placeholder="Type message to transform..."
          />
        </div>

        {/* Dynamic Controls based on selected cipher */}
        {activeCipher === 'caesar' && (
          <div className="p-4 rounded-xl border border-charcoal-700 bg-charcoal-950/70 space-y-3 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-bronze-300 font-bold uppercase">
                Caesar Shift Parameter: +{caesarShift} positions
              </span>
              <div className="flex items-center space-x-3 w-full sm:w-64">
                <span className="text-charcoal-600 dark:text-ivory-400/60 text-[10px]">1</span>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={caesarShift}
                  onChange={e => setCaesarShift(Number(e.target.value))}
                  className="w-full accent-royal-leaf"
                />
                <span className="text-charcoal-600 dark:text-ivory-400/60 text-[10px]">25</span>
              </div>
            </div>
            <p className="text-[11px] text-ivory-400 leading-relaxed">
              Every letter <span className="text-ivory-100">x</span> is shifted by formula <code className="text-royal-leaf">(x + k) mod 26</code>. 
              The alphabet wraps cyclically. Preserves uppercase/lowercase, spaces, and punctuation.
            </p>
          </div>
        )}

        {activeCipher === 'vigenere' && (
          <div className="p-4 rounded-xl border border-charcoal-700 bg-charcoal-950/70 space-y-3 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-bronze-300 font-bold uppercase">
                Vigenère Key Sequence:
              </span>
              <input
                type="text"
                value={vigKeyword}
                onChange={e => setVigKeyword(e.target.value)}
                placeholder="Enter alphabetic keyword..."
                className="w-full sm:w-64 bg-charcoal-900 border border-charcoal-700 rounded-lg px-3 py-1.5 text-xs text-ivory-100 font-mono focus:outline-none focus:border-bronze-400"
              />
            </div>
            <p className="text-[11px] text-ivory-400 leading-relaxed">
              Uses a repeating keyword stream to apply varying Caesar shifts across successive letters. 
              Non-alphabetic characters remain in place without consuming keyword letters.
            </p>
          </div>
        )}

        {activeCipher === 'reciprocal' && (
          <div className="p-4 rounded-xl border border-charcoal-700 bg-charcoal-950/70 space-y-3 font-mono text-xs">
            <span className="text-bronze-300 font-bold uppercase block">
              13 Reciprocal Involution Pairs (LCG Seed 7):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-[11px]">
              {Object.entries(RECIPROCAL_TABLE)
                .slice(0, 13)
                .map(([a, b]) => (
                  <div key={a} className="p-1.5 rounded bg-charcoal-900 border border-charcoal-800 text-center">
                    <span className="text-royal-leaf font-bold">{a.toUpperCase()}</span>
                    <span className="text-charcoal-600 dark:text-ivory-400/60 mx-1.5">⇄</span>
                    <span className="text-bronze-300 font-bold">{b.toUpperCase()}</span>
                  </div>
                ))}
            </div>
            <p className="text-[11px] text-ivory-400 leading-relaxed">
              Self-inverting cipher where encryption and decryption operations are identical: <code className="text-royal-leaf">E(E(m)) = m</code>.
            </p>
          </div>
        )}

        {/* Output Columns: Encrypted vs Decrypted */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
          {/* Encrypted Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold tracking-wider uppercase text-bronze-400 flex items-center space-x-1.5">
                <span>Encrypted Ciphertext</span>
              </span>
              <button
                onClick={() => handleCopy(encrypted, true)}
                className="px-2 py-1 rounded border border-charcoal-700 bg-charcoal-800 hover:bg-charcoal-700 text-ivory-300 text-[10px] flex items-center space-x-1"
              >
                {copiedEnc ? <Check className="w-3 h-3 text-royal-leaf" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEnc ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800 text-ivory-100 min-h-[75px] break-all select-all">
              {encrypted}
            </div>
          </div>

          {/* Decrypted Output (Round Trip Verification) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold tracking-wider uppercase text-royal-leaf flex items-center space-x-1.5">
                <span>Decrypted (Round-Trip Verification)</span>
              </span>
              <button
                onClick={() => handleCopy(decrypted, false)}
                className="px-2 py-1 rounded border border-charcoal-700 bg-charcoal-800 hover:bg-charcoal-700 text-ivory-300 text-[10px] flex items-center space-x-1"
              >
                {copiedDec ? <Check className="w-3 h-3 text-royal-leaf" /> : <Copy className="w-3 h-3" />}
                <span>{copiedDec ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800 text-ivory-200 min-h-[75px] break-all select-all">
              {decrypted}
            </div>
          </div>
        </div>

        {/* Educational Warning Callout */}
        <div className="p-4 rounded-xl border border-royal-amber/40 bg-royal-amber/10 flex items-start space-x-3 text-xs">
          <ShieldAlert className="w-4 h-4 text-royal-amber shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-ivory-300">
            <strong className="text-royal-amber block font-bold uppercase tracking-wider font-mono">
              Academic Disclaimer & Mathematical Vulnerability
            </strong>
            <p className="leading-relaxed">
              These classical ciphers are strictly for educational and pedagogical exploration. 
              Monoalphabetic substitutions do not disguise letter frequencies; polyalphabetic substitutions 
              succumb to Kasiski examination; and neither provides mathematical authentication or modern confidentiality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
