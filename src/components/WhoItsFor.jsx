import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BulletList from './BulletList.jsx';

const STATS = [
  { display: '26,315', label: 'Service addresses in QC' },
  { display: '173,464', label: 'Automated audits' },
  { display: '40,928', label: 'Contaminated services' },
  { display: '537', label: 'Notices sent' },
];

const AUDIENCES = {
  municipalities: {
    tabLabel: 'Municipalities',
    body: [
      "The Town of Queen Creek has stopped doing manual inspections.",
    ],
    bulletsLabel: 'What that means for your program',
    bullets: [
      'Offload inspection requirements',
      'Do it for free with full EPR reimbursement',
      'Mitigate rate increases with cleaner, cheaper recycling',
      'Meet your diversion goals and maximize commodity revenue',
    ],
  },
  haulers: {
    tabLabel: 'Private Haulers',
    body: [
      'Do you want to be competitive in your next bid?',
      "Other haulers are going to show up with real data, automated inspections, and targeted education that makes them a partner, not just a hauler.",
      'Reframe makes you that partner. Show your clients what their contract actually delivers.',
    ],
    bulletsLabel: 'What that means for your contract',
    bullets: [
      'Be competitive on the next RFP.',
      'Own a MRF? Reduce cost, increase yield, add to your rebates.',
      'Flag overages and set-outs with AI.',
      'Help your customers reach their sustainability goals.',
      'Offload auditing responsibilities.',
      'Get fully reimbursed in EPR states.',
    ],
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

        {/* Tabs */}
        <div
          ref={ribbonRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
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
            {active === 'municipalities' && (
              <>
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

                {/* Stats grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--space-3)',
                  marginTop: 'var(--space-3)',
                }}>
                  {STATS.map((stat, i) => (
                    <div key={i}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(24px, 2.5vw, 36px)',
                        fontWeight: 400,
                        color: 'var(--ink)',
                      }}>
                        {stat.display}
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--caption)',
                      }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {active === 'haulers' && (
              <>
                {data.body.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: i === 0 ? 'var(--text-lg)' : 'var(--text-base)',
                      fontWeight: i === 0 ? 400 : 400,
                      fontStyle: i === 0 ? 'italic' : 'normal',
                      color: 'var(--ink)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {p}
                  </p>
                ))}
              </>
            )}
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
