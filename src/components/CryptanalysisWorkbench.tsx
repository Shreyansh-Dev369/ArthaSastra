'use client';

import React, { useState } from 'react';
import { analyzeCiphertext } from '../lib/cryptanalysis';
import { CryptanalysisResult } from '../types/dispatch';
import { BarChart3, Sparkles, Table as TableIcon } from 'lucide-react';

export const CryptanalysisWorkbench: React.FC = () => {
  const [inputText, setInputText] = useState(
    'Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj. Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj, dqg wkhq uhwxqv wr wkh txlhw yloodjh dw gdzq.'
  );
  const [showTable, setShowTable] = useState(false);
  const [showAllCandidates, setShowAllCandidates] = useState(false);

  // Compute live cryptanalysis
  const analysis: CryptanalysisResult = analyzeCiphertext(inputText);

  const sampleCorpora = [
    {
      label: 'Caesar Shift +3 Sample',
      text: 'Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj. Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj, dqg wkhq uhwxqv wr wkh txlhw yloodjh dw gdzq.',
    },
    {
      label: 'Mauryan Statecraft Dispatch (Shift +7)',
      text: 'Aol zljyla vyklyz vm aol rpun wylzlycl aol ylhst myvt pualyuhs kpzvykly huk mvylpnu puchsphy. Aol zjypllz t化物 aol tbyyh bwyvshu.',
    },
    {
      label: 'Polyalphabetic Vigenère Sample (Key: KAUTILYA)',
      text: 'Zovd qhe amzex, hoxrv lce vwkaxvr ombtyze. Xveq kx xve vheikzrg egvcv.',
    },
    {
      label: 'Short Ambiguous Sample (High Variance)',
      text: 'Dyyfhp fy ifbs',
    },
  ];

  // Max percent for scaling bar heights
  const maxPercent = Math.max(
    ...analysis.frequencies.map(f => Math.max(f.observedPercent, f.expectedPercent)),
    15
  );

  return (
    <section id="analysis" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-theme-border">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-theme-border-strong bg-theme-bronze/10 text-xs font-mono text-theme-bronze uppercase tracking-widest font-bold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Section 03 / Statistical Workbench</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-theme-primary tracking-tight">
          Cryptanalysis & Frequency Workbench
        </h2>
        <p className="text-sm sm:text-base text-theme-secondary leading-relaxed font-sans">
          Unmask classical ciphers through statistical linguistics: measure the Friedman Index of Coincidence (IC),
          audit the full 26-letter frequency distribution, and evaluate chi-square shift hypotheses.
        </p>
      </div>

      <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-8 shadow-card space-y-7">
        {/* Input & Sample Selectors */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-mono font-bold tracking-wider uppercase text-theme-secondary">
              Ciphertext Sample for Analysis
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sampleCorpora.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(sample.text)}
                  className="px-2.5 py-1 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-subtle text-theme-secondary hover:text-theme-primary text-[11px] font-mono transition-colors shadow-sm"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={3}
            className="w-full bg-theme-inset border border-theme-border rounded-xl px-4 py-2.5 text-sm font-mono text-theme-primary focus:outline-none focus:border-theme-bronze"
            placeholder="Paste ciphertext to analyze..."
          />
        </div>

        {/* Statistical Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-1">
            <span className="text-[10px] text-theme-muted uppercase block font-bold">Letter Count (N)</span>
            <strong className="text-2xl font-bold text-theme-primary">{analysis.letterCount}</strong>
            <span className="text-[11px] text-theme-secondary block">Alphabetic symbols evaluated</span>
          </div>

          <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-1">
            <span className="text-[10px] text-theme-muted uppercase block font-bold">Index of Coincidence (IC)</span>
            <strong className="text-2xl font-bold text-theme-seal">
              {analysis.ic.toFixed(4)}
            </strong>
            <span className="text-[11px] text-theme-secondary block">
              {analysis.ic >= 0.055 ? 'Monoalphabetic (High Variance)' : 'Flattened / Mixed Profile'}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-1">
            <span className="text-[10px] text-theme-muted uppercase block font-bold">Best Caesar Hypothesis</span>
            <strong className="text-2xl font-bold text-theme-bronze">
              Shift +{analysis.bestShift}
            </strong>
            <span className="text-[11px] text-theme-secondary block">
              Chi-Square: {analysis.bestScore.toFixed(2)}
            </span>
          </div>
        </div>

        {/* ================= FULL 26-LETTER FREQUENCY DISTRIBUTION ================= */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-theme-border pb-3 gap-2">
            <div>
              <h3 className="font-editorial text-base font-bold text-theme-primary flex items-center space-x-2">
                <span>Complete 26-Letter Frequency Distribution (A–Z)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-seal-bg border border-theme-seal-border text-theme-seal font-bold">
                  All 26 Bins Audited
                </span>
              </h3>
              <p className="text-xs text-theme-secondary font-mono">
                Green bars: Observed in sample · Bronze outlines: Standard English expectation (Beker & Piper corpus)
              </p>
            </div>

            <button
              onClick={() => setShowTable(!showTable)}
              className="self-start sm:self-auto px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-subtle text-xs font-mono text-theme-secondary hover:text-theme-primary flex items-center space-x-1.5 shadow-sm"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{showTable ? 'View Visual Chart' : 'View Accessible Table'}</span>
            </button>
          </div>

          {/* Visual Bar Chart */}
          {!showTable ? (
            <div className="space-y-2">
              <div className="h-56 bg-theme-inset rounded-xl border border-theme-border p-4 pt-6 flex items-end gap-1 sm:gap-2">
                {analysis.frequencies.map(f => {
                  const observedHeight = `${Math.min(100, (f.observedPercent / maxPercent) * 100)}%`;
                  const expectedHeight = `${Math.min(100, (f.expectedPercent / maxPercent) * 100)}%`;

                  return (
                    <div
                      key={f.letter}
                      className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer"
                    >
                      {/* Interactive Tooltip on Hover */}
                      <div className="absolute -top-14 hidden group-hover:flex group-focus:flex flex-col items-center z-30 pointer-events-none">
                        <div className="bg-theme-surface border border-theme-border-strong px-2.5 py-1 rounded shadow-xl font-mono text-[10px] text-theme-primary whitespace-nowrap">
                          <strong>{f.letter}:</strong> {f.count} chars ({f.observedPercent.toFixed(1)}%)
                          <br />
                          <span className="text-theme-bronze font-bold">Expected: {f.expectedPercent.toFixed(1)}%</span>
                        </div>
                        <div className="w-1.5 h-1.5 bg-theme-surface border-r border-b border-theme-border-strong rotate-45 -mt-0.5" />
                      </div>

                      {/* Bar Containers */}
                      <div className="w-full h-full flex items-end justify-center relative">
                        {/* Expected Benchmark Outline */}
                        <div
                          style={{ height: expectedHeight }}
                          className="w-full max-w-[14px] border-t-2 border-x border-theme-bronze/40 bg-theme-bronze/10 absolute bottom-0 rounded-t"
                          title={`Expected English for ${f.letter}: ${f.expectedPercent}%`}
                        />

                        {/* Observed Frequency Bar */}
                        <div
                          style={{ height: observedHeight }}
                          className={`w-full max-w-[10px] rounded-t transition-all z-10 ${
                            f.count > 0 ? 'bg-theme-seal shadow-sm' : 'bg-theme-border'
                          }`}
                        />
                      </div>

                      {/* X-Axis Letter Label */}
                      <span className="text-[10px] font-mono font-bold text-theme-muted mt-2 block group-hover:text-theme-seal">
                        {f.letter}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-center space-x-6 text-[11px] font-mono text-theme-muted pt-1">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-theme-seal" />
                  <span>Observed Ciphertext Distribution</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm border border-theme-bronze bg-theme-bronze/15" />
                  <span>Standard Natural English Corpus</span>
                </div>
              </div>
            </div>
          ) : (
            /* Accessible Table View */
            <div className="overflow-x-auto border border-theme-border rounded-xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-theme-inset border-b border-theme-border text-theme-muted text-[10px] uppercase font-bold">
                  <tr>
                    <th className="p-2.5">Letter</th>
                    <th className="p-2.5">Observed Count</th>
                    <th className="p-2.5">Observed Frequency</th>
                    <th className="p-2.5">Standard English Expected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-theme-border">
                  {analysis.frequencies.map(f => (
                    <tr key={f.letter} className="hover:bg-theme-subtle">
                      <td className="p-2.5 font-bold text-theme-seal">{f.letter}</td>
                      <td className="p-2.5 text-theme-primary">{f.count}</td>
                      <td className="p-2.5 text-theme-primary">{f.observedPercent.toFixed(2)}%</td>
                      <td className="p-2.5 text-theme-bronze font-bold">{f.expectedPercent.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Best Caesar Decryption Preview */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-theme-bronze">
              Optimal Chi-Square Candidate Decryption (Shift +{analysis.bestShift})
            </span>
            <button
              onClick={() => setShowAllCandidates(!showAllCandidates)}
              className="text-xs font-mono text-theme-bronze hover:underline font-bold"
            >
              {showAllCandidates ? 'Collapse Candidates' : 'Inspect All 26 Shift Candidates'}
            </button>
          </div>
          <div className="p-4 rounded-xl bg-theme-inset border border-theme-border font-mono text-sm text-theme-primary break-all select-all">
            {analysis.bestPlain}
          </div>
        </div>

        {/* All 26 Shift Candidates Table */}
        {showAllCandidates && (
          <div className="border border-theme-border rounded-xl overflow-hidden max-h-64 overflow-y-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-theme-inset border-b border-theme-border text-theme-muted text-[10px] uppercase sticky top-0 font-bold">
                <tr>
                  <th className="p-2">Shift</th>
                  <th className="p-2">Chi-Square Score (Lower = Better Fit)</th>
                  <th className="p-2">Candidate Plaintext</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {analysis.candidates.map((c, i) => (
                  <tr
                    key={c.shift}
                    className={i === 0 ? 'bg-theme-seal-bg font-bold text-theme-seal' : 'hover:bg-theme-subtle text-theme-secondary'}
                  >
                    <td className="p-2 font-mono">+{c.shift}</td>
                    <td className="p-2 font-mono">{c.score.toFixed(2)}</td>
                    <td className="p-2 font-mono truncate max-w-xs">{c.plain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Scholarly Analysis Notes */}
        <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-theme-bronze font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-theme-seal" />
            <span>Statistical Diagnostic Commentary</span>
          </div>
          <p className="text-theme-secondary leading-relaxed font-sans">
            {analysis.notes}
          </p>
          <div className="pt-2 text-[11px] text-theme-muted font-mono border-t border-theme-border">
            <strong>Theoretical Boundary:</strong> Frequency cryptanalysis assumes stationary linguistic probability distributions. For short texts, lipograms, or transposed alphabets, chi-square scoring serves only as an empirical heuristic, not infallible mathematical deduction.
          </div>
        </div>
      </div>
    </section>
  );
};
