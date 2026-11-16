import { useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { CORE_PILLARS, OFFICES } from '../data/ebfData';

interface HeroSectionProps {
  onOpenMembership: () => void;
}

export function HeroSection({ onOpenMembership }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="border-b border-stone-200 bg-[#FBF9F5]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium mb-4">
                Established July 2003 · Bangladesh CHS-299 · Germany VR 30923 B
              </p>

              <h1 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08] font-semibold text-[#1C1917] text-balance max-w-2xl">
                A non-profit organization for social development and equal opportunity.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
                Everbright Foundation (EBF) serves underprivileged and destitute children, women, and
                rural communities across Bangladesh and Germany through education, primary medical care,
                human rights advocacy, and sustainable livelihoods.
              </p>

              {/* Primary & Secondary Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenMembership}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D94E28] hover:bg-[#B83D1B] rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94E28]"
                >
                  <span>Become a Member</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={OFFICES.brochurePdf}
                  download="Everbright_Foundation_EBF_Brochure.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#1E5631] border border-stone-300 bg-white hover:bg-stone-50 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E5631]"
                >
                  <Download className="w-4 h-4" />
                  <span>Brochure PDF</span>
                </a>
              </div>
            </div>

            {/* Five Core Pillars Editorial Strip */}
            <div className="mt-10 pt-6 border-t border-stone-200">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {CORE_PILLARS.map((pillar) => (
                  <div key={pillar.label} className="group">
                    <span className="block font-mono text-[11px] text-stone-400 tabular-nums">
                      {pillar.index}
                    </span>
                    <span className="block font-serif text-base font-semibold text-[#1E5631] mt-0.5">
                      {pillar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Documentary Visual Anchor */}
          <div className="lg:col-span-5 flex flex-col">
            <figure className="flex-1 flex flex-col bg-white border border-stone-200 p-3 rounded-sm">
              <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] lg:min-h-0 overflow-hidden bg-stone-100">
                {!imgError ? (
                  <img
                    src="/assets/ebf/hero_children.jpg"
                    alt="Smiling children waving during an Everbright Foundation community outreach program"
                    className="w-full h-full object-cover object-center lg:absolute lg:inset-0"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-6 text-center bg-gradient-to-br from-stone-100 to-stone-200">
                    <p className="font-serif text-stone-600">Everbright Foundation Community Outreach</p>
                  </div>
                )}
              </div>
              <figcaption className="mt-3 text-xs font-serif italic text-stone-500 leading-snug">
                Fig. 1 — Children participating in EBF community education and welfare outreach in Bangladesh.
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-Width 4-Column Institutional Proof Strip */}
        <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-medium text-[#1C1917] tabular-nums">
              July 2003
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
              Year Established
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-medium text-[#1C1917] tabular-nums">
              CHS-299 · VR 30923 B
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
              Statutory Registrations (BD &amp; DE)
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-medium text-[#1C1917] tabular-nums">
              14
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
              Active Social Development Areas
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-medium text-[#1C1917] tabular-nums">
              2 Chapters
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
              Sitakunda, Chattogram &amp; Berlin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
