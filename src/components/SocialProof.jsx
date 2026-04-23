import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LOGO_HEIGHT = 80;

const PARTNERS = [
  {
    name: 'City of Tucson',
    kind: 'Municipality',
    logo: `${import.meta.env.BASE_URL}assets/partners/city-of-tucson.jpg`,
  },
  {
    name: 'Waste Connections',
    kind: 'Hauler',
    logo: `${import.meta.env.BASE_URL}assets/partners/waste-connections.png`,
  },
  {
    name: 'Maricopa Association of Governments',
    kind: 'Regional Body',
    logo: `${import.meta.env.BASE_URL}assets/partners/mag-vertical.png`,
  },
  {
    name: 'Town of Queen Creek, Arizona',
    kind: 'Municipality',
    logo: `${import.meta.env.BASE_URL}assets/partners/waste-connections.svg`,
  },
];

export default function SocialProof() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sp-eyebrow', {
        opacity: 0,
        x: -16,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
      });
      gsap.from('.sp-item', {
        opacity: 0,
        y: 'var(--space-1-5)',
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-border"
    >
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: 'var(--space-8) var(--page-padding)',
      }}>
        <span
          className="eyebrow eyebrow--caption sp-eyebrow"
          style={{ marginBottom: 'var(--space-4)', display: 'block', textAlign: 'center' }}
        >
          Trusted By
        </span>
        <div
          className="sp-grid"
          style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          alignItems: 'stretch',
        }}>
          {PARTNERS.map((p, i) => (
            <div
              key={i}
              className="sp-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-1-5)',
                padding: 'var(--space-4)',
                minHeight: 140,
              }}
            >
              <img
                src={p.logo}
                alt={p.name}
                style={{
                  height: LOGO_HEIGHT,
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                textTransform: 'uppercase',
                color: 'var(--gray-400)',
              }}>
                {p.kind}
              </span>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 1023px) {
            .sp-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 767px) {
            .sp-grid {
              grid-template-columns: 1fr !important;
            }

            .sp-item {
              border-left: none !important;
              border-top: 1px solid var(--hairline);
            }

            .sp-item:first-child {
              border-top: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
