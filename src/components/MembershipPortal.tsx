import { useState, FormEvent } from 'react';
import { Check, FileText, Mail, Printer, RotateCcw } from 'lucide-react';
import {
  ADULT_ACTIVITIES,
  CHILDREN_ACTIVITIES,
  MEMBERSHIP_TIERS,
  RECREATIONAL_SPORTS,
} from '../data/ebfData';

interface MembershipFormState {
  tierId: (typeof MEMBERSHIP_TIERS)[number]['id'];
  titlePrefix: 'Mr' | 'Mrs' | 'Dr' | 'Ms';
  givenNames: string;
  surname: string;
  nidNo: string;
  gender: 'Male' | 'Female' | '';
  dob: string;
  placeOfBirth: string;
  nationality: string;
  maritalStatus: string;
  residentialAddress: string;
  postalCode: string;
  telNo: string;
  mobileNo: string;
  faxNo: string;
  email: string;
  jobTitle: string;
  mailPreference: 'Correspondence' | 'Office Magazine';
  hardcopyDelivery: 'Home' | 'Office';
  cardApplicantName: string;
  cardSpouseName: string;
  permanentAddress: string;
  permanentPostalCode: string;
  reasonForJoining: string;
  // Part II - Spouse
  spouseName: string;
  spouseEmail: string;
  spouseDob: string;
  spousePlaceOfBirth: string;
  spouseNationality: string;
  spouseMobile: string;
  // Part III - Referral
  referralSource: 'Member Referral' | 'Internet' | 'Others';
  referrerName: string;
  referrerMembershipNo: string;
  otherReferralDetail: string;
  otherCharityMemberships: string;
  // Part IV - Consent & Declaration
  consentMailing: boolean;
  consentMobile: boolean;
  consentEmail: boolean;
  consentSpouseMobile: boolean;
  consentSpouseEmail: boolean;
  termHonorableStatus: boolean;
  termAdvisoryConversation: boolean;
  declarationAccepted: boolean;
  applicantSignature: string;
  applicationDate: string;
  // Page 10 - Interests & Payment
  sports: string[];
  otherSport: string;
  adultActivities: string[];
  childrenActivities: string[];
  paymentMethod: 'Cash' | 'Cheque' | 'Money Order';
}

const INITIAL_STATE: MembershipFormState = {
  tierId: 'donor',
  titlePrefix: 'Mr',
  givenNames: '',
  surname: '',
  nidNo: '',
  gender: '',
  dob: '',
  placeOfBirth: '',
  nationality: '',
  maritalStatus: '',
  residentialAddress: '',
  postalCode: '',
  telNo: '',
  mobileNo: '',
  faxNo: '',
  email: '',
  jobTitle: '',
  mailPreference: 'Correspondence',
  hardcopyDelivery: 'Home',
  cardApplicantName: '',
  cardSpouseName: '',
  permanentAddress: '',
  permanentPostalCode: '',
  reasonForJoining: '',
  spouseName: '',
  spouseEmail: '',
  spouseDob: '',
  spousePlaceOfBirth: '',
  spouseNationality: '',
  spouseMobile: '',
  referralSource: 'Internet',
  referrerName: '',
  referrerMembershipNo: '',
  otherReferralDetail: '',
  otherCharityMemberships: '',
  consentMailing: true,
  consentMobile: true,
  consentEmail: true,
  consentSpouseMobile: false,
  consentSpouseEmail: false,
  termHonorableStatus: true,
  termAdvisoryConversation: true,
  declarationAccepted: false,
  applicantSignature: '',
  applicationDate: new Date().toISOString().slice(0, 10),
  sports: [],
  otherSport: '',
  adultActivities: [],
  childrenActivities: [],
  paymentMethod: 'Cash',
};

const STEPS = [
  { id: 1, label: '01. Membership & Personal' },
  { id: 2, label: '02. Spouse & Referral' },
  { id: 3, label: '03. Interests & Consent' },
] as const;

export function MembershipPortal() {
  const [form, setForm] = useState<MembershipFormState>(INITIAL_STATE);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [submittedSlNo, setSubmittedSlNo] = useState<string | null>(null);
  const [currencyView, setCurrencyView] = useState<'BDT' | 'EUR'>('EUR');

  const selectedTier =
    MEMBERSHIP_TIERS.find((t) => t.id === form.tierId) ?? MEMBERSHIP_TIERS[0];

  const toggleArrayItem = (
    key: 'sports' | 'adultActivities' | 'childrenActivities',
    value: string
  ) => {
    setForm((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((v) => v !== value) : [...prev[key], value],
      };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const randomSl = `EBF-${new Date().getFullYear()}-${String(
      Math.floor(1000 + Math.random() * 9000)
    )}`;
    setSubmittedSlNo(randomSl);
  };

  const handleEmailSubmission = () => {
    const fullName = `${form.titlePrefix} ${form.givenNames} ${form.surname}`.trim();
    const subject = `EBF Membership Application (${selectedTier.label}) — ${fullName}`;
    const body = [
      `Everbright Foundation (EBF) — Membership Application`,
      `Reference SL No.: ${submittedSlNo ?? 'Draft'}`,
      `Membership Type: ${selectedTier.label} (${selectedTier.feeBdt} / ${selectedTier.feeEur})`,
      ``,
      `PART I — PERSONAL INFORMATION`,
      `Name: ${fullName}`,
      `NID No.: ${form.nidNo}`,
      `Gender: ${form.gender} | DOB: ${form.dob} | Nationality: ${form.nationality}`,
      `Residential Address: ${form.residentialAddress} ${form.postalCode}`,
      `Mobile: ${form.mobileNo} | Email: ${form.email}`,
      `Job Title: ${form.jobTitle}`,
      `Name on Card: ${form.cardApplicantName}`,
      `Reason for Joining: ${form.reasonForJoining}`,
      ``,
      `PART II & III — SPOUSE & REFERRAL`,
      `Spouse: ${form.spouseName || 'N/A'}`,
      `Referral: ${form.referralSource}${form.referrerName ? ` (${form.referrerName} #${form.referrerMembershipNo})` : ''}`,
      ``,
      `INTERESTS & PAYMENT`,
      `Sports: ${form.sports.join(', ') || 'None selected'}`,
      `Adult Activities: ${form.adultActivities.join(', ') || 'None selected'}`,
      `Children Activities: ${form.childrenActivities.join(', ') || 'None selected'}`,
      `Preferred Payment Method: ${form.paymentMethod}`,
      `Declaration Signed By: ${form.applicantSignature} on ${form.applicationDate}`,
    ].join('\n');

    window.location.href = `mailto:mahfuz.ebf@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="membership" className="border-b border-stone-200 bg-white py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="border-b border-stone-200 pb-6 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.14em] text-stone-500 font-medium">
              05 · Membership Application Portal
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] text-balance">
              Official Membership Application &amp; Fee Schedule
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Complete the official EBF application form (Parts I–IV &amp; Social Interests) to
              generate your printable membership record and money receipt.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setCurrencyView('EUR')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                currencyView === 'EUR'
                  ? 'bg-white text-[#1C1917] shadow-sm'
                  : 'text-stone-600 hover:text-[#1C1917]'
              }`}
            >
              EUR (€)
            </button>
            <button
              type="button"
              onClick={() => setCurrencyView('BDT')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                currencyView === 'BDT'
                  ? 'bg-white text-[#1C1917] shadow-sm'
                  : 'text-stone-600 hover:text-[#1C1917]'
              }`}
            >
              BDT (TK.)
            </button>
          </div>
        </div>

        {/* Tier Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {MEMBERSHIP_TIERS.map((tier) => {
            const active = form.tierId === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => {
                  setForm((prev) => ({ ...prev, tierId: tier.id }));
                  setSubmittedSlNo(null);
                }}
                className={`text-left p-6 rounded-sm border transition-colors duration-150 cursor-pointer flex flex-col justify-between ${
                  active
                    ? 'bg-[#FBF9F5] border-[#1E5631] ring-1 ring-[#1E5631]'
                    : 'bg-white border-stone-200 hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif text-lg font-semibold text-[#1C1917]">
                      {tier.label}
                    </span>
                    {active && <Check className="w-4 h-4 text-[#1E5631]" />}
                  </div>
                  <p className="mt-2 font-mono text-2xl font-medium text-[#1E5631] tabular-nums">
                    {currencyView === 'EUR' ? tier.feeEur : tier.feeBdt}
                    <span className="ml-2 text-xs text-stone-500">
                      ({currencyView === 'EUR' ? tier.feeBdt : tier.feeEur})
                    </span>
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {tier.summary}
                  </p>
                </div>
                <p className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-stone-500">
                  Honorary award status · Non-refundable unless unapproved
                </p>
              </button>
            );
          })}
        </div>

        {/* Either Submitted Printable Receipt View OR Multi-Step Form */}
        {submittedSlNo ? (
          <div className="bg-[#FBF9F5] border border-stone-200 p-6 sm:p-10 rounded-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <p className="text-xs font-mono text-[#1E5631] uppercase">
                  Application Ready · {submittedSlNo}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]">
                  Membership Application Summary &amp; Money Receipt
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 rounded-md cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={handleEmailSubmission}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold bg-[#D94E28] hover:bg-[#B83D1B] text-white rounded-md cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email to EBF Office</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmittedSlNo(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Edit Form</span>
                </button>
              </div>
            </div>

            {/* Printable Official Receipt Sheet */}
            <div
              id="printable-receipt-sheet"
              className="mt-8 bg-white border border-stone-300 p-6 sm:p-8 space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-stone-300 pb-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/assets/ebf/ebf_logo.png"
                    alt="Everbright Foundation logo"
                    className="h-14 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#1C1917]">
                      EVERBRIGHT FOUNDATION (EBF)
                    </h4>
                    <p className="text-xs text-stone-600">
                      MEMBERSHIP APPLICATION FORM — MONEY RECEIPT
                    </p>
                  </div>
                </div>
                <div className="text-xs text-stone-600 space-y-0.5 sm:text-right">
                  <p className="font-semibold text-stone-800">Bangladesh Office:</p>
                  <p>College Road, Sitakunda, Chattogram, Bangladesh · Tel: 01711-475526</p>
                  <p className="font-semibold text-stone-800 pt-1">German Office:</p>
                  <p>Rathausstr. 9, 10178 Berlin, Germany · mahfuz.ebf@gmail.com</p>
                </div>
              </div>

              {/* Money Receipt Details Grid (Page 10 Layout) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-sm">
                <div className="md:col-span-8 space-y-3">
                  <div className="flex justify-between border-b border-stone-200 pb-1.5">
                    <span className="text-stone-500">Date No.:</span>
                    <span className="font-mono text-stone-900 tabular-nums">
                      {form.applicationDate}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-1.5">
                    <span className="text-stone-500">Received From:</span>
                    <span className="font-medium text-stone-900">
                      {form.titlePrefix} {form.givenNames} {form.surname}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-1.5">
                    <span className="text-stone-500">For Payment of:</span>
                    <span className="font-medium text-stone-900">
                      {selectedTier.label} Membership Fee
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-1.5">
                    <span className="text-stone-500">Name on Membership Card:</span>
                    <span className="font-mono uppercase text-stone-900">
                      {form.cardApplicantName || `${form.givenNames} ${form.surname}`.slice(0, 20)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-1.5">
                    <span className="text-stone-500">Paid By:</span>
                    <span className="font-medium text-stone-900">{form.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-1.5">
                    <span className="text-stone-500">Applicant Contact:</span>
                    <span className="font-mono text-stone-900">
                      {form.mobileNo} · {form.email}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 space-y-4">
                  <div className="border border-stone-300 p-3">
                    <p className="text-xs text-stone-500">SL No.</p>
                    <p className="font-mono text-base font-semibold text-[#1C1917] tabular-nums">
                      {submittedSlNo}
                    </p>
                  </div>

                  <table className="w-full text-xs border border-stone-300">
                    <tbody className="divide-y divide-stone-300">
                      <tr>
                        <td className="p-2 text-stone-600 bg-stone-50">Amount</td>
                        <td className="p-2 font-mono text-right font-medium tabular-nums">
                          {selectedTier.feeBdt} / {selectedTier.feeEur}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-stone-600 bg-stone-50">This Payment</td>
                        <td className="p-2 font-mono text-right font-medium tabular-nums">
                          {currencyView === 'EUR' ? selectedTier.feeEur : selectedTier.feeBdt}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 text-stone-600 bg-stone-50">Balance Due</td>
                        <td className="p-2 font-mono text-right tabular-nums">0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between gap-4 text-xs text-stone-500">
                <p>
                  Signed Declaration: <span className="font-serif italic text-stone-800">{form.applicantSignature}</span> ({form.applicationDate})
                </p>
                <p>The Charity reserves the right to verify this information.</p>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#FBF9F5] border border-stone-200 rounded-sm overflow-hidden"
          >
            {/* Form Step Navigation Bar */}
            <div className="bg-white border-b border-stone-200 px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {STEPS.map((step) => {
                  const active = activeStep === step.id;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStep(step.id)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#1E5631] text-white'
                          : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {step.label}
                    </button>
                  );
                })}
              </div>
              <span className="font-mono text-xs text-stone-500 tabular-nums">
                Selected: {selectedTier.label} ({selectedTier.feeEur})
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 space-y-8">
              {/* STEP 1: PART I — PERSONAL INFORMATION */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                      Part I — Personal Information
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Required applicant particulars as specified on page 8 of the EBF membership form.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Title
                      </label>
                      <select
                        value={form.titlePrefix}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            titlePrefix: e.target.value as MembershipFormState['titlePrefix'],
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Dr">Dr</option>
                        <option value="Ms">Ms</option>
                      </select>
                    </div>

                    <div className="lg:col-span-2">
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Given Names *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.givenNames}
                        onChange={(e) => setForm({ ...form, givenNames: e.target.value })}
                        placeholder="Given names"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Surname *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.surname}
                        onChange={(e) => setForm({ ...form, surname: e.target.value })}
                        placeholder="Surname"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        NID / Passport No.
                      </label>
                      <input
                        type="text"
                        value={form.nidNo}
                        onChange={(e) => setForm({ ...form, nidNo: e.target.value })}
                        placeholder="National ID"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Gender
                      </label>
                      <div className="flex items-center gap-4 h-[38px]">
                        {(['Male', 'Female'] as const).map((g) => (
                          <label key={g} className="inline-flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              checked={form.gender === g}
                              onChange={() => setForm({ ...form, gender: g })}
                              className="accent-[#1E5631]"
                            />
                            <span>{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={form.dob}
                        onChange={(e) => setForm({ ...form, dob: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Nationality
                      </label>
                      <input
                        type="text"
                        value={form.nationality}
                        onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                        placeholder="e.g. Bangladeshi / German"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Place of Birth
                      </label>
                      <input
                        type="text"
                        value={form.placeOfBirth}
                        onChange={(e) => setForm({ ...form, placeOfBirth: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Marital Status
                      </label>
                      <input
                        type="text"
                        value={form.maritalStatus}
                        onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
                        placeholder="Single / Married"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Job Title / Profession
                      </label>
                      <input
                        type="text"
                        value={form.jobTitle}
                        onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Residential Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.residentialAddress}
                        onChange={(e) => setForm({ ...form, residentialAddress: e.target.value })}
                        placeholder="Street, city, country"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={form.postalCode}
                        onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Mobile No. *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.mobileNo}
                        onChange={(e) => setForm({ ...form, mobileNo: e.target.value })}
                        placeholder="+880 / +49"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Tel No.
                      </label>
                      <input
                        type="tel"
                        value={form.telNo}
                        onChange={(e) => setForm({ ...form, telNo: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="applicant@example.org"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                  </div>

                  {/* Mail & Hardcopy Delivery Preferences (Page 8) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-stone-200 p-4 rounded-sm">
                    <div>
                      <span className="block text-xs font-medium text-stone-700 mb-2">
                        Preferred Mail Destination
                      </span>
                      <div className="flex flex-wrap gap-4">
                        {(['Correspondence', 'Office Magazine'] as const).map((pref) => (
                          <label key={pref} className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-700 cursor-pointer">
                            <input
                              type="radio"
                              name="mailPreference"
                              checked={form.mailPreference === pref}
                              onChange={() => setForm({ ...form, mailPreference: pref })}
                              className="accent-[#1E5631]"
                            />
                            <span>{pref}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-stone-700 mb-2">
                        Hardcopy Delivery (Optional)
                      </span>
                      <div className="flex flex-wrap gap-4">
                        {(['Home', 'Office'] as const).map((loc) => (
                          <label key={loc} className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-700 cursor-pointer">
                            <input
                              type="radio"
                              name="hardcopyDelivery"
                              checked={form.hardcopyDelivery === loc}
                              onChange={() => setForm({ ...form, hardcopyDelivery: loc })}
                              className="accent-[#1E5631]"
                            />
                            <span>{loc}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Membership Card Name (20-Char Box Preview) */}
                  <div className="bg-white border border-stone-200 p-5 rounded-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="text-xs font-semibold text-stone-800">
                        Name to appear on Membership Card (max 20 characters)
                      </label>
                      <span className="font-mono text-xs text-stone-500 tabular-nums">
                        {form.cardApplicantName.length} / 20
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={20}
                      value={form.cardApplicantName}
                      onChange={(e) =>
                        setForm({ ...form, cardApplicantName: e.target.value.toUpperCase() })
                      }
                      placeholder="CARDHOLDER NAME"
                      className="w-full px-3 py-2 text-sm font-mono uppercase bg-[#FBF9F5] border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                    />
                    <div
                      className="grid grid-cols-10 sm:grid-cols-[repeat(20,minmax(0,1fr))] gap-1"
                      aria-hidden="true"
                    >
                      {Array.from({ length: 20 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="h-7 border border-stone-300 bg-[#FBF9F5] flex items-center justify-center font-mono text-xs font-semibold text-[#1C1917]"
                        >
                          {form.cardApplicantName[idx] || ''}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Reason for joining The Everbright Foundation
                    </label>
                    <textarea
                      rows={2}
                      value={form.reasonForJoining}
                      onChange={(e) => setForm({ ...form, reasonForJoining: e.target.value })}
                      placeholder="Briefly state your motivation for joining EBF..."
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1E5631] hover:bg-[#143D22] rounded-md transition-colors cursor-pointer"
                    >
                      Continue to Part II &amp; III
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PART II (SPOUSE) & PART III (REFERRAL) */}
              {activeStep === 2 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                        Part II — Spouse&apos;s Particulars (If Applicable)
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        Optional family particulars for joint membership communications.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Name of Spouse
                        </label>
                        <input
                          type="text"
                          value={form.spouseName}
                          onChange={(e) => setForm({ ...form, spouseName: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Spouse Email
                        </label>
                        <input
                          type="email"
                          value={form.spouseEmail}
                          onChange={(e) => setForm({ ...form, spouseEmail: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Spouse Date of Birth
                        </label>
                        <input
                          type="date"
                          value={form.spouseDob}
                          onChange={(e) => setForm({ ...form, spouseDob: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Spouse Nationality
                        </label>
                        <input
                          type="text"
                          value={form.spouseNationality}
                          onChange={(e) => setForm({ ...form, spouseNationality: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Spouse Mobile No.
                        </label>
                        <input
                          type="tel"
                          value={form.spouseMobile}
                          onChange={(e) => setForm({ ...form, spouseMobile: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-200 space-y-4">
                    <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                      Part III — Other Information &amp; Referral
                    </h3>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-2">
                        How were you referred to us?
                      </label>
                      <div className="flex flex-wrap gap-5">
                        {(['Member Referral', 'Internet', 'Others'] as const).map((src) => (
                          <label key={src} className="inline-flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                            <input
                              type="radio"
                              name="referralSource"
                              checked={form.referralSource === src}
                              onChange={() => setForm({ ...form, referralSource: src })}
                              className="accent-[#1E5631]"
                            />
                            <span>{src}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {form.referralSource === 'Member Referral' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={form.referrerName}
                          onChange={(e) => setForm({ ...form, referrerName: e.target.value })}
                          placeholder="Referring Member Name"
                          className="px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        />
                        <input
                          type="text"
                          value={form.referrerMembershipNo}
                          onChange={(e) =>
                            setForm({ ...form, referrerMembershipNo: e.target.value })
                          }
                          placeholder="Membership No."
                          className="px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Other Charity Memberships
                      </label>
                      <input
                        type="text"
                        value={form.otherCharityMemberships}
                        onChange={(e) =>
                          setForm({ ...form, otherCharityMemberships: e.target.value })
                        }
                        placeholder="List any current charitable affiliations (optional)"
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Back to Part I
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1E5631] hover:bg-[#143D22] rounded-md transition-colors cursor-pointer"
                    >
                      Continue to Part IV &amp; Interests
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SOCIAL INTERESTS, CONSENT & DECLARATION */}
              {activeStep === 3 && (
                <div className="space-y-8">
                  {/* Social & Recreational Interests (Page 10) */}
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                        Social &amp; Recreational Interests
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        Select activities you and your family would like to receive updates about.
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-stone-600 mb-2.5">
                        Sports
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                        {RECREATIONAL_SPORTS.map((sport) => (
                          <label
                            key={sport}
                            className="inline-flex items-start gap-2 text-xs sm:text-sm text-stone-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={form.sports.includes(sport)}
                              onChange={() => toggleArrayItem('sports', sport)}
                              className="mt-0.5 accent-[#1E5631]"
                            />
                            <span>{sport}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-stone-600 mb-2.5">
                          Activities &amp; Events — Adult
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ADULT_ACTIVITIES.map((act) => (
                            <label
                              key={act}
                              className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={form.adultActivities.includes(act)}
                                onChange={() => toggleArrayItem('adultActivities', act)}
                                className="accent-[#1E5631]"
                              />
                              <span>{act}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider font-semibold text-stone-600 mb-2.5">
                          Activities &amp; Events — Children
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {CHILDREN_ACTIVITIES.map((act) => (
                            <label
                              key={act}
                              className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={form.childrenActivities.includes(act)}
                                onChange={() => toggleArrayItem('childrenActivities', act)}
                                className="accent-[#1E5631]"
                              />
                              <span>{act}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Part IV — Personal Data Consent & Declaration */}
                  <div className="pt-6 border-t border-stone-200 space-y-5">
                    <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                      Part IV — Personal Data Consent &amp; Declaration
                    </h3>

                    <div className="space-y-2 text-xs sm:text-sm text-stone-700">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.consentMailing}
                          onChange={(e) => setForm({ ...form, consentMailing: e.target.checked })}
                          className="mt-1 accent-[#1E5631]"
                        />
                        <span>Mailing Address: for Monthly Magazines &amp; Billing purposes</span>
                      </label>
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.consentMobile}
                          onChange={(e) => setForm({ ...form, consentMobile: e.target.checked })}
                          className="mt-1 accent-[#1E5631]"
                        />
                        <span>Mobile Number: for Charity messages</span>
                      </label>
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.consentEmail}
                          onChange={(e) => setForm({ ...form, consentEmail: e.target.checked })}
                          className="mt-1 accent-[#1E5631]"
                        />
                        <span>
                          Email Address: for Charity e-newsletters, notices, and event bookings
                        </span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Payment Method (for Receipt)
                        </label>
                        <select
                          value={form.paymentMethod}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              paymentMethod: e.target.value as MembershipFormState['paymentMethod'],
                            })
                          }
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        >
                          <option value="Cash">Cash</option>
                          <option value="Cheque">Cheque</option>
                          <option value="Money Order">Money Order</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Digital Signature (Full Name) *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.applicantSignature}
                          onChange={(e) =>
                            setForm({ ...form, applicantSignature: e.target.value })
                          }
                          placeholder="Type full name as signature"
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Date of Application *
                        </label>
                        <input
                          type="date"
                          required
                          value={form.applicationDate}
                          onChange={(e) =>
                            setForm({ ...form, applicationDate: e.target.value })
                          }
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:border-[#1E5631]"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-2.5 p-4 bg-white border border-stone-200 rounded-sm text-xs sm:text-sm text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={form.declarationAccepted}
                        onChange={(e) =>
                          setForm({ ...form, declarationAccepted: e.target.checked })
                        }
                        className="mt-1 accent-[#D94E28]"
                      />
                      <span>
                        I hereby confirm that the information contained in this form is true and
                        accurate, agree to abide by the Rules and Bye-Laws of The Everbright
                        Foundation, and consent to personal data processing in accordance with the
                        Personal Data Protection Act.
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Back to Part II &amp; III
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D94E28] hover:bg-[#B83D1B] rounded-md transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Generate Application &amp; Official Receipt</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
