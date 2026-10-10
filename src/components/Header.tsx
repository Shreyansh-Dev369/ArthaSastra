'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Moon, Sun, Scroll, Terminal, BookOpen, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onScrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onScrollToSection }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check saved theme or system preference
    const saved = localStorage.getItem('arthasastra-theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.className = saved;
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.className = nextTheme;
    localStorage.setItem('arthasastra-theme', nextTheme);
  };

  const navItems = [
    { id: 'narrative', label: 'Archival Narrative', icon: Scroll },
    { id: 'dispatch', label: 'Dispatch Console', icon: Terminal },
    { id: 'ciphers', label: 'Classical Ciphers', icon: ShieldCheck },
    { id: 'analysis', label: 'Cryptanalysis', icon: Terminal },
    { id: 'tests', label: 'Test Suite', icon: ShieldCheck },
    { id: 'academic', label: 'Scholarly Context', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-obsidian-950/85 border-b border-charcoal-700/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Emblem */}
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => onScrollToSection('hero')}
              className="flex items-center space-x-3 group text-left focus:outline-none"
              aria-label="Return to top"
            >
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-bronze-400 to-bronze-700 p-0.5 shadow-seal transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center border border-bronze-500/30">
                  <span className="font-editorial text-bronze-300 font-bold text-lg tracking-wider">
                    अ
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-royal-leaf shadow-sm" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-editorial font-bold text-base tracking-[0.18em] text-ivory-100 group-hover:text-bronze-300 transition-colors">
                    ARTHAŚĀSTRA
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bronze-500/10 border border-bronze-500/30 text-bronze-400">
                    IKS LAB
                  </span>
                </div>
                <p className="text-[11px] font-mono tracking-wider text-charcoal-600 dark:text-ivory-400/60 uppercase">
                  Secure Dispatch & Cryptographic Seals
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onScrollToSection(item.id);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-bronze-500/15 text-bronze-300 border border-bronze-500/40 shadow-sm'
                      : 'text-ivory-300/70 hover:text-ivory-100 hover:bg-charcoal-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-70" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center space-x-3">
            {/* Security Protocol Badge */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-charcoal-800/80 border border-charcoal-700 text-[11px] text-ivory-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-leaf opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-royal-leaf"></span>
              </span>
              <span className="font-mono text-xs">HMAC-SHA-256 Validated</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg border border-charcoal-700 bg-charcoal-800/70 text-ivory-300 hover:text-bronze-300 hover:border-bronze-500/40 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg border border-charcoal-700 bg-charcoal-800/70 text-ivory-300 hover:text-ivory-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-charcoal-800 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onScrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg text-xs font-medium tracking-wider uppercase text-left flex items-center space-x-2.5 ${
                    isActive
                      ? 'bg-bronze-500/15 text-bronze-300 border border-bronze-500/40'
                      : 'text-ivory-300/80 hover:bg-charcoal-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
