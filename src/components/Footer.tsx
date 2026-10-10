'use client';

import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-theme-border bg-theme-canvas py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-theme-muted transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission Statement */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="font-editorial font-bold text-sm tracking-widest text-theme-primary">
              ARTHAŚĀSTRA
            </span>
            <span className="text-theme-muted opacity-50">/</span>
            <span className="text-theme-bronze font-bold">SECURE DISPATCH LAB</span>
          </div>
          <p className="text-[11px] text-theme-secondary max-w-md font-sans">
            Indian Knowledge Systems (IKS) Educational Research Project.
            Investigating ancient statecraft, confidential writs, royal seals, and modern cryptographic message verification.
          </p>
        </div>

        {/* Runtime & Security Specifications */}
        <div className="text-center md:text-right space-y-1 text-[11px]">
          <div className="flex items-center justify-center md:justify-end space-x-1.5 text-theme-seal font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Local Web Crypto API · Zero Network Requests</span>
          </div>
          <p className="text-theme-muted">
            Next.js 15 · TypeScript · Tailwind CSS · Vercel Ready
          </p>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-subtle text-theme-primary hover:text-theme-bronze transition-colors flex items-center space-x-1.5 shadow-sm"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-[11px] uppercase tracking-wider font-semibold">Top</span>
        </button>
      </div>
    </footer>
  );
};
