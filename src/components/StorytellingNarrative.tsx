'use client';

import React, { useState } from 'react';
import { Scroll, ShieldAlert, Key, Route, CheckCircle2, FlaskConical, GraduationCap, ChevronRight, Lock, Eye, Sparkles } from 'lucide-react';

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
      subtitle: 'Arthaśāstra Book II (Śāsanādhikāra): Sovereign Decrees',
      icon: Scroll,
      summary:
        'In the political realism of Kauṭilya, governance depends upon the fidelity of communication. Writs (śāsana) were drafted by vetted scribes (lekhaka), sealed with royal insignia (mudrā), and entrusted to envoys whose loyalty was subject to unyielding scrutiny.',
      historicalRef:
        '“The King’s decree is the soul of governance. He who corrupts a royal writ, alters its seal, or falsely presents a counterfeit mandate suffers the highest penalty.” — Arthaśāstra II.10',
      interactive: (
        <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-theme-bronze border-b border-theme-border pb-2">
            <span className="font-bold">COUNCIL OF MINISTERS (Mantripariṣad)</span>
            <span className="text-[10px] bg-theme-bronze/15 px-2 py-0.5 rounded font-semibold">PATALIPUTRA CHANCELLERY</span>
          </div>
          <p className="text-theme-secondary leading-relaxed">
            The scribes of the Mauryan chancellery utilized distinctive inks, unique scripts, and clay or wax mudrās 
            to deter interception and forgeries across the imperial janapadas.
          </p>
        </div>
      ),
    },
    {
      act: 2,
      tag: 'ACT II',
      title: 'The Principle of Secrecy: Intelligence Architecture',
      subtitle: 'Arthaśāstra Book I (Ch 11–12) & Book V (Ch 3): Covert Conduct',
      icon: Eye,
      summary:
        'Kauṭilya structured the state around institutionalized vigilance. Covert operatives (Gūḍhapuruṣa) operated under cover identities, transmitting intelligence back to the center via coded tokens, concealed glyphs, and secret writing (Gūḍhalekha).',
      historicalRef:
        '“Spies shall communicate through secret writings (gūḍhalekha) and prearranged signals, ensuring that even if one operative is compromised, the broader network remains impenetrable.” — Arthaśāstra I.12',
      interactive: (
        <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-2.5 text-xs font-mono">
          <span className="text-theme-bronze font-bold block uppercase tracking-wider text-[11px]">
            Institutional Covert Network (Gūḍhapuruṣa)
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-theme-surface border border-theme-border">
              <strong className="text-theme-primary block">Samsthāḥ (Stationary)</strong>
              <span className="text-theme-muted text-[10px]">Monks, merchants, ascetics embedded locally</span>
            </div>
            <div className="p-2 rounded bg-theme-surface border border-theme-border">
              <strong className="text-theme-primary block">Sañcārāḥ (Roving)</strong>
              <span className="text-theme-muted text-[10px]">Envoys, scouts, couriers across frontiers</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      act: 3,
      tag: 'ACT III',
      title: 'The Scribe and the Message: Clearance Tiers',
      subtitle: 'Composing classified dispatches under administrative rank',
      icon: Lock,
      summary:
        'A classified dispatch was addressed to specific administrative tiers. The contents were guarded so that uncertified couriers or intermediate inspectors could not read the mandate without authorization.',
      historicalRef:
        '“Envoys are classified into three ranks: the Plenipotentiary (Nisṛṣṭārtha), the Envoy with a limited mission (Parimitārtha), and the Carrier of Royal Letters (Śāsanahara).” — Arthaśāstra I.16',
      interactive: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="p-3 rounded-lg border border-theme-border bg-theme-surface space-y-1">
            <span className="text-theme-primary font-bold block">OPEN (Sarvajanīya)</span>
            <span className="text-theme-muted text-[11px] block">Public decrees, tax quotas, transit passes</span>
          </div>
          <div className="p-3 rounded-lg border border-theme-border-strong bg-theme-bronze/10 space-y-1">
            <span className="text-theme-bronze font-bold block">COUNSEL (Mantrin)</span>
            <span className="text-theme-muted text-[11px] block">Provincial governance, logistical orders</span>
          </div>
          <div className="p-3 rounded-lg border border-theme-seal/40 bg-theme-seal-bg space-y-1">
            <span className="text-theme-seal font-bold block">SECRET (Gūḍha)</span>
            <span className="text-theme-muted text-[11px] block">Troop maneuvers, covert intelligence briefs</span>
          </div>
        </div>
      ),
    },
    {
      act: 4,
      tag: 'ACT IV',
      title: 'The Transformation: Classical Educational Ciphers',
      subtitle: 'Visual obfuscation vs mathematical confidentiality',
      icon: Key,
      summary:
        'To demonstrate historical ideas of secret writing (Gūḍhalekha), our laboratory incorporates classical ciphers: the Caesar shift, the polyalphabetic Vigenère tableau, and reciprocal pair substitutions. We emphasize that classical ciphers are educational models vulnerable to frequency analysis.',
      historicalRef:
        '“Transformation alters the appearance of the message; but without unforgeable verification, appearance offers no defense.” — Educational Principle',
      interactive: (
        <div className="p-4 rounded-xl border border-theme-border bg-theme-inset space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-theme-primary font-bold">Interactive Shift Visualizer:</span>
            <div className="flex items-center space-x-2">
              <span className="text-theme-bronze">Shift: +{demoShift}</span>
              <input
                type="range"
                min="1"
                max="25"
                value={demoShift}
                onChange={e => setDemoShift(Number(e.target.value))}
                className="w-24 accent-theme-seal"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded bg-theme-surface border border-theme-border">
              <span className="text-theme-muted block text-[10px] mb-1 uppercase font-bold">PLAINTEXT</span>
              <span className="text-theme-primary">{demoTransformText}</span>
            </div>
            <div className="p-2.5 rounded bg-theme-surface border border-theme-border-strong">
              <span className="text-theme-bronze block text-[10px] mb-1 uppercase font-bold">CIPHERTEXT (CAESAR +{demoShift})</span>
              <span className="text-theme-seal font-bold break-all">{caesarShiftDemo(demoTransformText, demoShift)}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      act: 5,
      tag: 'ACT V',
      title: 'The Seal (Mudrā): Cryptographic HMAC-SHA-256',
      subtitle: 'Binding message parameters to an unforgeable authentication tag',
      icon: ShieldAlert,
      summary:
        'An encrypted message without integrity verification invites catastrophe. In modern cryptography, a Hash-based Message Authentication Code (HMAC-SHA-256) takes a secret key and the canonical representation of the dispatch, generating a 256-bit authentication tag.',
      historicalRef:
        '“No traveler or goods shall pass through the toll-gate without the imprint of the royal seal (mudrā-adhyakṣa).” — Arthaśāstra II.34',
      interactive: (
        <div className="p-4 rounded-xl border border-theme-seal-border bg-theme-seal-bg space-y-2 text-xs font-mono">
          <span className="text-theme-seal font-bold block uppercase tracking-wider">
            Canonical Protocol Binding
          </span>
          <p className="text-theme-secondary leading-relaxed text-[11px]">
            Unlike naive implementations, our engine deterministically serializes every interpretative field:
            <br />
            <code className="text-theme-bronze bg-theme-surface px-1.5 py-0.5 rounded mt-1 inline-block border border-theme-border">
              {JSON.stringify({ version: "1.0", from: "envoy", level: "secret", cipher: "caesar", params: { shift: 5 }, body: "..." })}
            </code>
          </p>
          <span className="text-[10px] text-theme-muted block">
            Altering any single parameter (even the cipher shift) invalidates the HMAC seal immediately.
          </span>
        </div>
      ),
    },
    {
      act: 6,
      tag: 'ACT VI',
      title: 'The Journey: Movement Across Courier Relays',
      subtitle: 'The perils of channel interception, tampering, and forged mandates',
      icon: Route,
      summary:
        'The royal courier traverses frontier passes, resting at courier relay stations (Dūtānudūta). In transit, adversaries may attempt to alter the classification, falsify the sender identity, or tamper with the payload.',
      historicalRef:
        '“The king must establish relay posts separated by appropriate distances, ensuring messages arrive with uncorrupted speed.” — Arthaśāstra II.1',
      interactive: (
        <div className="relative py-4 px-2 space-y-2 font-mono">
          <div className="h-1 bg-theme-border rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-theme-seal via-theme-bronze to-theme-seal animate-pulse w-full" />
          </div>
          <div className="flex justify-between items-center text-[10px] text-theme-muted">
            <span className="text-theme-primary font-bold">PATALIPUTRA (Origin)</span>
            <span className="text-theme-bronze">RELAY OUTPOST 03</span>
            <span className="text-theme-primary font-bold">CITADEL (Destination)</span>
          </div>
        </div>
      ),
    },
    {
      act: 7,
      tag: 'ACT VII',
      title: 'The Receiver: Zero-Trust Clearance Enforcement',
      subtitle: 'Integrity verified first, clearance verified second, release granted last',
      icon: CheckCircle2,
      summary:
        'Upon receiving the dispatch packet, the recipient operates under strict zero-trust protocol: 1) Recompute the HMAC using the shared key over canonical data. If the tag differs, reject outright. 2) Check if the receiver’s clearance level meets the dispatch classification. 3) Only if both checks pass is plaintext released.',
      historicalRef:
        '“He who reads a sealed dispatch without authorization, or delivers it to an uncertified recipient, shall be degraded in office.” — Arthaśāstra II.10',
      interactive: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg border border-theme-seal-border bg-theme-seal-bg space-y-1">
            <span className="text-theme-seal font-bold flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ACCEPTANCE RULE</span>
            </span>
            <span className="text-theme-secondary text-[11px] block">
              Seal matches perfectly AND Receiver Clearance &gt;= Packet Level. Plaintext released.
            </span>
          </div>
          <div className="p-3 rounded-lg border border-theme-vermilion-border bg-theme-vermilion-bg space-y-1">
            <span className="text-theme-vermilion font-bold flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>REJECTION RULE</span>
            </span>
            <span className="text-theme-secondary text-[11px] block">
              Mismatched seal (tampering detected) OR Insufficient clearance. Plaintext withheld.
            </span>
          </div>
        </div>
      ),
    },
    {
      act: 8,
      tag: 'ACT VIII',
      title: 'The Laboratory: Interactive Cryptographic Exploration',
      subtitle: 'Hands-on experimentation with live cryptographic primitives',
      icon: FlaskConical,
      summary:
        'The historical narrative culminates in a live, functional laboratory. Compose your own dispatches, simulate packet tampering, export and import portable JSON packets, inspect 26-letter frequency histograms, and run the 20-case test suite.',
      historicalRef:
        '“Experimentation and systematic observation are the prerequisites of statecraft.” — Kauṭilya',
      interactive: (
        <div className="text-center py-2">
          <button
            onClick={onJumpToLab}
            className="px-5 py-2.5 rounded-xl bg-theme-bronze text-theme-canvas font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-sm transition-all"
          >
            Launch Interactive Laboratory Below ↓
          </button>
        </div>
      ),
    },
    {
      act: 9,
      tag: 'ACT IX',
      title: 'The Reflection: Trust Through Verification',
      subtitle: 'Jñānam eva Balam — Knowledge as the foundation of security',
      icon: GraduationCap,
      summary:
        'The overarching teaching of both the Arthaśāstra and modern computer science is that trust cannot be assumed—it must be cryptographically proven. Obfuscation is not protection. Security requires verified authenticity, cryptographic integrity, and disciplined access control.',
      historicalRef:
        '“As the unbaked clay vessel dissolves when immersed in water, so does a kingdom perish whose intelligence is without verification.” — Arthaśāstra I.15',
      interactive: (
        <div className="p-3.5 rounded-xl border border-theme-border-strong bg-theme-surface text-xs text-theme-primary italic text-center font-serif">
          “Communication without verification is deception; statecraft without vigilance is ruin.”
        </div>
      ),
    },
  ];

  return (
    <section id="narrative" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-theme-border">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-theme-bronze font-bold">
          Scroll-Driven Archival Exhibition
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-theme-primary tracking-tight">
          The Nine Acts of Secure Communication
        </h2>
        <p className="text-sm sm:text-base text-theme-secondary leading-relaxed font-sans">
          Journey from the ancient Mauryan chancery to modern cryptographic protocols.
          Explore the institutional doctrine of trusted dispatches.
        </p>
      </div>

      {/* Act Selection Navigation Pills */}
      <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-10 justify-start lg:justify-center">
        {acts.map(actItem => {
          const isActive = activeAct === actItem.act;
          return (
            <button
              key={actItem.act}
              onClick={() => setActiveAct(actItem.act)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center space-x-2 border ${
                isActive
                  ? 'bg-theme-bronze/15 border-theme-border-strong text-theme-bronze font-bold shadow-sm'
                  : 'bg-theme-surface border-theme-border text-theme-secondary hover:text-theme-primary hover:bg-theme-subtle'
              }`}
            >
              <span>{actItem.tag}</span>
              <span className="text-[11px] opacity-75 hidden sm:inline">· {actItem.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Act Showcase Panel */}
      {(() => {
        const current = acts.find(a => a.act === activeAct) || acts[0];
        const Icon = current.icon;
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-10 shadow-card transition-colors duration-200">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-theme-bronze/15 border border-theme-border-strong flex items-center justify-center text-theme-bronze">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-theme-seal uppercase tracking-wider block font-bold">
                    {current.tag}
                  </span>
                  <span className="text-xs text-theme-muted font-mono">{current.subtitle}</span>
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-theme-primary leading-snug">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-theme-secondary leading-relaxed font-sans">
                {current.summary}
              </p>

              {/* Verified Historical Source Reference */}
              <div className="p-4 rounded-xl border-l-2 border-theme-bronze bg-theme-inset text-xs sm:text-sm text-theme-primary italic space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-theme-bronze block font-bold not-italic">
                  Scholarly Attestation:
                </span>
                <p className="font-serif">{current.historicalRef}</p>
              </div>

              {/* Act Navigation Buttons */}
              <div className="flex items-center space-x-3 pt-2 font-mono text-xs">
                {current.act > 1 && (
                  <button
                    onClick={() => setActiveAct(current.act - 1)}
                    className="px-3.5 py-2 rounded-lg border border-theme-border bg-theme-surface text-theme-secondary hover:text-theme-primary hover:bg-theme-subtle"
                  >
                    ← Previous Act
                  </button>
                )}
                {current.act < 9 ? (
                  <button
                    onClick={() => setActiveAct(current.act + 1)}
                    className="px-4 py-2 rounded-lg bg-theme-bronze/15 border border-theme-border-strong text-theme-bronze hover:bg-theme-bronze/25 flex items-center space-x-1 font-bold"
                  >
                    <span>Proceed to Next Act</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onJumpToLab}
                    className="px-4 py-2 rounded-lg bg-theme-seal text-theme-canvas font-bold uppercase tracking-wider"
                  >
                    Enter Interactive Lab
                  </button>
                )}
              </div>
            </div>

            {/* Right Interactive/Visual Showcase Column */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-theme-border bg-theme-inset p-5 shadow-inner">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-theme-border">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-theme-bronze font-bold">
                    Archival Demonstration
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-surface border border-theme-border text-theme-secondary">
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
