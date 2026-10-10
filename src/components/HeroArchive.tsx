'use client';

import React from 'react';
import { KeyRound, Compass, ArrowDown, Sparkles, ShieldCheck, Lock, Activity } from 'lucide-react';

interface HeroArchiveProps {
  onEnterLab: () => void;
  onExploreNarrative: () => void;
}

export const HeroArchive: React.FC<HeroArchiveProps> = ({ onEnterLab, onExploreNarrative }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden archival-grid py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-theme-border transition-colors duration-200"
    >
      {/* =========================================================================
          GRAND LUMINOUS BACKGROUND CELESTIAL & VEDIC CHAKRA GEOMETRY (SVG)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60 dark:opacity-40 transition-opacity duration-300">
        {/* Ambient Radial Core Halo */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-theme-bronze/10 dark:bg-theme-bronze/5 filter blur-3xl pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-theme-seal/10 dark:bg-theme-seal/5 filter blur-2xl pointer-events-none" />

        <svg
          className="w-[750px] h-[750px] sm:w-[920px] sm:h-[920px] animate-spin-slow text-theme-bronze origin-center"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer Astrological Coordinate Ring with Degree Ticks */}
          <circle cx="300" cy="300" r="285" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" className="opacity-60" />
          <circle cx="300" cy="300" r="270" stroke="var(--border-strong)" strokeWidth="0.7" className="opacity-70" />

          {/* Symmetrical Cardinal Compass Spoke Lines (16 Rays) */}
          <line x1="15" y1="300" x2="585" y2="300" stroke="currentColor" strokeWidth="0.6" className="opacity-70" />
          <line x1="300" y1="15" x2="300" y2="585" stroke="currentColor" strokeWidth="0.6" className="opacity-70" />
          <line x1="98" y1="98" x2="502" y2="502" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-50" />
          <line x1="98" y1="502" x2="502" y2="98" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-50" />
          <line x1="190" y1="35" x2="410" y2="565" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" className="opacity-40" />
          <line x1="410" y1="35" x2="190" y2="565" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" className="opacity-40" />
          <line x1="35" y1="190" x2="565" y2="410" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" className="opacity-40" />
          <line x1="35" y1="410" x2="565" y2="190" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" className="opacity-40" />

          {/* Intermediate Vedic Boundary Ring */}
          <circle cx="300" cy="300" r="215" stroke="var(--border-strong)" strokeWidth="1.2" className="opacity-80" />
          <circle cx="300" cy="300" r="175" stroke="currentColor" strokeWidth="0.75" strokeDasharray="5 5" className="opacity-70" />

          {/* Inner Sacred Green Mudrā Horizon Ring */}
          <circle cx="300" cy="300" r="120" stroke="var(--seal-green)" strokeWidth="1.4" strokeDasharray="6 6" className="opacity-90" />
          <circle cx="300" cy="300" r="75" stroke="var(--border-strong)" strokeWidth="0.8" className="opacity-60" />

          {/* Intersecting Octagon & Diamond Lattice */}
          <polygon
            points="300,85 452,148 515,300 452,452 300,515 148,452 85,300 148,148"
            stroke="currentColor"
            strokeWidth="0.75"
            className="opacity-50"
          />
          <polygon
            points="300,125 424,176 475,300 424,424 300,475 176,424 125,300 176,176"
            stroke="var(--seal-green)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            className="opacity-40"
          />

          {/* 8 Cardinal Sacred Node Anchor Points */}
          <circle cx="300" cy="85" r="3" fill="currentColor" />
          <circle cx="300" cy="515" r="3" fill="currentColor" />
          <circle cx="85" cy="300" r="3" fill="currentColor" />
          <circle cx="515" cy="300" r="3" fill="currentColor" />
          <circle cx="148" cy="148" r="2.5" fill="var(--seal-green)" />
          <circle cx="452" cy="148" r="2.5" fill="var(--seal-green)" />
          <circle cx="148" cy="452" r="2.5" fill="var(--seal-green)" />
          <circle cx="452" cy="452" r="2.5" fill="var(--seal-green)" />
        </svg>
      </div>

      {/* Atmospheric Soft Vignette */}
      <div className="absolute inset-0 bg-radial-radial from-transparent via-theme-canvas/40 to-theme-canvas pointer-events-none" />

      {/* =========================================================================
          HERO INTERFACE CONTENT (2-COLUMN ARCHITECTURAL GRID)
          ========================================================================= */}
      <div className="relative max-w-7xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Headings, Epistemology, Directives (7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            {/* Curated Archival Eyebrow */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-theme-border-strong bg-theme-surface/90 backdrop-blur shadow-sm">
              <span className="w-2 h-2 rounded-full bg-theme-seal animate-pulse" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-theme-bronze font-bold">
                Kauṭilyan Statecraft & Cryptographic Provenance
              </span>
              <span className="text-theme-muted opacity-40">|</span>
              <span className="text-[11px] font-mono tracking-wider text-theme-secondary font-medium">
                Book II: Śāsanādhikāra
              </span>
            </div>

            {/* Master Headline (Act I: The Archive) */}
            <div className="space-y-4">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-theme-primary leading-[1.08]">
                Power travels through <br />
                <span className="text-theme-bronze">
                  verified information.
                </span>
              </h1>
              <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-theme-secondary leading-relaxed font-sans">
                In the statecraft of the ancient <em className="text-theme-bronze not-italic font-medium">Arthaśāstra</em>, 
                a royal dispatch commanded obedience not through blind faith in the courier, but through the unbroken seal 
                (<span className="font-mono text-sm text-theme-primary font-bold">Mudrā</span>). 
                Discover how classical substitution ciphers evolved into modern cryptographic authentication.
              </p>
            </div>

            {/* Core Epistemological Distinction Box */}
            <div className="max-w-xl mx-auto lg:mx-0 p-4 rounded-xl border border-theme-border bg-theme-surface/85 backdrop-blur-sm text-left text-xs sm:text-sm space-y-1.5 shadow-card">
              <div className="flex items-center space-x-2 text-theme-bronze font-mono uppercase tracking-wider text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-theme-seal" />
                <span>Core Cryptographic Distinction</span>
              </div>
              <p className="text-xs leading-relaxed text-theme-secondary">
                <strong className="text-theme-primary">Transformation vs Authentication:</strong> Obfuscating text via Caesar or Vigenère shifts merely alters visual structure. Absolute integrity and origin provenance require mathematical cryptographic verification (<span className="font-mono text-theme-seal font-bold">HMAC-SHA-256</span>).
              </p>
            </div>

            {/* Action Directives */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
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
          </div>

          {/* RIGHT COLUMN: THE SIGNATURE SECURE DISPATCH CIRCULAR SEAL VISUAL (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-3xl border border-theme-border-strong bg-theme-surface/90 backdrop-blur-md p-6 sm:p-8 shadow-card flex flex-col items-center justify-between min-h-[380px] sm:min-h-[420px] overflow-hidden group"
              aria-label="Kauṭilyan Secure Dispatch Mudrā Seal Visualization"
            >
              {/* Internal Concentric Radial Aura */}
              <div className="absolute inset-0 bg-radial-radial from-theme-seal/15 via-transparent to-transparent pointer-events-none" />

              {/* Background Circular Radar Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[320px] h-[320px] rounded-full border border-theme-seal/20" />
                <div className="w-[240px] h-[240px] rounded-full border border-theme-seal/30" />
                <div className="w-[160px] h-[160px] rounded-full border border-theme-border-strong" />
              </div>

              {/* Top Card Eyebrow Metadata */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-theme-muted z-10 border-b border-theme-border pb-3">
                <span className="flex items-center space-x-1.5 text-theme-seal font-bold">
                  <span className="w-2 h-2 rounded-full bg-theme-seal animate-pulse" />
                  <span>Sealed Mudrā</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-theme-inset border border-theme-border text-theme-secondary font-semibold">
                  Zero Trust
                </span>
              </div>

              {/* CENTER CIRCULAR ORBIT & SACRED CORE MONOGRAM */}
              <div className="relative my-8 flex items-center justify-center z-10">
                {/* Rotating Dashed Orbital Track */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-dashed border-theme-seal/60 animate-spin-slow flex items-center justify-center relative">
                  {/* Orbit Node 1: Top (Transmission Dhvani) */}
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-theme-surface border border-theme-seal/80 shadow-sm flex items-center justify-center text-theme-seal text-xs font-mono font-bold"
                    title="Dhvani: Signal Transmission"
                  >
                    ⌁
                  </div>

                  {/* Orbit Node 2: Bottom (HMAC Provenance Verified) */}
                  <div
                    className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-theme-surface border border-theme-seal/80 shadow-sm flex items-center justify-center text-theme-seal text-xs font-mono font-bold"
                    title="Satya: Mathematical Verification"
                  >
                    ✓
                  </div>

                  {/* Orbit Node 3: Right (Cryptographic Digest) */}
                  <div
                    className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-8 h-8 rounded-lg bg-theme-surface border border-theme-seal/80 shadow-sm flex items-center justify-center text-theme-seal text-xs font-mono font-bold"
                    title="Śāstrīya: 256-Bit Digest"
                  >
                    #
                  </div>

                  {/* Orbit Node 4: Left (Royal Diamond Mudrā) */}
                  <div
                    className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-8 h-8 rounded-lg bg-theme-surface border border-theme-seal/80 shadow-sm flex items-center justify-center text-theme-seal text-xs font-mono font-bold"
                    title="Gūḍha: Sovereign Mudrā"
                  >
                    ◇
                  </div>
                </div>

                {/* Central Royal Core Badge (Sanskrit 'अ' Monogram) */}
                <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-theme-seal to-emerald-700 text-theme-canvas flex flex-col items-center justify-center shadow-seal border border-theme-bronze/40 group-hover:scale-105 transition-transform duration-300">
                  <span className="font-editorial text-3xl sm:text-4xl font-bold tracking-wider leading-none text-theme-canvas drop-shadow-sm">
                    अ
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-theme-canvas/90 mt-1">
                    MUDRA
                  </span>
                </div>
              </div>

              {/* Bottom Card Labels */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-theme-muted z-10 border-t border-theme-border pt-3">
                <span className="text-theme-secondary font-semibold">Integrity / Auth</span>
                <span className="text-theme-bronze font-bold">Protocol 01 · Mauryan</span>
              </div>
            </div>
          </div>

        </div>

        {/* Global Section Scroll Indicator */}
        <div className="pt-10 sm:pt-14 flex justify-center">
          <button
            onClick={onExploreNarrative}
            className="group flex flex-col items-center space-y-2 text-theme-muted hover:text-theme-bronze transition-colors focus:outline-none"
            aria-label="Scroll to narrative"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold">
              Begin Archival Journey
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-theme-bronze" />
          </button>
        </div>
      </div>
    </section>
  );
};
