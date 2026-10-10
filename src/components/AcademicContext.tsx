'use client';

import React from 'react';
import { BookOpen, ExternalLink, Feather, Landmark, Award } from 'lucide-react';

export const AcademicContext: React.FC = () => {
  const references = [
    {
      title: 'King, Governance, and Law in Ancient India: Kauṭilya’s Arthaśāstra',
      author: 'Patrick Olivelle (Translator & Editor)',
      publication: 'Oxford University Press, 2013',
      link: 'https://academic.oup.com/book/8486/chapter-abstract/154327784',
      annotation:
        'The definitive critical translation examining Book II (The Director of Departments, Royal Scribes, and Writs) and Book V (Secret Conduct).',
    },
    {
      title: 'Statecraft and Secret Communication in Ancient Indian Treatises',
      author: 'Journal of Defence Management & Security Studies',
      publication: 'Indian Journals / Academic Review, 2018',
      link: 'https://indianjournals.com/article/sjdm-25-4-016',
      annotation:
        'Analyzes the intelligence architecture of the Mauryan empire, secret envoys (Dūta), and the administrative role of royal seals.',
    },
    {
      title: 'Kauṭilya’s Arthaśāstra: A Classical Text of Statecraft and Intelligence',
      author: 'Michael Liebig',
      publication: 'Institute for Defence Studies and Analyses (IDSA), 2014',
      link: 'https://www.idsa.in/system/files/jds/jds_8_4_2014_michaelliebig.pdf',
      annotation:
        'Explores the epistemological and institutional frameworks of the Arthaśāstra, specifically covert operations and information verification.',
    },
    {
      title: 'Cryptographic Storage & Message Authentication Guidance',
      author: 'OWASP Foundation',
      publication: 'OWASP Cheat Sheet Series',
      link: 'https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html',
      annotation:
        'Standards for modern data protection, symmetric key management, authenticated encryption (AEAD), and HMAC verification.',
    },
  ];

  return (
    <section id="academic" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-theme-border">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-theme-border-strong bg-theme-bronze/10 text-xs font-mono text-theme-bronze uppercase tracking-widest font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Section 05 / Scholarly Framework</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-theme-primary tracking-tight">
          Academic Context & Indian Knowledge Systems
        </h2>
        <p className="text-sm sm:text-base text-theme-secondary leading-relaxed font-sans">
          Historical fidelity meets modern computational rigor. Discover the institutional foundations 
          of the Mauryan state and the epistemological discipline of Kauṭilyan statecraft.
        </p>
      </div>

      <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-10 shadow-card space-y-10">
        {/* Core Treatises Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-theme-border bg-theme-inset space-y-3">
            <div className="w-9 h-9 rounded-lg bg-theme-bronze/15 border border-theme-border-strong flex items-center justify-center text-theme-bronze">
              <Feather className="w-4 h-4" />
            </div>
            <h3 className="font-editorial text-base font-bold text-theme-primary">
              The Royal Writ (Śāsana)
            </h3>
            <p className="text-xs text-theme-secondary leading-relaxed font-sans">
              Book II, Chapter 10 of the <em className="text-theme-bronze not-italic font-semibold">Arthaśāstra</em> defines 
              the qualifications of the royal scribe (lekhaka): mastery of all scripts, clarity of expression, 
              incorruptible integrity, and the sacred preservation of the sovereign seal.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-theme-border bg-theme-inset space-y-3">
            <div className="w-9 h-9 rounded-lg bg-theme-seal-bg border border-theme-seal-border flex items-center justify-center text-theme-seal">
              <Landmark className="w-4 h-4" />
            </div>
            <h3 className="font-editorial text-base font-bold text-theme-primary">
              The Royal Seal (Mudrā)
            </h3>
            <p className="text-xs text-theme-secondary leading-relaxed font-sans">
              The <em className="text-theme-seal not-italic font-semibold">Mudrādhyakṣa</em> (Superintendent of Seals) 
              ensured that no person, commodity, or royal decree could traverse imperial borders without 
              an authentic impression. Mudrā represents the intellectual precursor to modern message authentication codes (MACs).
            </p>
          </div>

          <div className="p-5 rounded-xl border border-theme-border bg-theme-inset space-y-3">
            <div className="w-9 h-9 rounded-lg bg-theme-bronze/20 border border-theme-border-strong flex items-center justify-center text-theme-bronze">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="font-editorial text-base font-bold text-theme-primary">
              Covert Writing (Gūḍhalekha)
            </h3>
            <p className="text-xs text-theme-secondary leading-relaxed font-sans">
              Book I, Chapter 12 details communication with secret intelligence operatives (Gūḍhapuruṣa) 
              via prearranged ciphers, hidden inscriptions, and covert signifiers. These methods demonstrate ancient 
              awareness of the need for information concealment.
            </p>
          </div>
        </div>

        {/* Conceptual Demarcation Table */}
        <div className="space-y-4">
          <h3 className="font-editorial text-xl font-bold text-theme-primary">
            Conceptual Demarcation: Ancient Inspiration vs Modern Technology
          </h3>
          <div className="overflow-x-auto border border-theme-border rounded-xl">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-theme-inset border-b border-theme-border text-theme-muted uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Domain</th>
                  <th className="p-3">Historical Concept (Arthaśāstra)</th>
                  <th className="p-3">Modern Cryptographic Equivalent</th>
                  <th className="p-3">Educational Role in this Lab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                <tr className="hover:bg-theme-subtle">
                  <td className="p-3 font-bold text-theme-primary">Provenance & Integrity</td>
                  <td className="p-3 text-theme-bronze font-medium">Royal Clay/Wax Seal (Mudrā)</td>
                  <td className="p-3 text-theme-seal font-bold">HMAC-SHA-256 (RFC 2104)</td>
                  <td className="p-3 text-theme-secondary">Cryptographically authenticates packet fields</td>
                </tr>
                <tr className="hover:bg-theme-subtle">
                  <td className="p-3 font-bold text-theme-primary">Text Concealment</td>
                  <td className="p-3 text-theme-bronze font-medium">Gūḍhalekha (Secret script / tokens)</td>
                  <td className="p-3 text-theme-bronze font-medium">Classical Caesar / Vigenère ciphers</td>
                  <td className="p-3 text-theme-secondary">Demonstrates shift mechanics & vulnerability to analysis</td>
                </tr>
                <tr className="hover:bg-theme-subtle">
                  <td className="p-3 font-bold text-theme-primary">Access Control</td>
                  <td className="p-3 text-theme-bronze font-medium">Envoys: Nisṛṣṭārtha, Parimitārtha, Śāsanahara</td>
                  <td className="p-3 text-theme-primary font-medium">Role-Based Access Control (Clearance Tiers)</td>
                  <td className="p-3 text-theme-secondary">Demonstrates authorization policy: Open, Counsel, Secret</td>
                </tr>
                <tr className="hover:bg-theme-subtle">
                  <td className="p-3 font-bold text-theme-primary">Message Transport</td>
                  <td className="p-3 text-theme-bronze font-medium">Courier Relay Stations (Dūtānudūta)</td>
                  <td className="p-3 text-theme-primary font-medium">JSON Network Packet Transmission</td>
                  <td className="p-3 text-theme-secondary">Simulates hostile interception and channel tampering</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Scholarly Bibliography */}
        <div className="space-y-4 pt-4 border-t border-theme-border">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-theme-bronze" />
            <h3 className="font-editorial text-lg font-bold text-theme-primary">
              Verified Scholarly Bibliography & Standards
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((ref, idx) => (
              <a
                key={idx}
                href={ref.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl border border-theme-border bg-theme-inset hover:border-theme-border-strong hover:bg-theme-subtle transition-all flex flex-col justify-between space-y-2 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <strong className="text-xs font-editorial font-bold text-theme-primary group-hover:text-theme-bronze transition-colors">
                      {ref.title}
                    </strong>
                    <ExternalLink className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-bronze shrink-0 mt-0.5" />
                  </div>
                  <span className="text-[11px] font-mono text-theme-bronze block mt-0.5 font-medium">
                    {ref.author} · {ref.publication}
                  </span>
                  <p className="text-[11px] text-theme-secondary font-sans mt-2 leading-relaxed">
                    {ref.annotation}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
