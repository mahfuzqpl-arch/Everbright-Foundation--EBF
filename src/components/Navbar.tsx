import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenMembership: () => void;
}

const NAV_LINKS = [
  { label: 'Mission', href: '#mission' },
  { label: 'Programs', href: '#programs' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenMembership }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200/80">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Title */}
        <a
          href="#top"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E5631] rounded"
        >
          <img
            src="/assets/ebf/ebf_logo.png"
            alt="Everbright Foundation emblem"
            className="h-8 w-auto object-contain rounded-[2px]"
            referrerPolicy="no-referrer"
          />
          <span className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0">
            Everbright Foundation
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#1E5631] transition-colors duration-150 underline-offset-4 hover:underline whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E5631] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenMembership}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#D94E28] hover:bg-[#B83D1B] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D94E28]"
          >
            Apply for Membership
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FBF9F5] px-5 py-4 space-y-2">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2.5 text-sm font-medium text-stone-700 hover:text-[#1E5631] hover:bg-stone-100 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-stone-200">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenMembership();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#D94E28] hover:bg-[#B83D1B] rounded-md transition-colors cursor-pointer"
            >
              Apply for Membership
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
