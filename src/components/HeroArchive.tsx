'use client';

import React from 'react';
import { Shield, KeyRound, Compass, ArrowDown, ExternalLink, Sparkles } from 'lucide-react';

interface HeroArchiveProps {
  onEnterLab: () => void;
  onExploreNarrative: () => void;
}

export const HeroArchive: React.FC<HeroArchiveProps> = ({ onEnterLab, onExploreNarrative }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden archival-grid py-20 px-4 sm:px-6 lg:px-8 border-b border-charcoal-700/60"
    >
      {/* Background Architectural & Cosmic Geometry SVG */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25 dark:opacity-20">
        <svg
          className="w-[850px] h-[850px] animate-spin-slow"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Concentric Vedic Geometric Rings */}
          <circle cx="300" cy="300" r="280" stroke="#bfa06d" strokeWidth="0.75" strokeDasharray="4 8" />
          <circle cx="300" cy="300" r="220" stroke="#9e8050" strokeWidth="1" />
          <circle cx="300" cy="300" r="160" stroke="#bfa06d" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="300" cy="300" r="100" stroke="#83d94b" strokeWidth="1.2" strokeDasharray="6 6" />

          {/* Symmetrical Cardinal Lines */}
          <line x1="20" y1="300" x2="580" y2="300" stroke="#bfa06d" strokeWidth="0.5" />
          <line x1="300" y1="20" x2="300" y2="580" stroke="#bfa06d" strokeWidth="0.5" />
          <line x1="102" y1="102" x2="498" y2="498" stroke="#bfa06d" strokeWidth="0.3" strokeDasharray="3 3" />
          <line x1="102" y1="498" x2="498" y2="102" stroke="#bfa06d" strokeWidth="0.3" strokeDasharray="3 3" />

          {/* Intersecting Octagon */}
          <polygon
            points="300,80 455,144 520,300 455,455 300,520 144,455 80,300 144,144"
            stroke="#9e8050"
            strokeWidth="0.75"
          />
        </svg>
      </div>

      {/* Atmospheric Vignette Gradient */}
      <div className="absolute inset-0 bg-radial-radial from-transparent via-obsidian-950/60 to-obsidian-950 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
        {/* Curated Archival Eyebrow */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-bronze-500/40 bg-charcoal-900/90 backdrop-blur shadow-sm">
          <span className="w-2 h-2 rounded-full bg-bronze-400 animate-pulse" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-bronze-300">
            Kauṭilyan Statecraft & Cryptographic Provenance
          </span>
          <span className="text-bronze-400/40">|</span>
          <span className="text-[11px] font-mono tracking-wider text-ivory-300/80">
            Book II: Śāsanādhikāra
          </span>
        </div>

        {/* Cinematic Headline */}
        <div className="space-y-4">
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ivory-100 leading-[1.08]">
            Trust the Message. <br />
            <span className="bg-gradient-to-r from-bronze-300 via-royal-leaf to-bronze-400 bg-clip-text text-transparent">
              Verify the Royal Seal.
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-ivory-300/80 font-normal leading-relaxed">
            In the governance framework of the ancient <em className="text-bronze-300 not-italic">Arthaśāstra</em>, 
            a royal writ was validated not by blind faith in its messenger, but by the integrity of the sovereign seal 
            (<span className="text-ivory-100 font-mono text-sm">Mudrā</span>). 
            Explore an educational bridge between classical substitution ciphers and modern cryptographic message authentication.
          </p>
        </div>

        {/* The Epistemological Distinction Banner */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl border border-charcoal-700/80 bg-charcoal-800/50 backdrop-blur-sm text-left text-xs sm:text-sm text-ivory-300 space-y-1.5">
          <div className="flex items-center space-x-2 text-bronze-300 font-mono uppercase tracking-wider text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-royal-leaf" />
            <span>Core Cryptographic Distinction</span>
          </div>
          <p className="text-xs leading-relaxed text-ivory-300/90">
            <strong className="text-ivory-100">Transformation vs Authentication:</strong> Obfuscating text through a classical cipher (Caesar or Vigenère) alters appearance without providing modern secrecy. Message integrity and sender provenance require deterministic cryptographic authentication (<span className="font-mono text-royal-leaf">HMAC-SHA-256</span>).
          </p>
        </div>

        {/* Action Directives */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onEnterLab}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-royal-leaf to-emerald-500 text-obsidian-950 font-semibold text-sm tracking-wider uppercase shadow-seal hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
          >
            <KeyRound className="w-4 h-4 text-obsidian-950" />
            <span>Open Dispatch Console</span>
          </button>

          <button
            onClick={onExploreNarrative}
            className="px-6 py-3.5 rounded-xl border border-bronze-500/50 bg-charcoal-800/80 hover:bg-charcoal-700 text-ivory-100 font-medium text-sm tracking-wider uppercase hover:border-bronze-400 transition-all flex items-center space-x-2"
          >
            <Compass className="w-4 h-4 text-bronze-300" />
            <span>Enter Archival Narrative (8 Acts)</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-8 flex justify-center">
          <button
            onClick={onExploreNarrative}
            className="group flex flex-col items-center space-y-2 text-ivory-400/60 hover:text-bronze-300 transition-colors"
            aria-label="Scroll to narrative"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll to Begin Journey</span>
            <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-bronze-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
