# ARTHAŚĀSTRA — Secure Dispatch Lab
### Indian Knowledge Systems (IKS) Digital Exhibition & Cryptography Laboratory

> **"Trust the Message. Verify the Royal Seal."**  
> An educational digital exhibition and interactive cryptography laboratory inspired by Kauṭilya’s *Arthaśāstra* (Book II: *Śāsanādhikāra*, The Royal Edict; Book V: *Gūḍhapuruṣapraṇidhi*, Secret Conduct).

---

## 🏛️ Project Overview

This project explores the epistemological and institutional foundations of covert communication, confidential dispatches, and verification protocols in ancient Indian statecraft, bridging classical substitution techniques with modern cryptographic message authentication (HMAC-SHA-256).

### Non-Negotiable Demarcations
1. **Classical Ciphers (Caesar, Vigenère, Reciprocal substitution)** are educational tools. They alter the visual form of text (monoalphabetic and polyalphabetic shifting) but provide no mathematical confidentiality against modern cryptanalysis.
2. **Message Authentication Codes (HMAC-SHA-256)** provide unforgeable integrity and origin authentication when paired with a shared secret key (RFC 2104 / FIPS 198-1). HMAC does not encrypt data; it signs data.
3. **The Royal Seal (*Mudrā*)** acts as the intellectual ancestor to modern cryptographic integrity: ensuring that a mandate was issued by sovereign authority and arrived unaltered.

---

## 🔍 Audited Vulnerabilities & Resolved Defects

This application is built upon a rigorous audit of the baseline implementation (`arthasastra_secure_dispatch.html`):

| Area | Baseline Defect | Audited Resolution |
| :--- | :--- | :--- |
| **Unauthenticated Parameters** | `packet.shift` was omitted from `packetData()` and the HMAC tag. | **Fixed:** All parameters (`version`, `from`, `level`, `cipher`, `params: {shift, key}`, `body`) are bound in the canonical string representation. Tampering with any parameter now invalidates the seal. |
| **Non-Deterministic Serialization** | Plain `JSON.stringify` relied on non-deterministic engine key ordering. | **Fixed:** Deterministic canonicalization sorts all dictionary keys and parameter trees prior to HMAC hashing. |
| **Packet Export / Import** | Exported JSON omitted algorithm parameters; lacked schema validation or import ability. | **Fixed:** Full schema-compliant JSON export, one-click clipboard copying, and strict JSON import with schema validation. |
| **Frequency Analysis Truncation** | Original frequency visualization sliced at `0..13`, displaying only A through M! | **Fixed:** Complete 26-letter (A–Z) comparative frequency chart with exact counts, percentages, and dual overlay against standard English expectations (Beker & Piper corpus). |
| **Brittle Test Harness** | Original Test 11 only evaluated `1 < 2` without testing clearance policy execution. | **Fixed:** Comprehensive 20-test automated suite testing real Web Crypto operations, wrong key rejections, tampered parameters, and policy enforcement. |

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.7+ (Strict Mode)
- **Styling:** Tailwind CSS (Custom Archival Design Tokens: Obsidian, Charcoal, Ivory, Bronze, Seal Green, Vermilion)
- **Cryptography:** Native W3C Web Crypto API (`SubtleCrypto` HMAC-SHA-256)
- **Icons & Visuals:** Lucide React & Handcrafted Mathematical SVG Geometries
- **Deployment:** Vercel (Optimized static generation with zero external runtime dependencies)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18.18.0 or newer (tested on Node v24)
- npm or pnpm or yarn

### 1. Installation
```bash
npm install
```

### 2. Run the 20-Assertion Cryptographic Test Harness
```bash
npm test
```
Executes all 20 automated unit assertions verifying cipher round-trips, Web Crypto HMAC-SHA-256 generation, parameter tampering rejection, and clearance authorization rules.

### 3. Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm start
```

---

## 🌐 Deploying to Vercel

This repository is pre-configured for zero-configuration deployment on **Vercel**:

### Option A: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B: Via GitHub Repository
1. Push this repository to GitHub.
2. In the Vercel Dashboard, click **New Project** and select your repository.
3. Keep default settings (Framework: Next.js, Build Command: `npm run build`, Output Directory: `.next`).
4. Click **Deploy**.

---

## 📜 Scholarly References & Academic Integrity

- **Kauṭilya's Arthaśāstra:** Olivelle, Patrick (Trans. & Ed.), *King, Governance, and Law in Ancient India: Kauṭilya's Arthaśāstra*, Oxford University Press, 2013. [Oxford Academic](https://academic.oup.com/book/8486/chapter-abstract/154327784)
- **Statecraft & Intelligence:** Liebig, Michael, *Kauṭilya’s Arthaśāstra: A Classical Text of Statecraft and Intelligence*, Institute for Defence Studies and Analyses (IDSA), 2014. [IDSA Journal](https://www.idsa.in/system/files/jds/jds_8_4_2014_michaelliebig.pdf)
- **Covert Communication Studies:** Journal of Defence Management & Security Studies, *Statecraft and Secret Communication in Ancient Indian Treatises*, 2018. [Indian Journals](https://indianjournals.com/article/sjdm-25-4-016)
- **Cryptographic Standards:** OWASP Foundation, *Cryptographic Storage & Message Authentication Cheat Sheet*, 2024. [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)

---

## ⚖️ License
MIT License. Developed for educational, research, and cultural heritage exploration under the Indian Knowledge Systems (IKS) academic initiative.
