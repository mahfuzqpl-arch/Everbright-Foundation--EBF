import { useState } from 'react';
import { Expand } from 'lucide-react';
import { ARCHIVE_DOCUMENTS, ArchiveDocument, CORE_VALUES } from '../data/ebfData';

interface AboutGovernanceSectionProps {
  onSelectDocument: (doc: ArchiveDocument) => void;
}

export function AboutGovernanceSection({ onSelectDocument }: AboutGovernanceSectionProps) {
  const [portraitError, setPortraitError] = useState(false);

  return (
    <section id="mission" className="border-b border-stone-200 bg-white py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="border-b border-stone-200 pb-6 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium">
              01 · Mission, Values &amp; Statutory Standing
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] text-balance">
              Mandate &amp; Dual-Jurisdiction Governance
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 tabular-nums">
            Operating in Bangladesh &amp; Federal Republic of Germany
          </p>
        </div>

        {/* Asymmetric 70 / 30 Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Narrative Column (70%) */}
          <div className="lg:col-span-8 space-y-10">
            <div className="max-w-prose">
              <h3 className="font-serif text-xl font-semibold text-[#1E5631] mb-4">
                Mission &amp; Vision
              </h3>
              <p className="text-base sm:text-[17px] text-stone-800 leading-[1.8] first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#1E5631]">
                To empower the community, promoting education, medical treatment, and socio-economic
                development—especially among rural and tribal peoples—in full compliance with the rules
                and regulations of the Governments of Bangladesh and Germany.
              </p>
              <p className="mt-5 text-base text-stone-700 leading-[1.75]">
                Incepted in July 2003 as a non-profitable volunteer and charitable organization,
                Everbright Foundation (EBF) moves forward steadily with the active participation of
                its members to serve underprivileged children, women, and men. We remain committed to
                delivering the highest standard of service to beneficiaries and warmly welcome
                constructive suggestions, opinions, and advice from partners and community members.
              </p>
            </div>

            {/* Core Values */}
            <div className="pt-8 border-t border-stone-200">
              <h3 className="font-serif text-xl font-semibold text-[#1C1917] mb-6">
                Core Institutional Values
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CORE_VALUES.map((val, i) => (
                  <div key={val.title} className="bg-[#FBF9F5] border border-stone-200 p-5 rounded-sm">
                    <span className="font-mono text-xs text-[#D94E28] tabular-nums">
                      0{i + 1}
                    </span>
                    <h4 className="mt-2 font-serif text-base font-semibold text-[#1C1917]">
                      {val.title}
                    </h4>
                    <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Registrations & Press Archive */}
            <div className="pt-8 border-t border-stone-200">
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                  Legal Documents &amp; Press Archive
                </h3>
                <span className="text-xs text-stone-500">Select any record to inspect</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {ARCHIVE_DOCUMENTS.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => onSelectDocument(doc)}
                    className="group text-left bg-[#FBF9F5] border border-stone-200 hover:border-[#1E5631] p-4 rounded-sm transition-colors duration-150 flex gap-4 items-start cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5631]"
                  >
                    <div className="w-20 h-24 shrink-0 bg-white border border-stone-200 overflow-hidden">
                      <img
                        src={doc.image}
                        alt={doc.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-[#1E5631] tabular-nums">
                          {doc.reference}
                        </span>
                        <Expand className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1E5631] shrink-0" />
                      </div>
                      <h4 className="mt-1 font-serif text-sm font-semibold text-[#1C1917] leading-snug">
                        {doc.title}
                      </h4>
                      <p className="mt-1 text-xs text-stone-500">
                        {doc.subtitle} · {doc.date}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Margin Column (30%) */}
          <aside className="lg:col-span-4 space-y-8">
            <figure className="bg-[#FBF9F5] border border-stone-200 p-3 rounded-sm">
              <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                {!portraitError ? (
                  <img
                    src="/assets/ebf/community_woman.jpg"
                    alt="Community member smiling during an EBF outreach program in Bangladesh"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4 text-center text-sm text-stone-500">
                    Community Outreach Archive
                  </div>
                )}
              </div>
              <figcaption className="mt-3 text-xs font-serif italic text-stone-500 leading-snug">
                Fig. 2 — Rural community outreach serving women and families across Chattogram.
              </figcaption>
            </figure>

            {/* Accession / Statutory Metadata DL */}
            <div className="bg-[#FBF9F5] border border-stone-200 p-5 rounded-sm">
              <h3 className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold mb-4">
                Institutional Registry
              </h3>
              <dl className="divide-y divide-stone-200 text-sm">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-stone-500">Founded</dt>
                  <dd className="font-mono text-stone-900 text-right tabular-nums">July 2003</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-stone-500">Bangladesh Reg.</dt>
                  <dd className="font-mono text-stone-900 text-right tabular-nums">CHS-299 (2005)</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-stone-500">German Registry</dt>
                  <dd className="font-mono text-stone-900 text-right tabular-nums">VR 30923 B (2011)</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-stone-500">Berlin Court</dt>
                  <dd className="text-stone-900 text-right">Amtsgericht Charlottenburg</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-stone-500">Statutory Act</dt>
                  <dd className="text-stone-900 text-right">Societies Act XXI of 1860</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
