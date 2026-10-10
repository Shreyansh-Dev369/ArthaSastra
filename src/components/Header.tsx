'use client';

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, Moon, Sun, Scroll, Terminal, BookOpen, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onScrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onScrollToSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'narrative', label: 'Archival Narrative', icon: Scroll },
    { id: 'dispatch', label: 'Dispatch Console', icon: Terminal },
    { id: 'ciphers', label: 'Classical Ciphers', icon: ShieldCheck },
    { id: 'analysis', label: 'Cryptanalysis', icon: Terminal },
    { id: 'tests', label: 'Test Suite', icon: ShieldCheck },
    { id: 'academic', label: 'Scholarly Context', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-theme-canvas/90 border-b border-theme-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Emblem */}
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => onScrollToSection('hero')}
              className="flex items-center space-x-3 group text-left focus:outline-none"
              aria-label="Return to top"
            >
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-theme-bronze/40 to-theme-bronze/80 p-0.5 shadow-sm transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-theme-surface rounded-[10px] flex items-center justify-center border border-theme-border-strong">
                  <span className="font-editorial text-theme-bronze font-bold text-lg tracking-wider">
                    अ
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-theme-seal shadow-seal" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-editorial font-bold text-base tracking-[0.18em] text-theme-primary group-hover:text-theme-bronze transition-colors">
                    ARTHAŚĀSTRA
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-theme-bronze/10 border border-theme-border-strong text-theme-bronze font-semibold">
                    IKS LAB
                  </span>
                </div>
                <p className="text-[11px] font-mono tracking-wider text-theme-muted uppercase">
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
                  className={`px-3 py-2 rounded-lg text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-theme-bronze/15 text-theme-bronze border border-theme-border-strong shadow-sm font-bold'
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-subtle'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center space-x-3">
            {/* Security Protocol Badge */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-theme-subtle border border-theme-border text-[11px] text-theme-secondary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-seal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-theme-seal"></span>
              </span>
              <span className="font-mono text-xs text-theme-primary">HMAC-SHA-256 Validated</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-subtle text-theme-primary hover:text-theme-bronze hover:border-theme-border-strong transition-all duration-200 shadow-sm"
              aria-label={`Switch to ${theme === 'dark' ? 'Light mode (Illuminated Manuscript)' : 'Dark mode (Royal Obsidian Archive)'}`}
              title={`Switch to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-theme-bronze animate-pulse" />
              ) : (
                <Moon className="w-4 h-4 text-theme-bronze" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-theme-border bg-theme-surface text-theme-primary hover:bg-theme-subtle transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-theme-border space-y-1">
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
                  className={`w-full px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase text-left flex items-center space-x-2.5 transition-all ${
                    isActive
                      ? 'bg-theme-bronze/15 text-theme-bronze border border-theme-border-strong font-bold'
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-subtle'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
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
