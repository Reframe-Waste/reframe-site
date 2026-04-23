import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BulletList from './BulletList.jsx';

const AUDIENCES = {
  municipalities: {
    tabLabel: 'For Municipalities',
    eyebrow: 'For Municipalities',
    headline: 'See every route, every household, every collection day.',
    body: [
      "In Queen Creek, we've audited 14,497 residential customers and identified over 25,000 contaminated services. The town's inspectors get a daily contamination digest instead of driving routes themselves. 537 automated notices have gone out to residents. That outreach didn't exist before because the data didn't exist.",
    ],
    bulletsLabel: 'What that means for your program',
    bullets: [
      'Meet diversion targets with address-level data instead of estimates',
      'Comply with state mandates like SB1383 with automated contamination documentation',
      'Access EPR funding that can offset the full cost of deploying Reframe',
      'Defend your recycling program to council with real data behind every recommendation',
      'Replace manual inspections with automated daily reporting',
    ],
    quote: "Your trucks don't change. Your drivers don't change. You see everything you couldn't see before.",
    quoteAccent: 'var(--purple)',
  },
  haulers: {
    tabLabel: 'For Private Haulers',
    eyebrow: 'For Private Haulers',
    headline: 'Show your municipal clients what their contract actually delivers.',
    body: [
      'When you\'re bidding on a municipal contract, "we have cameras on our trucks" is table stakes. Contamination data, route verification, and resident outreach as part of your service is a competitive advantage.',
      "Reframe is live on Waste Connections trucks in Queen Creek right now. We've replaced their manual audit obligation with automatic documentation that satisfies the city's requirements.",
    ],
    bulletsLabel: 'What that means for your contract',
    bullets: [
      'Replace time-intensive manual audits with automatic, defensible documentation',
      'Identify overages and non-conforming material with a clear data trail',
      'Demonstrate service quality to municipal clients without relying on driver self-reporting',
      'Use contamination data to support contract renegotiation or overage billing',
      'Resolve missed collection disputes with GPS-verified route data from every run',
    ],
    quote: 'Live on Waste Connections trucks in Queen Creek. Manual audit obligation replaced with automatic documentation.',
    quoteAccent: 'var(--black)',
  },
};

export default function WhoItsFor() {
  const sectionRef = useRef();
  const ribbonRef = useRef();
  const panelRef = useRef();
  const [active, setActive] = useState('municipalities');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ribbonRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: ribbonRef.current, start: 'top 90%', once: true },
      });

      gsap.from('.wif-headline .headline-inner', {
        y: '110%',
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.wif-headline', start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.audience-panel > *',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
      );
    }, panelRef);
    return () => ctx.revert();
  }, [active]);

  const data = AUDIENCES[active];

  return (
    <section
      id="who-its-for"
      ref={sectionRef}
      className="section-border"
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ padding: 'var(--section-pad-y) var(--page-padding) 0' }}>
          <span className="eyebrow eyebrow--caption" style={{ marginBottom: 'var(--space-3)' }}>
            Who It's For
          </span>
          <h2
            className="wif-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 3.2vw, 48px)',
              fontWeight: 400,
              color: 'var(--ink)',
              maxWidth: 560,
              marginBottom: 0,
            }}
          >
            {['Built for municipalities', 'and haulers.'].map((line, i) => (
              <div key={i} className="headline-mask">
                <span className="headline-inner">{line}</span>
              </div>
            ))}
          </h2>
        </div>

        {/* Tabs */}
        <div
          ref={ribbonRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            marginTop: 'var(--space-5)',
          }}
        >
          {Object.entries(AUDIENCES).map(([key, cfg], i) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                style={{
                  background: isActive ? 'var(--white)' : 'var(--gray-100)',
                  color: isActive ? 'var(--ink)' : 'var(--caption)',
                  border: 'none',
                  borderRight: i === 0 ? '1px solid var(--black)' : 'none',
                  borderBottom: isActive ? '1px solid var(--white)' : '1px solid var(--black)',
                  borderTop: isActive ? '1px solid var(--black)' : 'none',
                  padding: 'var(--space-3) var(--page-padding)',
                  marginBottom: isActive ? -1 : 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 150ms, color 150ms',
                }}
              >
                {cfg.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <div
          ref={panelRef}
          className="audience-panel"
          style={{
            padding: 'var(--space-8) var(--page-padding) var(--space-12)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-6)',
          }}
          key={active}
        >
          {/* Left: narrative */}
          <div>
            <span className="eyebrow eyebrow--purple" style={{ marginBottom: 'var(--space-2)' }}>
              {data.eyebrow}
            </span>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 2vw, 28px)',
              fontWeight: 400,
              color: 'var(--ink)',
              marginBottom: 'var(--space-2)',
              maxWidth: 440,
            }}>
              {data.headline}
            </h3>
            {data.body.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--ink)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {p}
              </p>
            ))}

            <div
              style={{
                background: 'var(--gray-50)',
                padding: 'var(--space-3)',
                borderLeft: `3px solid ${data.quoteAccent}`,
                marginTop: 'var(--space-1-5)',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: 'var(--text-base)',
                color: 'var(--caption)',
              }}>
                {data.quote}
              </p>
            </div>
          </div>

          {/* Right: bullets */}
          <div>
            <span className="eyebrow eyebrow--caption" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>
              {data.bulletsLabel}
            </span>
            <BulletList items={data.bullets} font="body" fontSize="var(--text-base)" separator />
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .audience-panel {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
          }
        `}</style>

      </div>
    </section>
  );
}
