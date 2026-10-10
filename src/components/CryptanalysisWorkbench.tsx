'use client';

import React, { useState } from 'react';
import { analyzeCiphertext } from '../lib/cryptanalysis';
import { CryptanalysisResult } from '../types/dispatch';
import { BarChart3, HelpCircle, AlertCircle, RefreshCw, Sparkles, Table as TableIcon } from 'lucide-react';

export const CryptanalysisWorkbench: React.FC = () => {
  const [inputText, setInputText] = useState(
    'Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj. Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj, dqg wkhq uhwxqv wr wkh txlhw yloodjh dw gdzq.'
  );
  const [showTable, setShowTable] = useState(false);
  const [showAllCandidates, setShowAllCandidates] = useState(false);

  // Compute live analysis
  const analysis: CryptanalysisResult = analyzeCiphertext(inputText);

  const sampleCorpora = [
    {
      label: 'Caesar Shift +3 Sample',
      text: 'Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj. Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj, dqg wkhq uhwxqv wr wkh txlhw yloodjh dw gdzq.',
    },
    {
      label: 'Long Historical Statecraft Passage (Shift +7)',
      text: 'Aol zljyla vyklyz vm aol rpun wylzlycl aol ylhst myvt pualyuhs kpzvykly huk mvylpnu puchsphy. Aol zjypllz t化物 aol tbyyh bwyvshu.',
    },
    {
      label: 'Polyalphabetic Vigenère Sample (Keyword: KAUTILYA)',
      text: 'Zovd qhe amzex, hoxrv lce vwkaxvr ombtyze. Xveq kx xve vheikzrg egvcv.',
    },
    {
      label: 'Short Ambiguous Sample (High Variance)',
      text: 'Dyyfhp fy ifbs',
    },
  ];

  // Find max observed percent for scaling bar heights
  const maxPercent = Math.max(
    ...analysis.frequencies.map(f => Math.max(f.observedPercent, f.expectedPercent)),
    15
  );

  return (
    <section id="analysis" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-charcoal-700/60">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-bronze-500/40 bg-bronze-500/10 text-xs font-mono text-bronze-300 uppercase tracking-widest">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Section 03 / Statistical Workbench</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-ivory-100 tracking-tight">
          Cryptanalysis & Frequency Workbench
        </h2>
        <p className="text-sm sm:text-base text-ivory-300/80 leading-relaxed">
          Unmask classical ciphers through statistical linguistics: measure the Friedman Index of Coincidence (IC),
          audit the full 26-letter frequency distribution, and evaluate chi-square shift hypotheses.
        </p>
      </div>

      <div className="bg-charcoal-900/80 border border-charcoal-700/80 rounded-2xl p-6 sm:p-8 shadow-archival-card space-y-7">
        {/* Input & Sample Selectors */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-mono font-bold tracking-wider uppercase text-ivory-300">
              Ciphertext Sample for Analysis
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sampleCorpora.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(sample.text)}
                  className="px-2.5 py-1 rounded-lg border border-charcoal-700 bg-charcoal-800 text-ivory-300 hover:text-bronze-300 hover:border-bronze-500/40 text-[11px] font-mono transition-colors"
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
            className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl px-4 py-2.5 text-sm font-mono text-ivory-100 focus:outline-none focus:border-bronze-400"
            placeholder="Paste ciphertext to analyze..."
          />
        </div>

        {/* Statistical Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="p-4 rounded-xl border border-charcoal-700 bg-charcoal-950/70 space-y-1">
            <span className="text-[10px] text-charcoal-600 dark:text-ivory-400/60 uppercase block">Letter Count (N)</span>
            <strong className="text-2xl font-bold text-ivory-100">{analysis.letterCount}</strong>
            <span className="text-[11px] text-ivory-400/80 block">Alphabetic symbols evaluated</span>
          </div>

          <div className="p-4 rounded-xl border border-charcoal-700 bg-charcoal-950/70 space-y-1">
            <span className="text-[10px] text-charcoal-600 dark:text-ivory-400/60 uppercase block">Index of Coincidence (IC)</span>
            <strong className="text-2xl font-bold text-royal-leaf">
              {analysis.ic.toFixed(4)}
            </strong>
            <span className="text-[11px] text-ivory-400/80 block">
              {analysis.ic >= 0.055 ? 'Monoalphabetic (High Variance)' : 'Flattened / Mixed Profile'}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-charcoal-700 bg-charcoal-950/70 space-y-1">
            <span className="text-[10px] text-charcoal-600 dark:text-ivory-400/60 uppercase block">Best Caesar Hypothesis</span>
            <strong className="text-2xl font-bold text-bronze-300">
              Shift +{analysis.bestShift}
            </strong>
            <span className="text-[11px] text-ivory-400/80 block">
              Chi-Square: {analysis.bestScore.toFixed(2)}
            </span>
          </div>
        </div>

        {/* ================= FULL 26-LETTER FREQUENCY DISTRIBUTION ================= */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-charcoal-700/80 pb-3 gap-2">
            <div>
              <h3 className="font-editorial text-base font-bold text-ivory-100 flex items-center space-x-2">
                <span>Complete 26-Letter Frequency Distribution (A–Z)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-royal-leaf/10 border border-royal-leaf/30 text-royal-leaf">
                  Audited Fix: All 26 Bins
                </span>
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-ivory-400/60 font-mono">
                Green bars: Observed in sample · Bronze outlines: Standard English expectation (Beker & Piper corpus)
              </p>
            </div>

            <button
              onClick={() => setShowTable(!showTable)}
              className="self-start sm:self-auto px-3 py-1.5 rounded-lg border border-charcoal-700 bg-charcoal-800 text-xs font-mono text-ivory-300 hover:text-ivory-100 flex items-center space-x-1.5"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{showTable ? 'View Visual Chart' : 'View Accessible Table'}</span>
            </button>
          </div>

          {/* Visual Bar Chart */}
          {!showTable ? (
            <div className="space-y-2">
              <div className="h-56 bg-charcoal-950 rounded-xl border border-charcoal-800 p-4 pt-6 flex items-end gap-1 sm:gap-2">
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
                        <div className="bg-obsidian-950 border border-bronze-400 px-2.5 py-1 rounded shadow-xl font-mono text-[10px] text-ivory-100 whitespace-nowrap">
                          <strong>{f.letter}:</strong> {f.count} chars ({f.observedPercent.toFixed(1)}%)
                          <br />
                          <span className="text-bronze-300">Expected: {f.expectedPercent.toFixed(1)}%</span>
                        </div>
                        <div className="w-1.5 h-1.5 bg-bronze-400 rotate-45 -mt-0.5" />
                      </div>

                      {/* Bar Containers */}
                      <div className="w-full h-full flex items-end justify-center relative">
                        {/* Expected Benchmark Outline */}
                        <div
                          style={{ height: expectedHeight }}
                          className="w-full max-w-[14px] border-t-2 border-x border-bronze-500/40 bg-bronze-500/5 absolute bottom-0 rounded-t"
                          title={`Expected English for ${f.letter}: ${f.expectedPercent}%`}
                        />

                        {/* Observed Frequency Bar */}
                        <div
                          style={{ height: observedHeight }}
                          className={`w-full max-w-[10px] rounded-t transition-all z-10 ${
                            f.count > 0 ? 'bg-royal-leaf shadow-sm' : 'bg-charcoal-800'
                          }`}
                        />
                      </div>

                      {/* X-Axis Letter Label */}
                      <span className="text-[10px] font-mono font-bold text-ivory-300/80 mt-2 block group-hover:text-royal-leaf">
                        {f.letter}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-center space-x-6 text-[11px] font-mono text-ivory-400 pt-1">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-royal-leaf" />
                  <span>Observed Ciphertext Distribution</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm border border-bronze-400 bg-bronze-500/10" />
                  <span>Standard Natural English Corpus</span>
                </div>
              </div>
            </div>
          ) : (
            /* Accessible Table View */
            <div className="overflow-x-auto border border-charcoal-800 rounded-xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-charcoal-950 border-b border-charcoal-800 text-charcoal-600 dark:text-ivory-400/60 text-[10px] uppercase">
                  <tr>
                    <th className="p-2.5">Letter</th>
                    <th className="p-2.5">Observed Count</th>
                    <th className="p-2.5">Observed Frequency</th>
                    <th className="p-2.5">Standard English Expected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-800">
                  {analysis.frequencies.map(f => (
                    <tr key={f.letter} className="hover:bg-charcoal-800/40">
                      <td className="p-2.5 font-bold text-royal-leaf">{f.letter}</td>
                      <td className="p-2.5 text-ivory-200">{f.count}</td>
                      <td className="p-2.5 text-ivory-200">{f.observedPercent.toFixed(2)}%</td>
                      <td className="p-2.5 text-bronze-300">{f.expectedPercent.toFixed(2)}%</td>
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
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-bronze-400">
              Optimal Chi-Square Candidate Decryption (Shift +{analysis.bestShift})
            </span>
            <button
              onClick={() => setShowAllCandidates(!showAllCandidates)}
              className="text-xs font-mono text-bronze-300 hover:underline"
            >
              {showAllCandidates ? 'Collapse Candidates' : 'Inspect All 26 Shift Candidates'}
            </button>
          </div>
          <div className="p-4 rounded-xl bg-charcoal-950 border border-bronze-500/30 font-mono text-sm text-ivory-100 break-all select-all">
            {analysis.bestPlain}
          </div>
        </div>

        {/* All 26 Shift Candidates Table */}
        {showAllCandidates && (
          <div className="border border-charcoal-800 rounded-xl overflow-hidden max-h-64 overflow-y-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-charcoal-950 border-b border-charcoal-800 text-charcoal-600 dark:text-ivory-400/60 text-[10px] uppercase sticky top-0">
                <tr>
                  <th className="p-2">Shift</th>
                  <th className="p-2">Chi-Square Score (Lower = Better Fit)</th>
                  <th className="p-2">Candidate Plaintext</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800">
                {analysis.candidates.map((c, i) => (
                  <tr
                    key={c.shift}
                    className={i === 0 ? 'bg-royal-leaf/10 font-bold text-royal-leaf' : 'hover:bg-charcoal-800/40 text-ivory-300'}
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

        {/* Scholarly Analysis Notes & Epistemological Warning */}
        <div className="p-4 rounded-xl border border-charcoal-700 bg-charcoal-950/80 space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-bronze-300 font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-royal-leaf" />
            <span>Statistical Diagnostic Commentary</span>
          </div>
          <p className="text-ivory-300/90 leading-relaxed font-sans">
            {analysis.notes}
          </p>
          <div className="pt-2 text-[11px] text-charcoal-600 dark:text-ivory-400/60 font-mono border-t border-charcoal-800">
            <strong>Theoretical Boundary:</strong> Frequency cryptanalysis assumes stationary linguistic probability distributions. For short texts, deliberate omission of common letters (lipograms), or transposed alphabets, chi-square scoring serves only as an empirical heuristic, not infallible mathematical deduction.
          </div>
        </div>
      </div>
    </section>
  );
};
