import { useState } from 'react';
import { EXECUTIVE_COMMITTEE } from '../data/ebfData';

type ChapterFilter = 'All' | 'Bangladesh' | 'Germany';

export function LeadershipSection() {
  const [chapter, setChapter] = useState<ChapterFilter>('All');

  const bangladeshTeam = EXECUTIVE_COMMITTEE.filter((m) => m.chapter === 'Bangladesh');
  const germanyTeam = EXECUTIVE_COMMITTEE.filter((m) => m.chapter === 'Germany');

  const showBd = chapter === 'All' || chapter === 'Bangladesh';
  const showDe = chapter === 'All' || chapter === 'Germany';

  return (
    <section id="leadership" className="border-b border-stone-200 bg-white py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Header & Chapter Switch */}
        <div className="border-b border-stone-200 pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium">
              03 · Executive Leadership
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] text-balance">
              Executive Committees in Bangladesh &amp; Germany
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              EBF executes its activities through a dedicated management team led by executive
              committee members respected in their professions and social development work.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg self-start md:self-auto">
            {(['All', 'Bangladesh', 'Germany'] as const).map((tab) => {
              const active = chapter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setChapter(tab)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#1C1917] shadow-sm'
                      : 'text-stone-600 hover:text-[#1C1917]'
                  }`}
                >
                  {tab === 'All' ? 'Both Chapters' : `${tab} Chapter`}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-14">
          {showBd && (
            <div>
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E5631]">
                  Executive Committee of EBF, Bangladesh
                </h3>
                <span className="font-mono text-xs text-stone-500 tabular-nums">
                  6 Members · CHS-299
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bangladeshTeam.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}

          {showDe && (
            <div>
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E5631]">
                  Executive Committee of EBF, Germany e.V.
                </h3>
                <span className="font-mono text-xs text-stone-500 tabular-nums">
                  7 Members · VR 30923 B
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {germanyTeam.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: (typeof EXECUTIVE_COMMITTEE)[number] }) {
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <article className="bg-[#FBF9F5] border border-stone-200 p-4 rounded-sm flex items-center gap-4">
      <div className="w-16 h-20 shrink-0 bg-stone-200 overflow-hidden border border-stone-200 rounded-[2px]">
        {!imgError ? (
          <img
            src={member.image}
            alt={`${member.name}, ${member.role}`}
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1E5631]/10 text-[#1E5631] font-serif font-semibold">
            {initials}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-stone-500 font-medium">{member.role}</p>
        <h4 className="mt-0.5 font-serif text-base font-semibold text-[#1C1917] leading-snug">
          {member.name}
        </h4>
        <p className="mt-1 text-[11px] font-mono text-stone-400">
          EBF {member.chapter}
        </p>
      </div>
    </article>
  );
}
