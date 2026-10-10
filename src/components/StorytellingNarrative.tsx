'use client';

import React, { useState } from 'react';
import { Scroll, ShieldAlert, Key, Route, CheckCircle2, FlaskConical, GraduationCap, ChevronRight, Lock, Unlock } from 'lucide-react';

interface StorytellingNarrativeProps {
  onJumpToLab: () => void;
}

export const StorytellingNarrative: React.FC<StorytellingNarrativeProps> = ({ onJumpToLab }) => {
  const [activeAct, setActiveAct] = useState<number>(1);
  const [demoTransformText, setDemoTransformText] = useState('Pataliputra gate secure.');
  const [demoShift, setDemoShift] = useState(5);

  const caesarShiftDemo = (str: string, shift: number) => {
    return [...str].map(ch => {
      const lower = ch.toLowerCase();
      const idx = 'abcdefghijklmnopqrstuvwxyz'.indexOf(lower);
      if (idx < 0) return ch;
      const res = 'abcdefghijklmnopqrstuvwxyz'[(idx + shift) % 26];
      return ch === lower ? res : res.toUpperCase();
    }).join('');
  };

  const acts = [
    {
      act: 1,
      tag: 'ACT I',
      title: 'The Royal Archive & The Mandate of Statecraft',
      subtitle: 'Arthaśāstra Book II (Śāsanādhikāra) & Book V',
      icon: Scroll,
      summary:
        'In the political realism of Kauṭilya, governance depends upon the fidelity of communication. Writs (śāsana) were drafted by vetted scribes (lekhaka), sealed with royal insignia (mudrā), and entrusted to envoys whose loyalty was subject to unyielding scrutiny.',
      historicalRef:
        '“The King’s decree is the soul of governance. He who corrupts a royal writ, alters its seal, or falsely presents a counterfeit mandate suffers the highest penalty.” — Arthaśāstra II.10',
      interactive: (
        <div className="p-4 rounded-xl border border-charcoal-700 bg-charcoal-900/80 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-bronze-400 border-b border-charcoal-700/60 pb-2">
            <span>COUNCIL OF MINISTERS (Mantripariṣad)</span>
            <span className="text-[10px] bg-bronze-500/20 px-2 py-0.5 rounded">PATALIPUTRA ARCHIVE</span>
          </div>
          <p className="text-ivory-300/80 leading-relaxed">
            The scribes of the Mauryan chancellery utilized distinctive inks, unique scripts, and clay or wax mudrās 
            to deter interception and forgeries across the fourteen janapadas.
          </p>
        </div>
      ),
    },
    {
      act: 2,
      tag: 'ACT II',
      title: 'The Dispatch: The Envoy & The Sensitive Mandate',
      subtitle: 'Composing the classified dispatch under clearance tiers',
      icon: Lock,
      summary:
        'An envoy (Dūta) is dispatched to a frontier garrison at dawn. The contents must remain unintelligible to bandit hands or hostile spies, while permitting the regional Senāpati (General) to authenticate that the order truly originated from the royal council.',
      historicalRef:
        '“Envoys are classified into three ranks: the Plenipotentiary (Nisṛṣṭārtha), the Envoy with a limited mission (Parimitārtha), and the Carrier of Royal Letters (Śāsanahara).” — Arthaśāstra I.16',
      interactive: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="p-3 rounded-lg border border-charcoal-700 bg-charcoal-800/60 space-y-1">
            <span className="text-ivory-300 font-bold block">OPEN (Sarvajanīya)</span>
            <span className="text-charcoal-600 dark:text-ivory-400/60 text-[11px] block">Public decrees, tax quotas, transit passes</span>
          </div>
          <div className="p-3 rounded-lg border border-bronze-500/40 bg-bronze-500/10 space-y-1">
            <span className="text-bronze-300 font-bold block">COUNSEL (Mantrin)</span>
            <span className="text-charcoal-600 dark:text-ivory-400/60 text-[11px] block">Provincial governance, logistical dispatches</span>
          </div>
          <div className="p-3 rounded-lg border border-royal-leaf/40 bg-royal-leaf/10 space-y-1">
            <span className="text-royal-leaf font-bold block">SECRET (Gūḍha)</span>
            <span className="text-charcoal-600 dark:text-ivory-400/60 text-[11px] block">Troop maneuvers, intelligence network briefs</span>
          </div>
        </div>
      ),
    },
    {
      act: 3,
      tag: 'ACT III',
      title: 'The Transformation: Classical Educational Ciphers',
      subtitle: 'Obfuscating visual form vs modern cryptographic security',
      icon: Key,
      summary:
        'To demonstrate historical ideas of secret writing (Gūḍhalekha), our laboratory incorporates classical ciphers: the monoalphabetic Caesar shift, the polyalphabetic Vigenère tableau, and reciprocal pair substitutions. We explicitly emphasize that classical ciphers are educational teaching tools and vulnerable to statistical analysis.',
      historicalRef:
        '“Communication with secret agents shall occur through secret writings (gūḍhalekha) and pre-arranged musical or visual signals.” — Arthaśāstra I.12',
      interactive: (
        <div className="p-4 rounded-xl border border-charcoal-700 bg-charcoal-900/90 space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-ivory-300 font-bold">Interactive Shift Visualizer:</span>
            <div className="flex items-center space-x-2">
              <span className="text-bronze-400">Shift Key: +{demoShift}</span>
              <input
                type="range"
                min="1"
                max="25"
                value={demoShift}
                onChange={e => setDemoShift(Number(e.target.value))}
                className="w-24 accent-royal-leaf"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded bg-charcoal-800 border border-charcoal-700">
              <span className="text-charcoal-600 dark:text-ivory-400/60 block text-[10px] mb-1">PLAINTEXT INPUT</span>
              <span className="text-ivory-100">{demoTransformText}</span>
            </div>
            <div className="p-2.5 rounded bg-charcoal-800 border border-bronze-500/30">
              <span className="text-bronze-400 block text-[10px] mb-1">CIPHERTEXT (CAESAR +{demoShift})</span>
              <span className="text-royal-leaf break-all">{caesarShiftDemo(demoTransformText, demoShift)}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      act: 4,
      tag: 'ACT IV',
      title: 'The Seal (Mudrā) Evolved: Cryptographic HMAC-SHA-256',
      subtitle: 'Binding message parameters to an unforgeable authentication tag',
      icon: ShieldAlert,
      summary:
        'An encrypted message without integrity verification invites catastrophe. In modern cryptography, a Hash-based Message Authentication Code (HMAC-SHA-256) takes a secret key and the canonical representation of the dispatch, generating a 256-bit authentication tag.',
      historicalRef:
        '“No traveler or goods shall pass through the toll-gate without the imprint of the royal seal (mudrā-adhyakṣa).” — Arthaśāstra II.34',
      interactive: (
        <div className="p-4 rounded-xl border border-royal-leaf/30 bg-royal-leaf/5 space-y-2 text-xs font-mono">
          <span className="text-royal-leaf font-bold block">CANONICAL PROTOCOL BINDING</span>
          <p className="text-ivory-300/80 leading-relaxed text-[11px]">
            Unlike naive implementations, our engine deterministically serializes:
            <br />
            <code className="text-bronze-300 bg-charcoal-900 px-1.5 py-0.5 rounded mt-1 inline-block">
              {JSON.stringify({ version: "1.0", from: "envoy", level: "secret", cipher: "caesar", params: { shift: 5 }, body: "..." })}
            </code>
          </p>
          <span className="text-[10px] text-ivory-400/60 block">
            Altering any single parameter (even the cipher shift) invalidates the HMAC seal immediately.
          </span>
        </div>
      ),
    },
    {
      act: 5,
      tag: 'ACT V',
      title: 'The Journey: Transit Across Courier Outposts',
      subtitle: 'The perils of channel interception, tampering, and forged mandates',
      icon: Route,
      summary:
        'The royal courier traverses frontier passes, resting at courier stations (Dūtānudūta). In transit, adversarial forces may attempt to alter the message classification, falsify the sender identity, or tamper with the payload to incite civil rebellion.',
      historicalRef:
        '“The king must establish relay posts separated by appropriate distances, ensuring messages arrive with uncorrupted speed.” — Arthaśāstra II.1',
      interactive: (
        <div className="relative py-4 px-2">
          {/* Animated Route Line */}
          <div className="h-1 bg-charcoal-700 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-royal-leaf via-bronze-400 to-royal-leaf animate-pulse w-full" />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-ivory-400 mt-2">
            <span>PATALIPUTRA (Origin)</span>
            <span className="text-bronze-400">RELAY STATION 03</span>
            <span>CITADEL (Destination)</span>
          </div>
        </div>
      ),
    },
    {
      act: 6,
      tag: 'ACT VI',
      title: 'Receiver Verification & Clearance Enforcement',
      subtitle: 'Integrity verified first, clearance verified second, release granted last',
      icon: CheckCircle2,
      summary:
        'Upon receiving the dispatch packet, the recipient operates under strict zero-trust protocol: 1) Recompute the HMAC using the shared key over canonical data. If the tag differs, reject outright. 2) Check if the receiver’s clearance level meets the dispatch classification. 3) Only if both checks pass is the plaintext released.',
      historicalRef:
        '“He who reads a sealed dispatch without authorization, or delivers it to an uncertified recipient, shall be degraded in office.” — Arthaśāstra II.10',
      interactive: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg border border-royal-leaf/40 bg-royal-leaf/10 space-y-1">
            <span className="text-royal-leaf font-bold flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ACCEPTANCE CONDITION</span>
            </span>
            <span className="text-ivory-300/80 text-[11px] block">
              Seal tag matches perfectly AND Receiver Clearance &gt;= Packet Level. Plaintext released.
            </span>
          </div>
          <div className="p-3 rounded-lg border border-royal-crimson/40 bg-royal-crimson/10 space-y-1">
            <span className="text-royal-vermilion font-bold flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>REJECTION CONDITION</span>
            </span>
            <span className="text-ivory-300/80 text-[11px] block">
              Mismatched seal (tampering detected) OR Insufficient clearance. Plaintext withheld.
            </span>
          </div>
        </div>
      ),
    },
    {
      act: 7,
      tag: 'ACT VII',
      title: 'The Interactive Laboratory',
      subtitle: 'Hands-on experimentation with real cryptographic operations',
      icon: FlaskConical,
      summary:
        'The historical narrative culminates in a live, functional laboratory. Compose your own dispatches, simulate packet tampering, export and import portable JSON packets, inspect frequency analysis histograms, and run the 20-case test suite.',
      historicalRef:
        '“Experimentation and systematic observation are the prerequisites of statecraft.” — Kauṭilya',
      interactive: (
        <div className="text-center py-2">
          <button
            onClick={onJumpToLab}
            className="px-5 py-2.5 rounded-lg bg-bronze-500 hover:bg-bronze-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Launch Interactive Laboratory Below ↓
          </button>
        </div>
      ),
    },
    {
      act: 8,
      tag: 'ACT VIII',
      title: 'The Epistemological Lesson: Trust Through Verification',
      subtitle: 'Jñānam eva Balam — Knowledge as the foundation of security',
      icon: GraduationCap,
      summary:
        'The overarching teaching of both the Arthaśāstra and modern computer science is that trust cannot be assumed—it must be cryptographically proven. Obfuscation of text is not protection of information. Security requires verified authenticity, cryptographic integrity, and disciplined access control.',
      historicalRef:
        '“As the unbaked clay vessel dissolves when immersed in water, so does a kingdom perish whose intelligence is without verification.” — Arthaśāstra I.15',
      interactive: (
        <div className="p-3.5 rounded-lg border border-bronze-500/30 bg-charcoal-900 text-xs text-ivory-300 italic text-center">
          “Communication without verification is deception; statecraft without vigilance is ruin.”
        </div>
      ),
    },
  ];

  return (
    <section id="narrative" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-charcoal-700/60">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-bronze-400">
          Scroll-Driven Archival Exhibition
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-ivory-100 tracking-tight">
          The Eight Acts of Secure Communication
        </h2>
        <p className="text-sm sm:text-base text-ivory-300/80 leading-relaxed">
          Journey from the ancient Mauryan chancery to modern cryptographic protocols.
          Click through each act or explore sequentially.
        </p>
      </div>

      {/* Act Selection Pills */}
      <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-10 justify-start lg:justify-center">
        {acts.map(actItem => {
          const isActive = activeAct === actItem.act;
          return (
            <button
              key={actItem.act}
              onClick={() => setActiveAct(actItem.act)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center space-x-2 border ${
                isActive
                  ? 'bg-bronze-500/20 border-bronze-400 text-bronze-300 shadow-sm'
                  : 'bg-charcoal-800/60 border-charcoal-700 text-ivory-400 hover:text-ivory-100 hover:bg-charcoal-700/50'
              }`}
            >
              <span>{actItem.tag}</span>
              <span className="text-[11px] opacity-70 hidden sm:inline">· {actItem.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Act Showcase Panel */}
      {(() => {
        const current = acts.find(a => a.act === activeAct) || acts[0];
        const Icon = current.icon;
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal-900/60 border border-charcoal-700/80 rounded-2xl p-6 sm:p-10 backdrop-blur-sm shadow-archival-card">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-bronze-500/15 border border-bronze-500/40 flex items-center justify-center text-bronze-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-royal-leaf uppercase tracking-wider block font-bold">
                    {current.tag}
                  </span>
                  <span className="text-xs text-ivory-400 font-mono">{current.subtitle}</span>
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-ivory-100 leading-snug">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-ivory-300/90 leading-relaxed">
                {current.summary}
              </p>

              {/* Verified Historical Source Reference */}
              <div className="p-4 rounded-xl border-l-2 border-bronze-400 bg-charcoal-800/80 text-xs sm:text-sm text-ivory-300/90 italic space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-bronze-300 block font-bold not-italic">
                  Scholarly Attestation:
                </span>
                <p>{current.historicalRef}</p>
              </div>

              {/* Act Navigation Buttons */}
              <div className="flex items-center space-x-3 pt-2">
                {current.act > 1 && (
                  <button
                    onClick={() => setActiveAct(current.act - 1)}
                    className="px-3.5 py-2 rounded-lg border border-charcoal-700 bg-charcoal-800 text-xs font-mono text-ivory-300 hover:text-ivory-100"
                  >
                    ← Previous Act
                  </button>
                )}
                {current.act < 8 ? (
                  <button
                    onClick={() => setActiveAct(current.act + 1)}
                    className="px-4 py-2 rounded-lg bg-bronze-500/20 border border-bronze-500/40 text-xs font-mono text-bronze-300 hover:bg-bronze-500/30 flex items-center space-x-1"
                  >
                    <span>Proceed to Next Act</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onJumpToLab}
                    className="px-4 py-2 rounded-lg bg-royal-leaf text-obsidian-950 text-xs font-mono font-bold uppercase tracking-wider"
                  >
                    Enter Interactive Lab
                  </button>
                )}
              </div>
            </div>

            {/* Right Interactive/Visual Showcase Column */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-charcoal-700 bg-charcoal-950/70 p-5 shadow-inner">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-charcoal-800">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-bronze-400">
                    Live Demonstration
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-800 text-ivory-400">
                    Interactive
                  </span>
                </div>
                {current.interactive}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};
