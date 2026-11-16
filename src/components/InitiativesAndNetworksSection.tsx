import { useState, FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, X } from 'lucide-react';
import { DEVELOPMENT_NETWORKS, LINK_ORGANIZATIONS, OFFICES } from '../data/ebfData';

export function InitiativesAndNetworksSection() {
  const [modalMode, setModalMode] = useState<'hospital' | 'internship' | null>(null);
  const [submittedNote, setSubmittedNote] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantOrgOrUni, setApplicantOrgOrUni] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');

  const openModal = (mode: 'hospital' | 'internship') => {
    setSubmittedNote(null);
    setModalMode(mode);
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject =
      modalMode === 'hospital'
        ? `Partnership Inquiry: EBF Hospital for Poor Mothers & Kids Care`
        : `EBF Internship Programme Application — ${applicantName}`;
    const body = [
      `Name: ${applicantName}`,
      `Email: ${applicantEmail}`,
      modalMode === 'hospital'
        ? `Organization / Support Type: ${applicantOrgOrUni}`
        : `University / Group: ${applicantOrgOrUni}`,
      ``,
      `Details:`,
      applicantMessage,
    ].join('\n');

    setSubmittedNote(
      `Prepared ${modalMode === 'hospital' ? 'hospital support pledge' : 'internship application'} for ${applicantName}. You can dispatch it directly via email to mahfuz.ebf@gmail.com.`
    );

    // Trigger native mail client draft cleanly without window.open popup blocking
    const mailtoLink = `mailto:mahfuz.ebf@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="initiatives" className="border-b border-stone-200 bg-[#FBF9F5] py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium">
              04 · Flagship Projects, Link Organizations &amp; Networks
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] text-balance">
              Building Lasting Community Infrastructure
            </h2>
          </div>
        </div>

        {/* Flagship Proposed Hospital + Internship Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Proposed Hospital Card */}
          <article className="lg:col-span-7 bg-white border border-stone-200 rounded-sm overflow-hidden flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
              <div className="md:col-span-5 relative min-h-[220px] bg-stone-100">
                <img
                  src="/assets/ebf/hospital_mother_child.jpg"
                  alt="Mother and child served by EBF maternal healthcare initiatives"
                  className="w-full h-full object-cover md:absolute md:inset-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono text-[#D94E28] uppercase tracking-wider">
                    Proposed Flagship Project · Sitakunda, Chattogram
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1C1917] leading-snug">
                    EBF Hospital for Poor Mothers &amp; Kids Care
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed">
                    We are preparing to establish a dedicated hospital for underserved mothers and
                    children to ensure safe motherhood care. Our first facility will launch in
                    Sitakunda, Chattogram, and expand step-by-step across Bangladesh.
                  </p>
                  <p className="mt-3 text-sm text-stone-600">
                    Financial and technical partnerships are warmly invited to help establish this center.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-stone-200 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openModal('hospital')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1E5631] hover:bg-[#143D22] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Offer Financial / Technical Support</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Internship Programme Card */}
          <article className="lg:col-span-5 bg-white border border-stone-200 p-6 sm:p-8 rounded-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-[#1E5631] uppercase tracking-wider">
                Student &amp; Fresher Engagement
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1C1917] leading-snug">
                EBF Internship Programme
              </h3>
              <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed">
                EBF has launched an active Internship Programme in Bangladesh focused on grassroots
                socio-development issues. Interested individuals or student groups may apply to
                undertake field placements aligned with their academic and care-development focus.
              </p>
              <dl className="mt-5 pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Eligibility</dt>
                  <dd className="font-medium text-stone-900 text-right">Students &amp; Freshers (Individual / Group)</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Location</dt>
                  <dd className="font-medium text-stone-900 text-right">Chattogram &amp; Regional Centers</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Direct Coordinator</dt>
                  <dd className="font-mono text-stone-900 text-right">mahfuz.ebf@gmail.com</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 pt-5 border-t border-stone-200">
              <button
                type="button"
                onClick={() => openModal('internship')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1E5631] border border-[#1E5631] hover:bg-[#1E5631] hover:text-white rounded-md transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Request Internship Application</span>
              </button>
            </div>
          </article>
        </div>

        {/* Link Organizations (Bangladesh) */}
        <div>
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917]">
              Link Organizations in Bangladesh
            </h3>
            <span className="text-xs text-stone-500">Affiliated Operational Units</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LINK_ORGANIZATIONS.map((org, idx) => (
              <div key={org.name} className="bg-white border border-stone-200 p-6 rounded-sm">
                <span className="font-mono text-xs text-stone-400 tabular-nums">
                  0{idx + 1} · {org.location}
                </span>
                <h4 className="mt-2 font-serif text-lg font-semibold text-[#1E5631]">
                  {org.name}
                </h4>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  {org.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Development Networks */}
        <div>
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917]">
              Our Development Networks
            </h3>
            <span className="text-xs text-stone-500">International &amp; Civil Society Alliances</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEVELOPMENT_NETWORKS.map((net) => (
              <div
                key={net.name}
                className="bg-white border border-stone-200 p-5 rounded-sm flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#1C1917]">
                    {net.fullName}
                  </h4>
                  <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                    {net.focus}
                  </p>
                </div>
                <span className="mt-3 pt-2 border-t border-stone-100 font-mono text-[11px] text-[#1E5631]">
                  {net.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Inquiry Modal for Hospital Support or Internship */}
      {modalMode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="initiative-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4"
        >
          <div className="bg-white border border-stone-200 max-w-lg w-full rounded-sm p-6 sm:p-8 shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <p className="text-xs font-mono text-[#D94E28] uppercase">
                  {modalMode === 'hospital' ? 'Hospital Support Inquiry' : 'Internship Application'}
                </p>
                <h3 id="initiative-modal-title" className="mt-1 font-serif text-xl font-semibold text-[#1C1917]">
                  {modalMode === 'hospital'
                    ? 'EBF Hospital for Poor Mothers & Kids Care'
                    : 'EBF Internship Programme for Students & Freshers'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                aria-label="Close modal"
                className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-stone-200 text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submittedNote ? (
              <div className="py-6 space-y-4">
                <div className="flex items-start gap-3 p-4 bg-[#1E5631]/5 border border-[#1E5631]/20 rounded-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#1E5631] shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800 leading-relaxed">{submittedNote}</p>
                </div>
                <p className="text-xs text-stone-500">
                  Direct contact: {OFFICES.contactPerson} · mahfuz.ebf@gmail.com
                </p>
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#1E5631] rounded-md hover:bg-[#143D22] cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="name@example.org"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    {modalMode === 'hospital'
                      ? 'Organization / Support Type (Financial, Medical Equipment, Technical)'
                      : 'University / Academic Field / Group Size'}
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantOrgOrUni}
                    onChange={(e) => setApplicantOrgOrUni(e.target.value)}
                    placeholder={
                      modalMode === 'hospital'
                        ? 'e.g. Medical Equipment / Institutional Grant'
                        : 'e.g. University of Chittagong — Social Work (Individual)'
                    }
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Message / Proposal Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={applicantMessage}
                    onChange={(e) => setApplicantMessage(e.target.value)}
                    placeholder="Share your interest, preferred dates, or partnership details..."
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                  />
                </div>
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalMode(null)}
                    className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-[#D94E28] hover:bg-[#B83D1B] rounded-md transition-colors cursor-pointer"
                  >
                    Prepare Email Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
