'use client';

import React from 'react';
import { KeyRound, Compass, ArrowDown, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroArchiveProps {
  onEnterLab: () => void;
  onExploreNarrative: () => void;
}

export const HeroArchive: React.FC<HeroArchiveProps> = ({ onEnterLab, onExploreNarrative }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden archival-grid py-20 px-4 sm:px-6 lg:px-8 border-b border-theme-border"
    >
      {/* Background Architectural & Cosmic Geometry SVG */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 dark:opacity-20 transition-opacity duration-300">
        <svg
          className="w-[850px] h-[850px] animate-spin-slow"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Concentric Vedic Geometric Rings */}
          <circle cx="300" cy="300" r="280" stroke="var(--accent-bronze)" strokeWidth="0.75" strokeDasharray="4 8" />
          <circle cx="300" cy="300" r="220" stroke="var(--border-strong)" strokeWidth="1" />
          <circle cx="300" cy="300" r="160" stroke="var(--accent-bronze)" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="300" cy="300" r="100" stroke="var(--seal-green)" strokeWidth="1.2" strokeDasharray="6 6" />

          {/* Symmetrical Cardinal Lines */}
          <line x1="20" y1="300" x2="580" y2="300" stroke="var(--accent-bronze)" strokeWidth="0.5" />
          <line x1="300" y1="20" x2="300" y2="580" stroke="var(--accent-bronze)" strokeWidth="0.5" />
          <line x1="102" y1="102" x2="498" y2="498" stroke="var(--accent-bronze)" strokeWidth="0.3" strokeDasharray="3 3" />
          <line x1="102" y1="498" x2="498" y2="102" stroke="var(--accent-bronze)" strokeWidth="0.3" strokeDasharray="3 3" />

          {/* Intersecting Octagon */}
          <polygon
            points="300,80 455,144 520,300 455,455 300,520 144,455 80,300 144,144"
            stroke="var(--border-strong)"
            strokeWidth="0.75"
          />
        </svg>
      </div>

      {/* Atmospheric Vignette Gradient */}
      <div className="absolute inset-0 bg-radial-radial from-transparent via-theme-canvas/40 to-theme-canvas pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center z-10 space-y-8">
        {/* Curated Archival Eyebrow */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-theme-border-strong bg-theme-surface/90 backdrop-blur shadow-sm">
          <span className="w-2 h-2 rounded-full bg-theme-bronze animate-pulse" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-theme-bronze font-bold">
            Kauṭilyan Statecraft & Cryptographic Provenance
          </span>
          <span className="text-theme-muted opacity-40">|</span>
          <span className="text-[11px] font-mono tracking-wider text-theme-secondary">
            Book II: Śāsanādhikāra
          </span>
        </div>

        {/* Master Headline (Act I: The Archive) */}
        <div className="space-y-4">
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-theme-primary leading-[1.08]">
            Power travels through <br />
            <span className="text-theme-bronze">
              verified information.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-theme-secondary leading-relaxed font-sans">
            In the statecraft of the ancient <em className="text-theme-bronze not-italic font-medium">Arthaśāstra</em>, 
            a royal dispatch commanded obedience not through blind faith in the courier, but through the unbroken seal 
            (<span className="font-mono text-sm text-theme-primary font-bold">Mudrā</span>). 
            Discover how classical substitution ciphers evolved into modern cryptographic authentication.
          </p>
        </div>

        {/* The Core Epistemological Distinction Box */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl border border-theme-border bg-theme-surface/80 backdrop-blur-sm text-left text-xs sm:text-sm space-y-1.5 shadow-card">
          <div className="flex items-center space-x-2 text-theme-bronze font-mono uppercase tracking-wider text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-theme-seal" />
            <span>Core Cryptographic Distinction</span>
          </div>
          <p className="text-xs leading-relaxed text-theme-secondary">
            <strong className="text-theme-primary">Transformation vs Authentication:</strong> Obfuscating text via Caesar or Vigenère shifts merely alters visual structure. Absolute integrity and origin provenance require mathematical cryptographic verification (<span className="font-mono text-theme-seal font-bold">HMAC-SHA-256</span>).
          </p>
        </div>

        {/* Action Directives */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onEnterLab}
            className="px-6 py-3.5 rounded-xl bg-theme-seal text-theme-canvas font-mono font-bold text-xs tracking-wider uppercase shadow-seal hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Open Dispatch Console</span>
          </button>

          <button
            onClick={onExploreNarrative}
            className="px-6 py-3.5 rounded-xl border border-theme-border-strong bg-theme-surface hover:bg-theme-subtle text-theme-primary font-mono font-medium text-xs tracking-wider uppercase transition-all flex items-center space-x-2 shadow-sm"
          >
            <Compass className="w-4 h-4 text-theme-bronze" />
            <span>The Nine Archival Acts</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-6 flex justify-center">
          <button
            onClick={onExploreNarrative}
            className="group flex flex-col items-center space-y-2 text-theme-muted hover:text-theme-bronze transition-colors"
            aria-label="Scroll to narrative"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Begin Archival Journey</span>
            <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-theme-bronze" />
          </button>
        </div>
      </div>
    </section>
  );
};
