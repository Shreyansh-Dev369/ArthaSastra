'use client';

import React, { useState } from 'react';
import { executeTestSuite } from '../lib/testSuite';
import { TestExecutionResult } from '../types/dispatch';
import { CheckCircle2, XCircle, Play, ShieldCheck, RefreshCw, Clock } from 'lucide-react';

export const SystemTestSuite: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestExecutionResult[] | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleRunTests = async () => {
    setIsRunning(true);
    await new Promise(res => setTimeout(res, 50));
    try {
      const res = await executeTestSuite();
      setResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const total = results ? results.length : 20;
  const passed = results ? results.filter(r => r.passed).length : 0;
  const failed = results ? results.filter(r => !r.passed).length : 0;
  const passPercent = results && total > 0 ? (passed / total) * 100 : 0;

  const filteredResults = results
    ? filterCategory === 'all'
      ? results
      : results.filter(r => r.category === filterCategory)
    : [];

  return (
    <section id="tests" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-theme-border">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-theme-border-strong bg-theme-bronze/10 text-xs font-mono text-theme-bronze uppercase tracking-widest font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Section 04 / Quality Verification</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-theme-primary tracking-tight">
          System Test Suite & Cryptographic Auditing
        </h2>
        <p className="text-sm sm:text-base text-theme-secondary leading-relaxed font-sans">
          Execute automated unit and integration assertions validating cipher reversibility,
          canonical serialization, Web Crypto HMAC-SHA-256 integrity checks, and clearance policy enforcement.
        </p>
      </div>

      <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-8 shadow-card space-y-7">
        {/* Top Control Bar & Run Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-theme-border gap-4">
          <div>
            <h3 className="font-editorial text-lg font-bold text-theme-primary">
              Automated Integrity Assertions
            </h3>
            <span className="text-xs font-mono text-theme-muted font-semibold">
              Deterministic runtime verification across 20 test vectors
            </span>
          </div>

          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
              isRunning
                ? 'bg-theme-subtle text-theme-muted cursor-wait border border-theme-border'
                : 'bg-theme-seal text-theme-canvas hover:opacity-90 shadow-seal'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Checks...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Execute Complete Test Suite</span>
              </>
            )}
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-1">
            <span className="text-[10px] text-theme-muted uppercase block font-bold">Total Assertions</span>
            <strong className="text-2xl font-bold text-theme-primary">{total}</strong>
            <span className="text-[11px] text-theme-secondary block">Expanded from baseline 12</span>
          </div>

          <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-1">
            <span className="text-[10px] text-theme-muted uppercase block font-bold">Passed Assertions</span>
            <strong className="text-2xl font-bold text-theme-seal">
              {results ? passed : '—'}
            </strong>
            <span className="text-[11px] text-theme-secondary block">
              {results ? `${passPercent.toFixed(0)}% success rate` : 'Awaiting execution'}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-1">
            <span className="text-[10px] text-theme-muted uppercase block font-bold">Failed Assertions</span>
            <strong
              className={`text-2xl font-bold ${
                failed > 0 ? 'text-theme-vermilion' : 'text-theme-secondary'
              }`}
            >
              {results ? failed : '—'}
            </strong>
            <span className="text-[11px] text-theme-secondary block">
              {failed > 0 ? 'Action required' : 'Zero regressions'}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-theme-inset rounded-full overflow-hidden border border-theme-border">
            <div
              style={{ width: `${passPercent}%` }}
              className="h-full bg-theme-seal transition-all duration-500"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        {results && (
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'all', label: 'All Tests' },
              { id: 'ciphers', label: 'Classical Ciphers' },
              { id: 'authentication', label: 'HMAC Authentication' },
              { id: 'authorization', label: 'Clearance Policy' },
              { id: 'cryptanalysis', label: 'Cryptanalysis' },
              { id: 'lifecycle', label: 'Lifecycle End-to-End' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  filterCategory === tab.id
                    ? 'bg-theme-bronze/15 border border-theme-border-strong text-theme-bronze font-bold shadow-sm'
                    : 'border border-theme-border bg-theme-surface text-theme-secondary hover:text-theme-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Test Cases List */}
        {!results ? (
          <div className="py-12 text-center text-theme-muted font-mono text-xs space-y-2 border border-dashed border-theme-border rounded-xl">
            <ShieldCheck className="w-8 h-8 mx-auto opacity-40" />
            <p>Click "Execute Complete Test Suite" to run the 20 automated verification checks.</p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredResults.map(test => (
              <div
                key={test.id}
                className="p-3.5 rounded-xl border border-theme-border bg-theme-inset hover:border-theme-border-strong transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    {test.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-theme-seal shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-theme-vermilion shrink-0" />
                    )}
                    <strong className="text-theme-primary font-bold">{test.title}</strong>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-theme-surface border border-theme-border text-theme-muted uppercase font-bold">
                      {test.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-theme-secondary font-sans pl-6">
                    {test.description}
                  </p>
                  {test.error && (
                    <p className="text-[11px] text-theme-vermilion font-mono pl-6 font-bold">
                      Error: {test.error}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3 shrink-0 self-end sm:self-center pl-6 sm:pl-0">
                  <div className="flex items-center space-x-1 text-[10px] text-theme-muted">
                    <Clock className="w-3 h-3" />
                    <span>{test.durationMs}ms</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      test.passed
                        ? 'bg-theme-seal-bg text-theme-seal border border-theme-seal-border'
                        : 'bg-theme-vermilion-bg text-theme-vermilion border border-theme-vermilion-border'
                    }`}
                  >
                    {test.passed ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Academic Testing Disclosure */}
        <div className="p-4 rounded-xl border border-theme-border bg-theme-inset text-xs font-sans text-theme-secondary leading-relaxed">
          <strong className="text-theme-primary block mb-1 font-mono uppercase text-[11px] font-bold">
            Academic Audit & Testing Integrity Notice
          </strong>
          These tests are executed live in your browser against Web Crypto API primitives and local algorithm definitions. 
          Passing automated unit tests verifies code correctness within our educational simulation; it does not turn classical 
          ciphers into confidential cryptographic systems.
        </div>
      </div>
    </section>
  );
};
