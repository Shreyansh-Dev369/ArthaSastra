'use client';

import React from 'react';
import { ArrowUp, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-charcoal-700/80 bg-obsidian-950/90 py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-ivory-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission Statement */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="font-editorial font-bold text-sm tracking-widest text-ivory-100">
              ARTHAŚĀSTRA
            </span>
            <span className="text-charcoal-600 dark:text-ivory-400/60">/</span>
            <span className="text-bronze-300">SECURE DISPATCH LAB</span>
          </div>
          <p className="text-[11px] text-charcoal-600 dark:text-ivory-400/60 max-w-md">
            Indian Knowledge Systems (IKS) Educational Project.
            Investigating ancient statecraft, confidential writs, royal seals, and modern cryptographic message verification.
          </p>
        </div>

        {/* Runtime & Security Specifications */}
        <div className="text-center md:text-right space-y-1 text-[11px]">
          <div className="flex items-center justify-center md:justify-end space-x-1.5 text-royal-leaf">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Local Web Crypto API · Zero Network Requests</span>
          </div>
          <p className="text-charcoal-600 dark:text-ivory-400/60">
            Next.js 15 · TypeScript · Tailwind CSS · Vercel Ready
          </p>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl border border-charcoal-700 bg-charcoal-800/80 hover:bg-charcoal-700 text-ivory-300 hover:text-bronze-300 transition-colors flex items-center space-x-1.5"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-[11px] uppercase tracking-wider">Top</span>
        </button>
      </div>
    </footer>
  );
};
