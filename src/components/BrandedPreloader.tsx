'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

interface BrandedPreloaderProps {
  onComplete: () => void;
}

export const BrandedPreloader: React.FC<BrandedPreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFadingOut(true);
    try {
      sessionStorage.setItem('arthasastra-preloader-seen', 'true');
    } catch {
      // storage unavailable safe fallback
    }
    setTimeout(() => {
      onComplete();
    }, 350);
  };

  useEffect(() => {
    // Check if user already saw preloader this session or prefers reduced motion
    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hasSeen = sessionStorage.getItem('arthasastra-preloader-seen');
      if (prefersReducedMotion || hasSeen) {
        onComplete();
        return;
      }
    } catch {
      // ignore
    }

    // Sequence stages
    const t1 = setTimeout(() => setPhase(1), 200);  // Sacred seal stroke
    const t2 = setTimeout(() => setPhase(2), 500);  // Title typography
    const t3 = setTimeout(() => setPhase(3), 850);  // Status readout
    const t4 = setTimeout(finish, 1300);            // Guaranteed auto-exit

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []); // Run ONCE on mount, not resetting on parent re-renders!

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={finish}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-300 bg-theme-canvas text-theme-primary archival-grid cursor-pointer ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      title="Click anywhere to enter immediately"
    >
      {/* Outer Glow / Aura */}
      <div className="absolute w-80 h-80 rounded-full bg-theme-bronze/10 filter blur-3xl pointer-events-none" />

      {/* Center Sacred Emblem SVG with animated stroke */}
      <div className="relative mb-6 pointer-events-none">
        <svg
          className="w-24 h-24 sm:w-28 sm:h-28"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric Vedic Boundary Rings */}
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="var(--accent-bronze)"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="opacity-40 animate-spin-slow origin-center"
          />
          <circle
            cx="60"
            cy="60"
            r="44"
            stroke="var(--border-strong)"
            strokeWidth="1.2"
            className={`transition-all duration-700 ${
              phase >= 1 ? 'stroke-dashoffset-0 opacity-80' : 'opacity-0'
            }`}
          />
          <circle
            cx="60"
            cy="60"
            r="34"
            stroke="var(--seal-green)"
            strokeWidth="1"
            className={`transition-all duration-700 ${
              phase >= 1 ? 'opacity-90' : 'opacity-0'
            }`}
          />

          {/* Symmetrical Cardinal Notches */}
          <line x1="60" y1="8" x2="60" y2="18" stroke="var(--accent-bronze)" strokeWidth="1.5" />
          <line x1="60" y1="102" x2="60" y2="112" stroke="var(--accent-bronze)" strokeWidth="1.5" />
          <line x1="8" y1="60" x2="18" y2="60" stroke="var(--accent-bronze)" strokeWidth="1.5" />
          <line x1="102" y1="60" x2="112" y2="60" stroke="var(--accent-bronze)" strokeWidth="1.5" />

          {/* Sacred Sanskrit Monogram 'अ' (Arthaśāstra) */}
          <text
            x="60"
            y="69"
            textAnchor="middle"
            fill="var(--accent-bronze)"
            className={`font-editorial font-bold text-3xl transition-all duration-700 ${
              phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transformOrigin: 'center' }}
          >
            अ
          </text>
        </svg>

        {/* Pulsing seal node */}
        <span
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-theme-seal shadow-seal transition-opacity duration-500 ${
            phase >= 1 ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Typography Hierarchy */}
      <div className="text-center space-y-2 max-w-sm px-4 pointer-events-none">
        <h1
          className={`font-editorial text-2xl sm:text-3xl font-bold tracking-[0.25em] text-theme-primary transition-all duration-700 ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          ARTHAŚĀSTRA
        </h1>
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.3em] text-theme-bronze font-bold transition-all duration-700 delay-100 ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          SECURE DISPATCH LAB
        </p>

        {/* Dynamic status line */}
        <div
          className={`pt-4 flex items-center justify-center space-x-2 text-xs font-mono text-theme-muted transition-all duration-700 ${
            phase >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-theme-seal animate-pulse" />
          <span>
            {phase < 3 ? 'Reading chancery records...' : 'Opening dispatch archive...'}
          </span>
        </div>
      </div>

      {/* Explicit One-Click Dismiss Button */}
      <button
        onClick={e => {
          e.stopPropagation();
          finish();
        }}
        className="mt-8 px-4 py-1.5 rounded-full border border-theme-border-strong bg-theme-surface/90 hover:bg-theme-subtle text-theme-primary text-xs font-mono flex items-center space-x-1.5 shadow-sm transition-all"
        aria-label="Skip introduction and enter laboratory"
      >
        <span>Enter Archive</span>
        <ChevronRight className="w-3.5 h-3.5 text-theme-bronze" />
      </button>
    </div>
  );
};
