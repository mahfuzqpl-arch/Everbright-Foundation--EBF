import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROGRAM_ACTIVITIES, ProgramActivity } from '../data/ebfData';

const CATEGORIES = [
  'All',
  'Education & Youth',
  'Health & Rehabilitation',
  'Rights & Advocacy',
  'Livelihoods & Agro',
] as const;

const REGIONS = ['All Regions', 'Bangladesh', 'Germany'] as const;

export function ProgramsSection() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [selectedRegion, setSelectedRegion] = useState<(typeof REGIONS)[number]>('All Regions');
  const [activeProgram, setActiveProgram] = useState<ProgramActivity>(PROGRAM_ACTIVITIES[0]);

  const filteredPrograms = useMemo(() => {
    return PROGRAM_ACTIVITIES.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchReg =
        selectedRegion === 'All Regions' ||
        item.region === selectedRegion ||
        item.region === 'Bangladesh & Germany';
      return matchCat && matchReg;
    });
  }, [selectedCategory, selectedRegion]);

  const currentIdx = filteredPrograms.findIndex((p) => p.index === activeProgram.index);
  const resolvedIdx = currentIdx >= 0 ? currentIdx : 0;
  const displayedSpotlight = filteredPrograms[resolvedIdx] || PROGRAM_ACTIVITIES[0];

  const stepSpotlight = (delta: number) => {
    if (filteredPrograms.length === 0) return;
    const nextIdx =
      (resolvedIdx + delta + filteredPrograms.length) % filteredPrograms.length;
    setActiveProgram(filteredPrograms[nextIdx]);
  };

  return (
    <section id="programs" className="border-b border-stone-200 bg-[#FBF9F5] py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="border-b border-stone-200 pb-6 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium">
              02 · Programs &amp; Field Operations
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] text-balance">
              Fourteen Core Development Activities
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Activities Area: Bangladesh &amp; Germany. Select any program below to inspect field documentation.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#1C1917] shadow-sm'
                      : 'text-stone-600 hover:text-[#1C1917]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg self-start md:self-auto">
            {REGIONS.map((region) => {
              const active = selectedRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1E5631] text-white'
                      : 'text-stone-600 hover:text-[#1C1917]'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Split: Featured Visual Spotlight + Interactive Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sticky Spotlight Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white border border-stone-200 p-4 rounded-sm">
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={displayedSpotlight.image}
                  alt={displayedSpotlight.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500 min-w-0">
                    <span className="font-mono text-[#D94E28] tabular-nums">
                      Program {displayedSpotlight.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{displayedSpotlight.region}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => stepSpotlight(-1)}
                      aria-label="Previous program photo"
                      className="w-8 h-8 inline-flex items-center justify-center rounded border border-stone-200 text-stone-600 hover:bg-stone-100 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepSpotlight(1)}
                      aria-label="Next program photo"
                      className="w-8 h-8 inline-flex items-center justify-center rounded border border-stone-200 text-stone-600 hover:bg-stone-100 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1C1917]">
                  {displayedSpotlight.title}
                </h3>
                <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                  {displayedSpotlight.summary}
                </p>
                <p className="mt-3 pt-3 border-t border-stone-200 text-xs font-serif italic text-stone-500">
                  {displayedSpotlight.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Right Numbered Editorial List */}
          <div className="lg:col-span-7 divide-y divide-stone-200 border-t border-b border-stone-200 bg-white">
            {filteredPrograms.map((program) => {
              const isSelected = displayedSpotlight.index === program.index;
              return (
                <button
                  key={program.index}
                  type="button"
                  onClick={() => setActiveProgram(program)}
                  className={`w-full text-left px-5 py-4 transition-colors duration-150 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1E5631] ${
                    isSelected ? 'bg-[#F2EDE4]/70' : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <span
                      className={`font-mono text-xs mt-1 tabular-nums shrink-0 ${
                        isSelected ? 'text-[#D94E28] font-semibold' : 'text-stone-400'
                      }`}
                    >
                      {program.index}.
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-serif text-base sm:text-lg font-medium text-[#1C1917]">
                        {program.title}
                      </h4>
                      <p className="mt-1 text-xs text-stone-500">
                        {program.category} · {program.region}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium shrink-0 mt-1 ${
                      isSelected ? 'text-[#1E5631]' : 'text-stone-400'
                    }`}
                  >
                    {isSelected ? 'Viewing' : 'Inspect'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
