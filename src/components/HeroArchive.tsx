'use client';

import React from 'react';
import {
  KeyRound,
  Compass,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  Lock,
  Activity,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface HeroArchiveProps {
  onEnterLab: () => void;
  onExploreNarrative: () => void;
  onScrollToSection?: (id: string) => void;
}

export const HeroArchive: React.FC<HeroArchiveProps> = ({
  onEnterLab,
  onExploreNarrative,
  onScrollToSection,
}) => {
  const handleJump = (id: string) => {
    if (onScrollToSection) {
      onScrollToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col justify-center items-center overflow-hidden archival-grid py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-theme-border transition-colors duration-200"
    >
      {/* =========================================================================
          GRAND LUMINOUS BACKGROUND CELESTIAL & VEDIC CHAKRA GEOMETRY (SVG)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-65 dark:opacity-40 transition-opacity duration-300">
        {/* Ambient Radial Core Halo */}
        <div className="absolute w-[650px] h-[650px] rounded-full bg-theme-bronze/15 dark:bg-theme-bronze/10 filter blur-3xl pointer-events-none" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-theme-seal/15 dark:bg-theme-seal/10 filter blur-2xl pointer-events-none" />

        <svg
          className="w-[820px] h-[820px] sm:w-[980px] sm:h-[980px] lg:w-[1100px] lg:h-[1100px] animate-spin-slow text-theme-bronze origin-center"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer Astrological Coordinate Ring with Degree Ticks */}
          <circle cx="300" cy="300" r="285" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" className="opacity-70" />
          <circle cx="300" cy="300" r="270" stroke="var(--border-strong)" strokeWidth="0.7" className="opacity-75" />

          {/* Symmetrical Cardinal Compass Spoke Lines (16 Rays) */}
          <line x1="15" y1="300" x2="585" y2="300" stroke="currentColor" strokeWidth="0.6" className="opacity-75" />
          <line x1="300" y1="15" x2="300" y2="585" stroke="currentColor" strokeWidth="0.6" className="opacity-75" />
          <line x1="98" y1="98" x2="502" y2="502" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-60" />
          <line x1="98" y1="502" x2="502" y2="98" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-60" />
          <line x1="190" y1="35" x2="410" y2="565" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" className="opacity-45" />
          <line x1="410" y1="35" x2="190" y2="565" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" className="opacity-45" />
          <line x1="35" y1="190" x2="565" y2="410" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" className="opacity-45" />
          <line x1="35" y1="410" x2="565" y2="190" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" className="opacity-45" />

          {/* Intermediate Vedic Boundary Ring */}
          <circle cx="300" cy="300" r="215" stroke="var(--border-strong)" strokeWidth="1.2" className="opacity-85" />
          <circle cx="300" cy="300" r="175" stroke="currentColor" strokeWidth="0.75" strokeDasharray="5 5" className="opacity-75" />

          {/* Inner Sacred Green Mudrā Horizon Ring */}
          <circle cx="300" cy="300" r="120" stroke="var(--seal-green)" strokeWidth="1.4" strokeDasharray="6 6" className="opacity-95" />
          <circle cx="300" cy="300" r="75" stroke="var(--border-strong)" strokeWidth="0.8" className="opacity-70" />

          {/* Intersecting Octagon & Diamond Lattice */}
          <polygon
            points="300,85 452,148 515,300 452,452 300,515 148,452 85,300 148,148"
            stroke="currentColor"
            strokeWidth="0.75"
            className="opacity-55"
          />
          <polygon
            points="300,125 424,176 475,300 424,424 300,475 176,424 125,300 176,176"
            stroke="var(--seal-green)"
            strokeWidth="0.6"
            strokeDasharray="4 4"
            className="opacity-50"
          />

          {/* 8 Cardinal Sacred Node Anchor Points */}
          <circle cx="300" cy="85" r="3.5" fill="currentColor" />
          <circle cx="300" cy="515" r="3.5" fill="currentColor" />
          <circle cx="85" cy="300" r="3.5" fill="currentColor" />
          <circle cx="515" cy="300" r="3.5" fill="currentColor" />
          <circle cx="148" cy="148" r="3" fill="var(--seal-green)" />
          <circle cx="452" cy="148" r="3" fill="var(--seal-green)" />
          <circle cx="148" cy="452" r="3" fill="var(--seal-green)" />
          <circle cx="452" cy="452" r="3" fill="var(--seal-green)" />
        </svg>
      </div>

      {/* Atmospheric Soft Vignette */}
      <div className="absolute inset-0 bg-radial-radial from-transparent via-theme-canvas/40 to-theme-canvas pointer-events-none" />

      {/* =========================================================================
          HERO INTERFACE CONTENT (CENTERED SYMMETRICAL COMPOSITION)
          ========================================================================= */}
      <div className="relative max-w-4xl lg:max-w-5xl mx-auto z-10 w-full text-center space-y-7 sm:space-y-8">
        
        {/* Curated Archival Eyebrow */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-theme-border-strong bg-theme-surface/90 backdrop-blur shadow-sm mx-auto">
          <span className="w-2 h-2 rounded-full bg-theme-seal animate-pulse" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-theme-bronze font-bold">
            Kauṭilyan Statecraft & Cryptographic Provenance
          </span>
          <span className="text-theme-muted opacity-40">|</span>
          <span className="text-[11px] font-mono tracking-wider text-theme-secondary font-medium">
            Book II: Śāsanādhikāra
          </span>
        </div>

        {/* Authentic Sanskrit Epigraph from Arthaśāstra II.10 */}
        <div className="p-4 sm:p-5 rounded-2xl border border-theme-border-strong bg-theme-bronze/5 dark:bg-theme-bronze/10 backdrop-blur-sm space-y-1.5 text-center max-w-2xl mx-auto shadow-sm">
          <div className="flex items-center justify-center space-x-3 text-[10px] font-mono uppercase tracking-widest text-theme-bronze font-bold">
            <span>Kauṭilīya Arthaśāstra</span>
            <span>·</span>
            <span>Book II, Chapter 10, Verse 1</span>
          </div>
          <p className="font-editorial text-base sm:text-lg text-theme-primary font-bold italic tracking-wide">
            “शासनप्रधानो हि राजा, तन्मूलत्वात् सर्वव्यवहाराणाम् ॥”
          </p>
          <p className="text-xs sm:text-sm text-theme-secondary font-sans leading-relaxed">
            <em className="text-theme-primary font-medium">
              “The authority of the sovereign is anchored in verified royal dispatches; for all transactions of the realm flow from them.”
            </em>
          </p>
        </div>

        {/* Master Headline (Act I: The Archive) */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-theme-primary leading-[1.06]">
            Power travels through <br />
            <span className="text-theme-bronze">
              verified information.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-theme-secondary leading-relaxed font-sans">
            In the statecraft of ancient India, a royal writ commanded obedience not through blind faith in the courier, 
            but through the unforgeable sovereign seal (<span className="font-mono text-sm text-theme-primary font-bold">Mudrā</span>). 
            Discover how classical substitution ciphers evolved into modern mathematical authentication.
          </p>
        </div>

        {/* Core Epistemological Distinction Box with Mini Live Ticker */}
        <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl border border-theme-border bg-theme-surface/85 backdrop-blur-sm text-left text-xs sm:text-sm space-y-2.5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-theme-bronze font-mono uppercase tracking-wider text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-theme-seal" />
              <span>Core Cryptographic Distinction</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-seal-bg border border-theme-seal-border text-theme-seal font-semibold">
              Zero Trust Architecture
            </span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-theme-secondary">
            <strong className="text-theme-primary">Transformation vs Authentication:</strong> Obfuscating text via Caesar or Vigenère shifts merely alters visual structure without securing origin or integrity. Absolute provenance requires deterministic mathematical cryptographic verification (<span className="font-mono text-theme-seal font-bold">HMAC-SHA-256</span>).
          </p>
          
          {/* Mini Dispatch Provenance Ticker */}
          <div className="pt-2 border-t border-theme-border flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-theme-muted gap-1.5">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-theme-seal animate-pulse" />
              <span className="text-theme-secondary">Origin: envoy_pataliputra</span>
            </span>
            <span className="text-theme-bronze font-semibold">HMAC-SHA-256: 3e9a...7b12</span>
            <span className="text-theme-seal font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 inline" />
              <span>AUTHENTIC / VERIFIED</span>
            </span>
          </div>
        </div>

        {/* Action Directives & Section Pills */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onEnterLab}
              className="px-7 py-3.5 rounded-xl bg-theme-seal text-theme-canvas font-mono font-bold text-xs tracking-wider uppercase shadow-seal hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Open Dispatch Console</span>
            </button>

            <button
              onClick={onExploreNarrative}
              className="px-7 py-3.5 rounded-xl border border-theme-border-strong bg-theme-surface hover:bg-theme-subtle text-theme-primary font-mono font-medium text-xs tracking-wider uppercase transition-all flex items-center space-x-2 shadow-sm"
            >
              <Compass className="w-4 h-4 text-theme-bronze" />
              <span>The Nine Archival Acts</span>
            </button>
          </div>

          {/* Quick Jump Section Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted font-bold mr-1">
              Direct Access:
            </span>
            <button
              onClick={() => handleJump('ciphers')}
              className="px-3 py-1.5 rounded-lg text-[10px] font-mono bg-theme-inset border border-theme-border hover:border-theme-bronze text-theme-secondary hover:text-theme-primary transition-all flex items-center space-x-1"
            >
              <span>Classical Ciphers</span>
            </button>
            <button
              onClick={() => handleJump('analysis')}
              className="px-3 py-1.5 rounded-lg text-[10px] font-mono bg-theme-inset border border-theme-border hover:border-theme-bronze text-theme-secondary hover:text-theme-primary transition-all flex items-center space-x-1"
            >
              <span>Cryptanalysis Workbench</span>
            </button>
            <button
              onClick={() => handleJump('tests')}
              className="px-3 py-1.5 rounded-lg text-[10px] font-mono bg-theme-inset border border-theme-border hover:border-theme-bronze text-theme-secondary hover:text-theme-primary transition-all flex items-center space-x-1"
            >
              <span>20 System Tests</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM TELEMETRY & 4-PILLAR PROVENANCE STRIP (EXHIBITION METRICS)
            ========================================================================= */}
        <div className="mt-14 pt-8 border-t border-theme-border w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Metric 1: Cipher Suite */}
            <button
              onClick={() => handleJump('ciphers')}
              className="p-4 rounded-2xl bg-theme-surface/75 border border-theme-border hover:border-theme-bronze text-left transition-all group focus:outline-none shadow-sm"
            >
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-theme-muted font-bold mb-1.5">
                <span>01 / Cipher Suite</span>
                <Layers className="w-3.5 h-3.5 text-theme-bronze group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-editorial text-theme-primary group-hover:text-theme-bronze transition-colors">
                03 Transforms
              </div>
              <p className="text-[11px] text-theme-secondary mt-1 font-sans">
                Caesar · Vigenère · Reciprocal involution
              </p>
            </button>

            {/* Metric 2: Message Integrity */}
            <button
              onClick={() => handleJump('dispatch')}
              className="p-4 rounded-2xl bg-theme-surface/75 border border-theme-border hover:border-theme-seal text-left transition-all group focus:outline-none shadow-sm"
            >
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-theme-muted font-bold mb-1.5">
                <span>02 / Provenance Seal</span>
                <ShieldCheck className="w-3.5 h-3.5 text-theme-seal group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-editorial text-theme-primary group-hover:text-theme-seal transition-colors">
                HMAC-SHA-256
              </div>
              <p className="text-[11px] text-theme-secondary mt-1 font-sans">
                Keyed unforgeable authentication tags
              </p>
            </button>

            {/* Metric 3: Clearance Tiers */}
            <button
              onClick={() => handleJump('dispatch')}
              className="p-4 rounded-2xl bg-theme-surface/75 border border-theme-border hover:border-theme-bronze text-left transition-all group focus:outline-none shadow-sm"
            >
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-theme-muted font-bold mb-1.5">
                <span>03 / Clearance Tiers</span>
                <Lock className="w-3.5 h-3.5 text-theme-bronze group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-editorial text-theme-primary group-hover:text-theme-bronze transition-colors">
                3 Levels
              </div>
              <p className="text-[11px] text-theme-secondary mt-1 font-sans">
                Sarvajanīya · Mantrin · Gūḍha
              </p>
            </button>

            {/* Metric 4: Built-in Verification */}
            <button
              onClick={() => handleJump('tests')}
              className="p-4 rounded-2xl bg-theme-surface/75 border border-theme-border hover:border-theme-seal text-left transition-all group focus:outline-none shadow-sm"
            >
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-theme-muted font-bold mb-1.5">
                <span>04 / System Audit</span>
                <Activity className="w-3.5 h-3.5 text-theme-seal group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-editorial text-theme-seal flex items-center space-x-1.5">
                <span>20 / 20</span>
                <CheckCircle2 className="w-4 h-4 text-theme-seal" />
              </div>
              <p className="text-[11px] text-theme-secondary mt-1 font-sans">
                Full cryptographic & cipher test harness
              </p>
            </button>

          </div>
        </div>

        {/* Global Section Scroll Indicator */}
        <div className="pt-8 sm:pt-10 flex justify-center">
          <button
            onClick={onExploreNarrative}
            className="group flex flex-col items-center space-y-1.5 text-theme-muted hover:text-theme-bronze transition-colors focus:outline-none"
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
