'use client';

import React, { useState } from 'react';
import {
  CanonicalDispatchPacket,
  ClearanceLevel,
  CipherAlgorithm,
  VerificationResult,
} from '../types/dispatch';
import { caesar, vigenere, reciprocal } from '../lib/ciphers';
import {
  canonicalizePacketData,
  computeHmacSha256,
  verifyAndReceiveDispatch,
  exportPacketToJson,
  importPacketFromJson,
} from '../lib/crypto';
import {
  Send,
  ShieldCheck,
  ShieldAlert,
  Copy,
  Download,
  Upload,
  AlertTriangle,
  RotateCcw,
  Check,
  ArrowRight,
  Eye,
  Key,
  Lock,
} from 'lucide-react';

export const DispatchConsole: React.FC = () => {
  // Sender State
  const [plainText, setPlainText] = useState('Fort secure at western ramparts. Meet royal envoy at dawn.');
  const [sender, setSender] = useState('envoy_pataliputra');
  const [level, setLevel] = useState<ClearanceLevel>('secret');
  const [cipherType, setCipherType] = useState<CipherAlgorithm>('caesar');
  const [caesarShift, setCaesarShift] = useState<number>(5);
  const [vigKey, setVigKey] = useState<string>('kautilya');
  const [sealKey, setSealKey] = useState<string>('mauryan-royal-key');

  // Sealed Packet & Tamper State
  const [packet, setPacket] = useState<CanonicalDispatchPacket | null>(null);
  const [originalPacket, setOriginalPacket] = useState<CanonicalDispatchPacket | null>(null);
  const [isTampered, setIsTampered] = useState(false);
  const [tamperReason, setTamperReason] = useState<string>('');
  const [copiedJson, setCopiedJson] = useState(false);

  // Receiver State
  const [receiverClearance, setReceiverClearance] = useState<ClearanceLevel>('secret');
  const [receiveKey, setReceiveKey] = useState<string>('mauryan-royal-key');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Status feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Create Authenticated Packet
  const handleCreatePacket = async () => {
    if (!plainText.trim()) {
      showToast('Please enter a message to dispatch.');
      return;
    }
    if (!sender.trim()) {
      showToast('Please specify the sender identity.');
      return;
    }
    if (!sealKey.trim()) {
      showToast('Please provide a demonstration seal key.');
      return;
    }

    let cipherText = '';
    const params: { shift?: number; key?: string } = {};

    try {
      if (cipherType === 'caesar') {
        cipherText = caesar(plainText, caesarShift);
        params.shift = caesarShift;
      } else if (cipherType === 'vigenere') {
        cipherText = vigenere(plainText, vigKey);
        params.key = vigKey;
      } else {
        cipherText = reciprocal(plainText);
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Cipher transformation error.');
      return;
    }

    const newPacket: CanonicalDispatchPacket = {
      version: '1.0',
      from: sender.trim(),
      level,
      cipher: cipherType,
      params,
      body: cipherText,
      createdAt: new Date().toISOString(),
      seal: '',
    };

    // Canonical serialization and HMAC sealing
    const canonicalPayload = canonicalizePacketData(newPacket);
    const seal = await computeHmacSha256(canonicalPayload, sealKey);
    newPacket.seal = seal;

    setPacket(newPacket);
    setOriginalPacket(JSON.parse(JSON.stringify(newPacket)));
    setIsTampered(false);
    setTamperReason('');
    setVerificationResult(null);
    showToast('Packet sealed with HMAC-SHA-256.');
  };

  // 2. Tampering Simulations (Demonstrates all audited fields)
  const handleTamperBody = () => {
    if (!packet) return;
    const modified = { ...packet, body: packet.body + 'X' };
    setPacket(modified);
    setIsTampered(true);
    setTamperReason('Ciphertext body modified in transit (appended "X").');
    setVerificationResult(null);
    showToast('Simulated: Ciphertext body tampered.');
  };

  const handleTamperSender = () => {
    if (!packet) return;
    const modified = { ...packet, from: 'hostile_infiltrator' };
    setPacket(modified);
    setIsTampered(true);
    setTamperReason('Sender identity altered to "hostile_infiltrator".');
    setVerificationResult(null);
    showToast('Simulated: Sender identity tampered.');
  };

  const handleTamperLevel = () => {
    if (!packet) return;
    const newLevel: ClearanceLevel = packet.level === 'secret' ? 'open' : 'secret';
    const modified = { ...packet, level: newLevel };
    setPacket(modified);
    setIsTampered(true);
    setTamperReason(`Classification artificially downgraded to "${newLevel}".`);
    setVerificationResult(null);
    showToast('Simulated: Classification level tampered.');
  };

  const handleTamperParams = () => {
    if (!packet) return;
    if (packet.cipher === 'caesar') {
      const alteredShift = ((packet.params.shift || 5) + 3) % 26 || 1;
      const modified = { ...packet, params: { ...packet.params, shift: alteredShift } };
      setPacket(modified);
      setIsTampered(true);
      setTamperReason(`Caesar shift key modified to ${alteredShift}.`);
      setVerificationResult(null);
      showToast('Simulated: Cipher parameter tampered.');
    } else if (packet.cipher === 'vigenere') {
      const modified = { ...packet, params: { ...packet.params, key: 'alteredkey' } };
      setPacket(modified);
      setIsTampered(true);
      setTamperReason('Vigenère keyword altered.');
      setVerificationResult(null);
      showToast('Simulated: Vigenère key tampered.');
    }
  };

  const handleCorruptSeal = () => {
    if (!packet) return;
    const corruptedSeal = packet.seal.slice(0, -4) + '0000';
    const modified = { ...packet, seal: corruptedSeal };
    setPacket(modified);
    setIsTampered(true);
    setTamperReason('Cryptographic seal corrupted/counterfeited.');
    setVerificationResult(null);
    showToast('Simulated: Seal tag corrupted.');
  };

  const handleRestoreOriginal = () => {
    if (!originalPacket) return;
    setPacket(JSON.parse(JSON.stringify(originalPacket)));
    setIsTampered(false);
    setTamperReason('');
    setVerificationResult(null);
    showToast('Restored original untampered dispatch packet.');
  };

  // 3. Export / Copy Controls
  const handleCopyJson = async () => {
    if (!packet) return;
    try {
      await navigator.clipboard.writeText(exportPacketToJson(packet));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
      showToast('Packet JSON copied to clipboard.');
    } catch (err) {
      showToast('Clipboard access unavailable.');
    }
  };

  const handleDownloadJson = () => {
    if (!packet) return;
    const blob = new Blob([exportPacketToJson(packet)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arthasastra-dispatch-${packet.from}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Packet downloaded as JSON.');
  };

  // 4. Import / Schema Validation
  const handleImportJson = () => {
    setImportError(null);
    const { success, packet: imported, error } = importPacketFromJson(importJsonText);
    if (!success || !imported) {
      setImportError(error || 'Invalid packet schema.');
      return;
    }
    setPacket(imported);
    setOriginalPacket(JSON.parse(JSON.stringify(imported)));
    setIsTampered(false);
    setTamperReason('');
    setVerificationResult(null);
    setImportModalOpen(false);
    setImportJsonText('');
    showToast('External dispatch packet imported successfully.');
  };

  // 5. Verification & Receiving
  const handleVerifyPacket = async () => {
    if (!packet) {
      showToast('No packet available. Compose or import a packet first.');
      return;
    }

    const result = await verifyAndReceiveDispatch(packet, receiveKey, receiverClearance);
    setVerificationResult(result);

    if (result.status === 'verified_authorized') {
      showToast('Message verified and clearance authorized!');
    } else if (result.status === 'verified_denied') {
      showToast('Seal valid, but clearance denied.');
    } else {
      showToast('Verification rejected: Integrity failure.');
    }
  };

  return (
    <section id="dispatch" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-charcoal-700/60">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal-800 text-ivory-100 border border-bronze-500/50 px-4 py-2.5 rounded-xl shadow-2xl font-mono text-xs flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-royal-leaf" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-bronze-500/40 bg-bronze-500/10 text-xs font-mono text-bronze-300 uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5" />
          <span>Core Interactive Laboratory</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-ivory-100 tracking-tight">
          Secure Dispatch Console
        </h2>
        <p className="text-sm sm:text-base text-ivory-300/80 leading-relaxed">
          Compose a classified royal writ, transform it via classical substitution, authenticate it with
          an unforgeable <span className="font-mono text-royal-leaf">HMAC-SHA-256</span> seal, and test zero-trust verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= SENDER WORKBENCH ================= */}
        <div className="lg:col-span-6 bg-charcoal-900/80 border border-charcoal-700/80 rounded-2xl p-6 sm:p-7 shadow-archival-card space-y-5">
          <div className="flex items-center justify-between border-b border-charcoal-700/80 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-bronze-500/15 border border-bronze-500/30 flex items-center justify-center text-bronze-300">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-ivory-100">Sender Composition</h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-600 dark:text-ivory-400/60">
                  Lekhaka (Royal Scribe) Origin
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-charcoal-800 text-ivory-400">
              Stage 01
            </span>
          </div>

          {/* Plaintext Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold tracking-wider uppercase text-ivory-300 flex justify-between">
              <span>Message Plaintext</span>
              <span className="text-charcoal-600 dark:text-ivory-400/60 font-normal">{plainText.length}/2000 chars</span>
            </label>
            <textarea
              value={plainText}
              onChange={e => setPlainText(e.target.value)}
              rows={3}
              maxLength={2000}
              placeholder="Enter message for royal dispatch..."
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl px-3.5 py-2.5 text-sm text-ivory-100 placeholder-charcoal-600 focus:border-bronze-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Sender Identity & Classification Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold tracking-wider uppercase text-ivory-300">
                Sender Identity
              </label>
              <input
                type="text"
                value={sender}
                onChange={e => setSender(e.target.value)}
                placeholder="e.g. envoy_pataliputra"
                className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl px-3.5 py-2 text-sm font-mono text-ivory-100 focus:border-bronze-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold tracking-wider uppercase text-ivory-300">
                Classification Level
              </label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value as ClearanceLevel)}
                className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl px-3.5 py-2 text-sm font-mono text-ivory-100 focus:border-bronze-400 focus:outline-none capitalize"
              >
                <option value="open">Open (Sarvajanīya)</option>
                <option value="counsel">Counsel (Mantrin)</option>
                <option value="secret">Secret (Gūḍha)</option>
              </select>
            </div>
          </div>

          {/* Cipher Algorithm Selection & Parameters */}
          <div className="space-y-3 p-3.5 rounded-xl border border-charcoal-700 bg-charcoal-950/60">
            <label className="text-xs font-mono font-bold tracking-wider uppercase text-bronze-400 block">
              Educational Cipher Suite
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {(['caesar', 'vigenere', 'reciprocal'] as CipherAlgorithm[]).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCipherType(c)}
                  className={`py-1.5 px-2 rounded-lg border text-center uppercase tracking-wider transition-all ${
                    cipherType === c
                      ? 'bg-bronze-500/20 border-bronze-400 text-bronze-300 font-bold'
                      : 'border-charcoal-700 text-ivory-400 hover:bg-charcoal-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Cipher Parameters */}
            {cipherType === 'caesar' && (
              <div className="flex items-center space-x-3 pt-1">
                <span className="text-xs font-mono text-ivory-400 whitespace-nowrap">Shift Key: +{caesarShift}</span>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={caesarShift}
                  onChange={e => setCaesarShift(Number(e.target.value))}
                  className="w-full accent-royal-leaf"
                />
              </div>
            )}
            {cipherType === 'vigenere' && (
              <div className="pt-1">
                <input
                  type="text"
                  value={vigKey}
                  onChange={e => setVigKey(e.target.value)}
                  placeholder="Keyword (e.g. kautilya)"
                  className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg px-3 py-1.5 text-xs font-mono text-ivory-100"
                />
              </div>
            )}
            {cipherType === 'reciprocal' && (
              <p className="text-[11px] text-ivory-400/80 italic">
                Deterministic LCG seeded pair substitution (13 involutory pairs).
              </p>
            )}
          </div>

          {/* Shared Demonstration Seal Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold tracking-wider uppercase text-ivory-300 flex items-center justify-between">
              <span>Shared Seal Key (HMAC Secret)</span>
              <span className="text-[10px] text-royal-leaf font-mono">Web Crypto API</span>
            </label>
            <input
              type="text"
              value={sealKey}
              onChange={e => setSealKey(e.target.value)}
              placeholder="Demo shared secret key"
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl px-3.5 py-2 text-sm font-mono text-ivory-100 focus:border-bronze-400 focus:outline-none"
            />
            <span className="text-[11px] text-charcoal-600 dark:text-ivory-400/60 block">
              Educational demo key: Stored exclusively in local browser memory.
            </span>
          </div>

          {/* Action: Create Packet */}
          <button
            onClick={handleCreatePacket}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-bronze-400 via-bronze-500 to-bronze-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-seal transition-all flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 text-obsidian-950" />
            <span>Create Authenticated Packet</span>
          </button>
        </div>

        {/* ================= TRANSMISSION PACKET INSPECTOR ================= */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-charcoal-900/80 border border-charcoal-700/80 rounded-2xl p-6 sm:p-7 shadow-archival-card space-y-5">
            <div className="flex items-center justify-between border-b border-charcoal-700/80 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-royal-leaf/15 border border-royal-leaf/30 flex items-center justify-center text-royal-leaf">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-ivory-100">Transmission Packet</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-600 dark:text-ivory-400/60">
                    Sealed Mudrā & Canonical Envelope
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              {packet ? (
                <span
                  className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                    isTampered
                      ? 'bg-royal-crimson/15 border-royal-crimson text-royal-vermilion'
                      : 'bg-royal-leaf/15 border-royal-leaf text-royal-leaf'
                  }`}
                >
                  {isTampered ? 'TAMPERED IN TRANSIT' : 'SEAL INTACT'}
                </span>
              ) : (
                <span className="text-[11px] font-mono text-ivory-400/60">Awaiting Dispatch</span>
              )}
            </div>

            {!packet ? (
              <div className="py-12 text-center text-ivory-400/60 font-mono text-xs space-y-2">
                <div className="text-2xl">📯</div>
                <p>No dispatch currently active. Compose a message or import packet JSON.</p>
                <button
                  onClick={() => setImportModalOpen(true)}
                  className="mt-2 text-bronze-300 underline text-xs"
                >
                  Import External Packet JSON
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-mono">
                {/* Tampering Warning Alert */}
                {isTampered && (
                  <div className="p-3.5 rounded-xl border border-royal-crimson/50 bg-royal-crimson/10 text-royal-vermilion flex items-start space-x-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <strong className="block font-bold">Adversarial Interception Simulated:</strong>
                      <p className="text-[11px] text-ivory-200">{tamperReason}</p>
                    </div>
                  </div>
                )}

                {/* Packet Fields Grid */}
                <div className="grid grid-cols-2 gap-3 bg-charcoal-950 p-3.5 rounded-xl border border-charcoal-800">
                  <div>
                    <span className="text-[10px] text-charcoal-600 dark:text-ivory-400/60 uppercase block">Sender (From)</span>
                    <strong className="text-ivory-100 text-xs">{packet.from}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-charcoal-600 dark:text-ivory-400/60 uppercase block">Classification</span>
                    <strong className="text-bronze-300 text-xs uppercase">{packet.level}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-charcoal-600 dark:text-ivory-400/60 uppercase block">Cipher & Params</span>
                    <strong className="text-ivory-200 text-xs">
                      {packet.cipher.toUpperCase()} {packet.params.shift ? `(+${packet.params.shift})` : ''}
                      {packet.params.key ? `[${packet.params.key}]` : ''}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-charcoal-600 dark:text-ivory-400/60 uppercase block">Created Timestamp</span>
                    <span className="text-ivory-400 text-[10px]">{new Date(packet.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Ciphertext Body */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-ivory-400">
                    Encrypted Payload (Ciphertext)
                  </span>
                  <div className="p-3 rounded-lg bg-charcoal-950 border border-charcoal-800 text-ivory-200 break-all select-all">
                    {packet.body}
                  </div>
                </div>

                {/* HMAC Authentication Tag */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-royal-leaf flex items-center justify-between">
                    <span>HMAC-SHA-256 Authentication Seal Tag</span>
                    <span className="text-[10px] text-charcoal-600 dark:text-ivory-400/60">256-bit Hex</span>
                  </span>
                  <div className="p-3 rounded-lg bg-charcoal-950 border border-royal-leaf/30 text-royal-leaf text-[11px] break-all select-all">
                    {packet.seal}
                  </div>
                </div>

                {/* Canonical Data Inspector */}
                <div className="p-3 rounded-lg bg-charcoal-950/80 border border-charcoal-800 text-[10px] text-ivory-400 space-y-1">
                  <span className="text-bronze-300 font-bold block uppercase">
                    Audited Canonical Payload (Covered by Seal):
                  </span>
                  <pre className="overflow-x-auto text-charcoal-600 dark:text-ivory-400/60 whitespace-pre-wrap">
                    {canonicalizePacketData(packet)}
                  </pre>
                </div>

                {/* Packet Export & Transfer Controls */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 rounded-lg border border-charcoal-700 bg-charcoal-800 hover:bg-charcoal-700 text-ivory-200 text-xs flex items-center space-x-1.5"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-royal-leaf" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    className="px-3 py-1.5 rounded-lg border border-charcoal-700 bg-charcoal-800 hover:bg-charcoal-700 text-ivory-200 text-xs flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON</span>
                  </button>
                  <button
                    onClick={() => setImportModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg border border-charcoal-700 bg-charcoal-800 hover:bg-charcoal-700 text-ivory-200 text-xs flex items-center space-x-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import JSON</span>
                  </button>
                </div>

                {/* Tampering Simulator Drawer */}
                <div className="pt-2 border-t border-charcoal-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-bronze-400 uppercase tracking-wider flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3 text-royal-amber" />
                      <span>Tampering Simulation Lab</span>
                    </span>
                    {isTampered && (
                      <button
                        onClick={handleRestoreOriginal}
                        className="text-[10px] text-royal-leaf hover:underline flex items-center space-x-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restore Original</span>
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
                    <button
                      onClick={handleTamperBody}
                      className="p-1.5 rounded bg-charcoal-950 border border-charcoal-800 hover:border-royal-crimson text-ivory-300"
                    >
                      Alter Body
                    </button>
                    <button
                      onClick={handleTamperSender}
                      className="p-1.5 rounded bg-charcoal-950 border border-charcoal-800 hover:border-royal-crimson text-ivory-300"
                    >
                      Alter Sender
                    </button>
                    <button
                      onClick={handleTamperLevel}
                      className="p-1.5 rounded bg-charcoal-950 border border-charcoal-800 hover:border-royal-crimson text-ivory-300"
                    >
                      Alter Level
                    </button>
                    <button
                      onClick={handleTamperParams}
                      className="p-1.5 rounded bg-charcoal-950 border border-charcoal-800 hover:border-royal-crimson text-ivory-300"
                    >
                      Alter Shift/Key
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= RECEIVER VERIFICATION PANEL ================= */}
          <div className="bg-charcoal-900/80 border border-charcoal-700/80 rounded-2xl p-6 sm:p-7 shadow-archival-card space-y-5">
            <div className="flex items-center justify-between border-b border-charcoal-700/80 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-bronze-500/15 border border-bronze-500/30 flex items-center justify-center text-bronze-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-ivory-100">Receiver Verification</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-600 dark:text-ivory-400/60">
                    Senāpati Citadel Destination
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-charcoal-800 text-ivory-400">
                Stage 02
              </span>
            </div>

            {/* Receiver Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold tracking-wider uppercase text-ivory-300">
                  Receiver Clearance
                </label>
                <select
                  value={receiverClearance}
                  onChange={e => setReceiverClearance(e.target.value as ClearanceLevel)}
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl px-3.5 py-2 text-sm font-mono text-ivory-100 focus:border-bronze-400 focus:outline-none capitalize"
                >
                  <option value="open">Open (Sarvajanīya)</option>
                  <option value="counsel">Counsel (Mantrin)</option>
                  <option value="secret">Secret (Gūḍha)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold tracking-wider uppercase text-ivory-300">
                  Verification Seal Key
                </label>
                <input
                  type="text"
                  value={receiveKey}
                  onChange={e => setReceiveKey(e.target.value)}
                  placeholder="Receiver key"
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl px-3.5 py-2 text-sm font-mono text-ivory-100 focus:border-bronze-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Action: Verify & Receive */}
            <button
              onClick={handleVerifyPacket}
              disabled={!packet}
              className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                packet
                  ? 'bg-royal-leaf hover:bg-emerald-400 text-obsidian-950 shadow-seal'
                  : 'bg-charcoal-800 text-ivory-400/40 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Verify Seal & Receive Message</span>
            </button>

            {/* Verification Result Output Card */}
            {verificationResult && (
              <div
                className={`p-4 rounded-xl border font-mono text-xs space-y-3 ${
                  verificationResult.status === 'verified_authorized'
                    ? 'border-royal-leaf/50 bg-royal-leaf/10 text-ivory-100'
                    : verificationResult.status === 'verified_denied'
                    ? 'border-royal-amber/50 bg-royal-amber/10 text-ivory-100'
                    : 'border-royal-crimson/50 bg-royal-crimson/10 text-ivory-100'
                }`}
              >
                <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-2">
                  <strong className="text-sm font-editorial">
                    {verificationResult.status === 'verified_authorized' && '✓ Dispatch Accepted & Decrypted'}
                    {verificationResult.status === 'verified_denied' && '⚠ Access Denied (Clearance Insufficient)'}
                    {verificationResult.status === 'integrity_failed' && '✕ Dispatch Rejected (Integrity Failed)'}
                  </strong>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-950 text-ivory-300 uppercase">
                    {verificationResult.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Audit Feedback Reasons */}
                <ul className="space-y-1 text-[11px] text-ivory-300 list-disc pl-4">
                  {verificationResult.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                {/* Decrypted Plaintext (Released ONLY on Authorized Verification) */}
                {verificationResult.decryptedText ? (
                  <div className="p-3 rounded-lg bg-charcoal-950 border border-royal-leaf/40 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-royal-leaf block">
                      Decrypted Plaintext Mandate Released:
                    </span>
                    <p className="text-ivory-100 text-sm font-sans font-medium">
                      {verificationResult.decryptedText}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-charcoal-950/80 border border-charcoal-800 text-[11px] text-royal-vermilion italic">
                    Plaintext withheld in accordance with Kauṭilyan statecraft zero-trust mandate.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* JSON Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm">
          <div className="bg-charcoal-900 border border-charcoal-700 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-editorial text-lg font-bold text-ivory-100">Import Dispatch Packet JSON</h3>
            <p className="text-xs text-ivory-400 font-mono">
              Paste a canonical JSON packet exported from another terminal or session.
            </p>
            <textarea
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              rows={8}
              placeholder="Paste JSON packet here..."
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl p-3 font-mono text-xs text-ivory-200 focus:outline-none focus:border-bronze-400"
            />
            {importError && (
              <p className="text-xs font-mono text-royal-vermilion">{importError}</p>
            )}
            <div className="flex justify-end space-x-2 font-mono text-xs">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-charcoal-700 text-ivory-400 hover:text-ivory-100"
              >
                Cancel
              </button>
              <button
                onClick={handleImportJson}
                className="px-4 py-2 rounded-lg bg-bronze-500 hover:bg-bronze-400 text-obsidian-950 font-bold"
              >
                Validate & Import
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
