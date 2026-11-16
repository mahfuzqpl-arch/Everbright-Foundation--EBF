import { useState, FormEvent } from 'react';
import { CheckCircle2, Download, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { OFFICES } from '../data/ebfData';

export function ContactFooter() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [sent, setSent] = useState(false);

  const handleFeedbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    const subject = `Suggestion & Feedback for Everbright Foundation from ${senderName}`;
    const body = `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${suggestion}`;
    window.location.href = `mailto:mahfuz.ebf@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <footer id="contact" className="bg-[#143D22] text-stone-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact & Offices */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-stone-300 font-medium">
                06 · Contact &amp; Global Offices
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-white">
                Connect with Everbright Foundation
              </h2>
              <p className="mt-3 text-sm sm:text-base text-stone-200 max-w-xl leading-relaxed">
                Contact Person: <span className="font-semibold text-white">{OFFICES.contactPerson}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/15">
              {/* Bangladesh Core Office */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-semibold text-white">
                  {OFFICES.bangladesh.title}
                </h3>
                <p className="text-sm text-stone-200 flex items-start gap-2.5 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#F4A261] shrink-0 mt-1" />
                  <span>{OFFICES.bangladesh.address}</span>
                </p>
                <p className="text-sm text-stone-200 flex items-center gap-2.5 font-mono tabular-nums">
                  <Phone className="w-4 h-4 text-[#F4A261] shrink-0" />
                  <span>24 Hrs: {OFFICES.bangladesh.hotline}</span>
                </p>
                <p className="text-sm text-stone-200 flex items-center gap-2.5 font-mono tabular-nums">
                  <Phone className="w-4 h-4 text-[#F4A261] shrink-0" />
                  <span>Tel: {OFFICES.bangladesh.tel}</span>
                </p>
                <div className="text-sm text-stone-200 flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#F4A261] shrink-0 mt-1" />
                  <div className="space-y-1">
                    {OFFICES.bangladesh.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="block hover:text-white underline underline-offset-4"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* German Office */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-semibold text-white">
                  {OFFICES.germany.title}
                </h3>
                <p className="text-sm text-stone-200 flex items-start gap-2.5 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#F4A261] shrink-0 mt-1" />
                  <span>{OFFICES.germany.address}</span>
                </p>
                {OFFICES.germany.phones.map((phone, i) => (
                  <p
                    key={phone}
                    className="text-sm text-stone-200 flex items-center gap-2.5 font-mono tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#F4A261] shrink-0" />
                    <span>
                      {phone} ({OFFICES.germany.rawPhones[i]})
                    </span>
                  </p>
                ))}
                <div className="text-sm text-stone-200 flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F4A261] shrink-0" />
                  <a
                    href="mailto:mahfuz.ebf@gmail.com"
                    className="hover:text-white underline underline-offset-4"
                  >
                    mahfuz.ebf@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* External Channels & PDF Brochure */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-5 text-sm">
              <a
                href={OFFICES.brochurePdf}
                download="Everbright_Foundation_EBF_Brochure.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-white font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Brochure (PDF)</span>
              </a>
              <a
                href={OFFICES.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-stone-200 hover:text-white underline underline-offset-4"
              >
                <span>{OFFICES.websiteLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={OFFICES.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-stone-200 hover:text-white underline underline-offset-4"
              >
                <span>{OFFICES.facebookLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Suggestions, Opinions & Advice Form (Page 5 mandate) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/15 p-6 sm:p-8 rounded-sm">
            <h3 className="font-serif text-xl font-semibold text-white">
              Suggestions, Opinions &amp; Advice
            </h3>
            <p className="mt-2 text-sm text-stone-200 leading-relaxed">
              EBF welcomes thoughtful suggestions and community counsel to strengthen our service to
              beneficiaries.
            </p>

            {sent ? (
              <div className="mt-6 p-4 bg-white/10 border border-white/20 rounded-sm space-y-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F4A261] shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    Thank you, {senderName}. Your email draft to mahfuz.ebf@gmail.com has been prepared.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setSuggestion('');
                  }}
                  className="text-xs underline text-stone-200 hover:text-white cursor-pointer"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="fb-name" className="block text-xs font-medium text-stone-200 mb-1">
                    Your Name
                  </label>
                  <input
                    id="fb-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder:text-stone-400 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label htmlFor="fb-email" className="block text-xs font-medium text-stone-200 mb-1">
                    Email Address
                  </label>
                  <input
                    id="fb-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder:text-stone-400 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label htmlFor="fb-msg" className="block text-xs font-medium text-stone-200 mb-1">
                    Suggestion or Inquiry
                  </label>
                  <textarea
                    id="fb-msg"
                    rows={3}
                    required
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Share your advice, partnership interest, or question..."
                    className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder:text-stone-400 focus:outline-none focus:border-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#D94E28] hover:bg-[#B83D1B] rounded-md transition-colors cursor-pointer"
                >
                  Send Message to EBF
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-300">
          <p>
            Everbright Foundation (EBF) · Everbright Foundation (EBF) Germany e.V. · Since July 2003
          </p>
          <p className="font-mono tabular-nums">
            Bangladesh Reg. CHS-299 · Germany Reg. VR 30923 B
          </p>
        </div>
      </div>
    </footer>
  );
}
