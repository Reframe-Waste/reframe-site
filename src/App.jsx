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

export default function App() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navigation onNav={scrollTo} />
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
