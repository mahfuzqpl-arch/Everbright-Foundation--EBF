import { useEffect, useState } from 'react';
import { AboutGovernanceSection } from './components/AboutGovernanceSection';
import { ContactFooter } from './components/ContactFooter';
import { DocumentLightbox } from './components/DocumentLightbox';
import { HeroSection } from './components/HeroSection';
import { InitiativesAndNetworksSection } from './components/InitiativesAndNetworksSection';
import { LeadershipSection } from './components/LeadershipSection';
import { MembershipPortal } from './components/MembershipPortal';
import { Navbar } from './components/Navbar';
import { ProgramsSection } from './components/ProgramsSection';
import { ArchiveDocument } from './data/ebfData';

export default function App() {
  const [selectedDoc, setSelectedDoc] = useState<ArchiveDocument | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic canonical & og:url resolution for SPA deployment environments
  useEffect(() => {
    const currentUrl = window.location.origin + window.location.pathname;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = currentUrl;
  }, []);

  // Subtle editorial reading depth progress bar
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / docHeight)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToMembership = () => {
    const el = document.getElementById('membership');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* Thin editorial reading depth bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
      >
        <div
          className="h-full bg-[#1E5631] origin-left transition-transform duration-75"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <Navbar onOpenMembership={scrollToMembership} />

      <main className="flex-1">
        <HeroSection onOpenMembership={scrollToMembership} />
        <AboutGovernanceSection onSelectDocument={setSelectedDoc} />
        <ProgramsSection />
        <LeadershipSection />
        <InitiativesAndNetworksSection />
        <MembershipPortal />
      </main>

      <ContactFooter />

      <DocumentLightbox
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
