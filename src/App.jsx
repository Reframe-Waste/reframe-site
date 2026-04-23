import { useEffect, useState } from 'react';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import SocialProof from './components/SocialProof.jsx';
import TheProblem from './components/TheProblem.jsx';
import WhereWeAre from './components/WhereWeAre.jsx';
import OurProduct from './components/OurProduct.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import WhoItsFor from './components/WhoItsFor.jsx';
import FAQ from './components/FAQ.jsx';
import CTASection from './components/CTASection.jsx';
import Footer from './components/Footer.jsx';

const ALL_SECTIONS = ['hero', 'the-problem', 'where-we-are', 'product', 'how-it-works', 'who-its-for', 'faq', 'demo'];

function getActiveSection() {
  const threshold = window.scrollY + window.innerHeight * 0.35;
  for (let i = ALL_SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(ALL_SECTIONS[i]);
    if (el && el.offsetTop <= threshold) return ALL_SECTIONS[i];
  }
  return 'hero';
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Deep link on load
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }

    const onScroll = () => {
      const section = getActiveSection();
      setActiveSection(section);
      history.replaceState(null, '', `#${section}`);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navigation onNav={scrollTo} activeSection={activeSection} />
      <main>
        <Hero onNav={scrollTo} />
        <SocialProof />
        <TheProblem />
        <WhereWeAre />
        <OurProduct />
        <HowItWorks onNav={scrollTo} />
        <WhoItsFor />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
