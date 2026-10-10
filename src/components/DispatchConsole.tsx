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

  // Feedback Toast
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

    // Canonical serialization & HMAC sealing
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

  // 2. Tampering Simulations
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
    setTamperReason(`Classification downgraded to "${newLevel}".`);
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
      setTamperReason(`Caesar shift key modified to +${alteredShift}.`);
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

  // 3. Export / Download
  const handleCopyJson = async () => {
    if (!packet) return;
    try {
      await navigator.clipboard.writeText(exportPacketToJson(packet));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
      showToast('Packet JSON copied to clipboard.');
    } catch {
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

  // 4. Import / Validation
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
    <section id="dispatch" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-theme-border">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-theme-surface text-theme-primary border border-theme-border-strong px-4 py-2.5 rounded-xl shadow-2xl font-mono text-xs flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-theme-seal" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-theme-border-strong bg-theme-bronze/10 text-xs font-mono text-theme-bronze uppercase tracking-widest font-bold">
          <Lock className="w-3.5 h-3.5" />
          <span>Core Interactive Laboratory</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-theme-primary tracking-tight">
          Secure Dispatch Console
        </h2>
        <p className="text-sm sm:text-base text-theme-secondary leading-relaxed font-sans">
          Compose a classified royal writ, transform it via classical substitution, authenticate it with
          an unforgeable <span className="font-mono text-theme-seal font-bold">HMAC-SHA-256</span> seal, and test zero-trust verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= SENDER WORKBENCH ================= */}
        <div className="lg:col-span-6 bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-7 shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-theme-border pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-theme-bronze/15 border border-theme-border-strong flex items-center justify-center text-theme-bronze">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-theme-primary">Sender Composition</h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted font-bold">
                  Lekhaka (Royal Scribe) Origin
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-theme-inset border border-theme-border text-theme-secondary font-semibold">
              Stage 01
            </span>
          </div>

          {/* Plaintext Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold tracking-wider uppercase text-theme-secondary flex justify-between">
              <span>Message Plaintext</span>
              <span className="text-theme-muted font-normal">{plainText.length}/2000 chars</span>
            </label>
            <textarea
              value={plainText}
              onChange={e => setPlainText(e.target.value)}
              rows={3}
              maxLength={2000}
              placeholder="Enter message for royal dispatch..."
              className="w-full bg-theme-inset border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-sans text-theme-primary placeholder-theme-muted focus:border-theme-bronze focus:outline-none transition-colors"
            />
          </div>

          {/* Sender Identity & Classification Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold tracking-wider uppercase text-theme-secondary">
                Sender Identity
              </label>
              <input
                type="text"
                value={sender}
                onChange={e => setSender(e.target.value)}
                placeholder="e.g. envoy_pataliputra"
                className="w-full bg-theme-inset border border-theme-border rounded-xl px-3.5 py-2 text-sm font-mono text-theme-primary focus:border-theme-bronze focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold tracking-wider uppercase text-theme-secondary">
                Classification Level
              </label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value as ClearanceLevel)}
                className="w-full bg-theme-inset border border-theme-border rounded-xl px-3.5 py-2 text-sm font-mono text-theme-primary focus:border-theme-bronze focus:outline-none capitalize"
              >
                <option value="open">Open (Sarvajanīya)</option>
                <option value="counsel">Counsel (Mantrin)</option>
                <option value="secret">Secret (Gūḍha)</option>
              </select>
            </div>
          </div>

          {/* Cipher Algorithm Selection & Parameters */}
          <div className="space-y-3 p-3.5 rounded-xl border border-theme-border bg-theme-inset">
            <label className="text-xs font-mono font-bold tracking-wider uppercase text-theme-bronze block">
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
                      ? 'bg-theme-bronze/15 border-theme-border-strong text-theme-bronze font-bold shadow-sm'
                      : 'border-theme-border text-theme-secondary hover:bg-theme-surface'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Cipher Parameters */}
            {cipherType === 'caesar' && (
              <div className="flex items-center space-x-3 pt-1">
                <span className="text-xs font-mono text-theme-secondary whitespace-nowrap font-bold">Shift: +{caesarShift}</span>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={caesarShift}
                  onChange={e => setCaesarShift(Number(e.target.value))}
                  className="w-full accent-theme-seal"
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
                  className="w-full bg-theme-surface border border-theme-border rounded-lg px-3 py-1.5 text-xs font-mono text-theme-primary"
                />
              </div>
            )}
            {cipherType === 'reciprocal' && (
              <p className="text-[11px] text-theme-muted italic">
                Deterministic LCG seeded pair substitution (13 involutory pairs).
              </p>
            )}
          </div>

          {/* Shared Demonstration Seal Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold tracking-wider uppercase text-theme-secondary flex items-center justify-between">
              <span>Shared Seal Key (HMAC Secret)</span>
              <span className="text-[10px] text-theme-seal font-mono font-bold">Web Crypto API</span>
            </label>
            <input
              type="text"
              value={sealKey}
              onChange={e => setSealKey(e.target.value)}
              placeholder="Demo shared secret key"
              className="w-full bg-theme-inset border border-theme-border rounded-xl px-3.5 py-2 text-sm font-mono text-theme-primary focus:border-theme-bronze focus:outline-none"
            />
            <span className="text-[11px] text-theme-muted block">
              Educational demo key: Stored exclusively in local browser memory.
            </span>
          </div>

          {/* Action: Create Packet */}
          <button
            onClick={handleCreatePacket}
            className="w-full py-3 rounded-xl bg-theme-bronze text-theme-canvas font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Create Authenticated Packet</span>
          </button>
        </div>

        {/* ================= TRANSMISSION PACKET INSPECTOR ================= */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-center justify-between border-b border-theme-border pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-theme-seal-bg border border-theme-seal-border flex items-center justify-center text-theme-seal">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-theme-primary">Transmission Packet</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted font-bold">
                    Sealed Mudrā & Canonical Envelope
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              {packet ? (
                <span
                  className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                    isTampered
                      ? 'bg-theme-vermilion-bg border-theme-vermilion-border text-theme-vermilion'
                      : 'bg-theme-seal-bg border-theme-seal-border text-theme-seal'
                  }`}
                >
                  {isTampered ? 'TAMPERED IN TRANSIT' : 'SEAL INTACT'}
                </span>
              ) : (
                <span className="text-[11px] font-mono text-theme-muted">Awaiting Dispatch</span>
              )}
            </div>

            {!packet ? (
              <div className="py-12 text-center text-theme-muted font-mono text-xs space-y-2">
                <div className="text-2xl">📯</div>
                <p>No dispatch currently active. Compose a message or import packet JSON.</p>
                <button
                  onClick={() => setImportModalOpen(true)}
                  className="mt-2 text-theme-bronze underline text-xs font-semibold"
                >
                  Import External Packet JSON
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-mono">
                {/* Tampering Warning Alert */}
                {isTampered && (
                  <div className="p-3.5 rounded-xl border border-theme-vermilion-border bg-theme-vermilion-bg text-theme-vermilion flex items-start space-x-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <strong className="block font-bold">Adversarial Interception Simulated:</strong>
                      <p className="text-[11px] text-theme-primary font-sans">{tamperReason}</p>
                    </div>
                  </div>
                )}

                {/* Packet Fields Grid */}
                <div className="grid grid-cols-2 gap-3 bg-theme-inset p-3.5 rounded-xl border border-theme-border">
                  <div>
                    <span className="text-[10px] text-theme-muted uppercase block font-semibold">Sender (From)</span>
                    <strong className="text-theme-primary text-xs">{packet.from}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-theme-muted uppercase block font-semibold">Classification</span>
                    <strong className="text-theme-bronze text-xs uppercase">{packet.level}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-theme-muted uppercase block font-semibold">Cipher & Params</span>
                    <strong className="text-theme-primary text-xs">
                      {packet.cipher.toUpperCase()} {packet.params.shift ? `(+${packet.params.shift})` : ''}
                      {packet.params.key ? `[${packet.params.key}]` : ''}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-theme-muted uppercase block font-semibold">Created Timestamp</span>
                    <span className="text-theme-secondary text-[10px]">{new Date(packet.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Ciphertext Body */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-theme-secondary">
                    Encrypted Payload (Ciphertext)
                  </span>
                  <div className="p-3 rounded-lg bg-theme-inset border border-theme-border text-theme-primary break-all select-all">
                    {packet.body}
                  </div>
                </div>

                {/* HMAC Authentication Tag */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-theme-seal flex items-center justify-between">
                    <span>HMAC-SHA-256 Authentication Seal Tag</span>
                    <span className="text-[10px] text-theme-muted font-normal">256-bit Hex</span>
                  </span>
                  <div className="p-3 rounded-lg bg-theme-inset border border-theme-seal-border text-theme-seal text-[11px] break-all select-all font-bold">
                    {packet.seal}
                  </div>
                </div>

                {/* Canonical Data Inspector */}
                <div className="p-3 rounded-lg bg-theme-inset border border-theme-border text-[10px] text-theme-muted space-y-1">
                  <span className="text-theme-bronze font-bold block uppercase">
                    Audited Canonical Payload (Covered by Seal):
                  </span>
                  <pre className="overflow-x-auto text-theme-secondary whitespace-pre-wrap">
                    {canonicalizePacketData(packet)}
                  </pre>
                </div>

                {/* Packet Export & Transfer Controls */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-subtle text-theme-primary text-xs flex items-center space-x-1.5 shadow-sm"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-theme-seal" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    className="px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-subtle text-theme-primary text-xs flex items-center space-x-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON</span>
                  </button>
                  <button
                    onClick={() => setImportModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg border border-theme-border bg-theme-surface hover:bg-theme-subtle text-theme-primary text-xs flex items-center space-x-1.5 shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import JSON</span>
                  </button>
                </div>

                {/* Tampering Simulator Drawer */}
                <div className="pt-2 border-t border-theme-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-theme-bronze uppercase tracking-wider flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3 text-theme-amber" />
                      <span>Tampering Simulation Lab</span>
                    </span>
                    {isTampered && (
                      <button
                        onClick={handleRestoreOriginal}
                        className="text-[10px] text-theme-seal hover:underline flex items-center space-x-1 font-bold"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restore Original</span>
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
                    <button
                      onClick={handleTamperBody}
                      className="p-1.5 rounded bg-theme-inset border border-theme-border hover:border-theme-vermilion text-theme-secondary hover:text-theme-primary font-semibold"
                    >
                      Alter Body
                    </button>
                    <button
                      onClick={handleTamperSender}
                      className="p-1.5 rounded bg-theme-inset border border-theme-border hover:border-theme-vermilion text-theme-secondary hover:text-theme-primary font-semibold"
                    >
                      Alter Sender
                    </button>
                    <button
                      onClick={handleTamperLevel}
                      className="p-1.5 rounded bg-theme-inset border border-theme-border hover:border-theme-vermilion text-theme-secondary hover:text-theme-primary font-semibold"
                    >
                      Alter Level
                    </button>
                    <button
                      onClick={handleTamperParams}
                      className="p-1.5 rounded bg-theme-inset border border-theme-border hover:border-theme-vermilion text-theme-secondary hover:text-theme-primary font-semibold"
                    >
                      Alter Shift/Key
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= RECEIVER VERIFICATION PANEL ================= */}
          <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-center justify-between border-b border-theme-border pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-theme-bronze/15 border border-theme-border-strong flex items-center justify-center text-theme-bronze">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-theme-primary">Receiver Verification</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted font-bold">
                    Senāpati Citadel Destination
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-theme-inset border border-theme-border text-theme-secondary font-semibold">
                Stage 02
              </span>
            </div>

            {/* Receiver Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold tracking-wider uppercase text-theme-secondary">
                  Receiver Clearance
                </label>
                <select
                  value={receiverClearance}
                  onChange={e => setReceiverClearance(e.target.value as ClearanceLevel)}
                  className="w-full bg-theme-inset border border-theme-border rounded-xl px-3.5 py-2 text-sm font-mono text-theme-primary focus:border-theme-bronze focus:outline-none capitalize"
                >
                  <option value="open">Open (Sarvajanīya)</option>
                  <option value="counsel">Counsel (Mantrin)</option>
                  <option value="secret">Secret (Gūḍha)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold tracking-wider uppercase text-theme-secondary">
                  Verification Seal Key
                </label>
                <input
                  type="text"
                  value={receiveKey}
                  onChange={e => setReceiveKey(e.target.value)}
                  placeholder="Receiver key"
                  className="w-full bg-theme-inset border border-theme-border rounded-xl px-3.5 py-2 text-sm font-mono text-theme-primary focus:border-theme-bronze focus:outline-none"
                />
              </div>
            </div>

            {/* Action: Verify & Receive */}
            <button
              onClick={handleVerifyPacket}
              disabled={!packet}
              className={`w-full py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                packet
                  ? 'bg-theme-seal text-theme-canvas hover:opacity-90 shadow-seal'
                  : 'bg-theme-subtle text-theme-muted cursor-not-allowed border border-theme-border'
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
                    ? 'border-theme-seal-border bg-theme-seal-bg text-theme-primary'
                    : verificationResult.status === 'verified_denied'
                    ? 'border-theme-border-strong bg-theme-bronze/10 text-theme-primary'
                    : 'border-theme-vermilion-border bg-theme-vermilion-bg text-theme-primary'
                }`}
              >
                <div className="flex items-center justify-between border-b border-theme-border pb-2">
                  <strong className="text-sm font-editorial">
                    {verificationResult.status === 'verified_authorized' && '✓ Dispatch Accepted & Decrypted'}
                    {verificationResult.status === 'verified_denied' && '⚠ Access Denied (Clearance Insufficient)'}
                    {verificationResult.status === 'integrity_failed' && '✕ Dispatch Rejected (Integrity Failed)'}
                  </strong>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-theme-surface border border-theme-border text-theme-primary uppercase font-bold">
                    {verificationResult.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Audit Feedback Reasons */}
                <ul className="space-y-1 text-[11px] text-theme-secondary list-disc pl-4 font-sans">
                  {verificationResult.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                {/* Decrypted Plaintext */}
                {verificationResult.decryptedText ? (
                  <div className="p-3 rounded-lg bg-theme-surface border border-theme-seal-border space-y-1">
                    <span className="text-[10px] uppercase font-bold text-theme-seal block">
                      Decrypted Plaintext Mandate Released:
                    </span>
                    <p className="text-theme-primary text-sm font-sans font-medium">
                      {verificationResult.decryptedText}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-theme-surface border border-theme-border text-[11px] text-theme-vermilion italic font-serif">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-editorial text-lg font-bold text-theme-primary">Import Dispatch Packet JSON</h3>
            <p className="text-xs text-theme-secondary font-mono">
              Paste a canonical JSON packet exported from another terminal or session.
            </p>
            <textarea
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              rows={8}
              placeholder="Paste JSON packet here..."
              className="w-full bg-theme-inset border border-theme-border rounded-xl p-3 font-mono text-xs text-theme-primary focus:outline-none focus:border-theme-bronze"
            />
            {importError && (
              <p className="text-xs font-mono text-theme-vermilion font-bold">{importError}</p>
            )}
            <div className="flex justify-end space-x-2 font-mono text-xs">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-theme-border text-theme-secondary hover:text-theme-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleImportJson}
                className="px-4 py-2 rounded-lg bg-theme-bronze text-theme-canvas font-bold"
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
