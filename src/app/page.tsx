'use client';

import React, { useState } from 'react';
import { BrandedPreloader } from '../components/BrandedPreloader';
import { Header } from '../components/Header';
import { HeroArchive } from '../components/HeroArchive';
import { StorytellingNarrative } from '../components/StorytellingNarrative';
import { DispatchConsole } from '../components/DispatchConsole';
import { ClassicalCipherLab } from '../components/ClassicalCipherLab';
import { CryptanalysisWorkbench } from '../components/CryptanalysisWorkbench';
import { SystemTestSuite } from '../components/SystemTestSuite';
import { AcademicContext } from '../components/AcademicContext';
import { Footer } from '../components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('narrative');
  const [preloaderDone, setPreloaderDone] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-theme-canvas text-theme-primary flex flex-col font-sans selection:bg-theme-bronze selection:text-theme-canvas transition-colors duration-200">
      {/* Branded Opening Preloader Sequence */}
      {!preloaderDone && (
        <BrandedPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Application Top Header & Theme Switcher */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Act I: Archival Opening Experience & Hero */}
        <HeroArchive
          onEnterLab={() => {
            setActiveTab('dispatch');
            scrollToSection('dispatch');
          }}
          onExploreNarrative={() => {
            setActiveTab('narrative');
            scrollToSection('narrative');
          }}
        />

        {/* Acts II - IX: Cinematic Archival Storytelling */}
        <StorytellingNarrative
          onJumpToLab={() => {
            setActiveTab('dispatch');
            scrollToSection('dispatch');
          }}
        />

        {/* Core Laboratory: Secure Dispatch Console */}
        <DispatchConsole />

        {/* Educational Classical Cipher Laboratory */}
        <ClassicalCipherLab />

        {/* Statistical Cryptanalysis & 26-Letter Frequency Workbench */}
        <CryptanalysisWorkbench />

        {/* System Automated Test Suite (20 Assertions) */}
        <SystemTestSuite />

        {/* Scholarly Framework & Academic References */}
        <AcademicContext />
      </main>

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
}
