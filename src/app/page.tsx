'use client';

import React, { useState } from 'react';
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-ivory-100 flex flex-col font-sans selection:bg-bronze-500 selection:text-obsidian-950">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Act 0: Archival Opening Experience & Hero */}
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

        {/* Acts I - VIII: Cinematic Scroll Storytelling */}
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

        {/* Statistical Cryptanalysis & Frequency Workbench */}
        <CryptanalysisWorkbench />

        {/* System Automated Test Suite (20 Assertions) */}
        <SystemTestSuite />

        {/* Scholarly Framework & Academic References */}
        <AcademicContext />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
