import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATS = [
  { raw: 72257, display: '72,257', label: 'Service events audited' },
  { raw: 25690, display: '25,690', label: 'Contaminated services flagged' },
  { raw: 15000, display: '15,000', label: 'Residential customers covered' },
];

export default function WhereWeAre() {
  const sectionRef = useRef();
  const statsRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.where-eyebrow', {
        x: -24,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.where-eyebrow', start: 'top 85%', once: true },
      });

      gsap.from('.where-headline .headline-inner', {
        y: '110%',
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.where-headline', start: 'top 85%', once: true },
      });

      gsap.from('.where-body-text', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.where-body-text', start: 'top 80%', once: true },
      });

      gsap.from('.epr-block', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.epr-block', start: 'top 85%', once: true },
      });

      gsap.from('.where-stat-card', {
        opacity: 0,
        y: 8,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="where-we-are"
      ref={sectionRef}
      className="section-border"
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <div
          ref={statsRef}
          className="where-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderBottom: '1px solid var(--black)',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="where-stat-card"
              style={{
                padding: 'var(--section-pad-y-tight) var(--page-padding)',
                borderRight: i < STATS.length - 1 ? '1px solid var(--black)' : 'none',
              }}
            >
              <div
                className="stat-number"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 4vw, 60px)',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                {stat.display}
              </div>
              <p
                className="stat-label"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--caption)',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 767px) {
            .where-stats-grid {
              grid-template-columns: 1fr !important;
            }

            .where-stat-card {
              border-right: none !important;
              border-bottom: 1px solid var(--black);
            }

            .where-stat-card:last-child {
              border-bottom: none;
            }

            .where-stat-card {
              text-align: center;
            }
          }
        `}</style>

        <div>
          <div
            style={{ padding: 'var(--section-pad-y) var(--page-padding) var(--space-4)', maxWidth: 860 }}
          >
            <span className="eyebrow eyebrow--caption where-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
              Where We Are
            </span>

            <h2
              className="where-headline"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 2.8vw, 40px)',
                fontWeight: 400,
                color: 'var(--ink)',
                marginBottom: 'var(--space-3)',
                maxWidth: 440,
              }}
            >
              {['Live in Queen Creek.', 'Expanding in Tucson.'].map((line, i) => (
                <div key={i} className="headline-mask">
                  <span className="headline-inner">{line}</span>
                </div>
              ))}
            </h2>

            <div style={{ maxWidth: 560 }}>
              <p
                className="where-body-text"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  color: 'var(--ink)',
                }}
              >
                Reframe went live on Queen Creek&apos;s residential recycling program in August 2025. Inspectors no longer drive routes to run audits -- they get a daily contamination digest in their inbox, and resident notices go out automatically.
              </p>
            </div>
          </div>

          <div style={{ padding: '0 var(--page-padding) var(--section-pad-y)' }}>
            <TimelineBlock />

            <div
              className="epr-block"
              style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-4)',
                borderLeft: '3px solid var(--purple)',
                background: 'var(--gray-50)',
                maxWidth: 860,
              }}
            >
              <span
                className="eyebrow"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  textTransform: 'uppercase',
                  color: 'var(--purple)',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                EPR Funding
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 28,
                  fontWeight: 400,
                  color: 'var(--ink)',
                  marginBottom: '12px',
                  maxWidth: 520,
                }}
              >
                Deployment may be reimbursable.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: 'var(--gray-700)',
                  maxWidth: 700,
                  marginBottom: '10px',
                }}
              >
                For municipalities, EPR funding programs can reimburse the cost of deploying Reframe. We&apos;ll help you figure out if your program qualifies and how to apply.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  textTransform: 'uppercase',
                  color: 'var(--caption)',
                }}
              >
                We can help assess eligibility and next steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineBlock() {
  const items = [
    { date: 'Aug 2025', event: 'Launched in Queen Creek, AZ -- 7 units on residential program' },
    { date: 'Oct 2025', event: 'First 500 electronic notices sent to residents' },
    { date: 'Nov 2025', event: 'Presented at Maricopa Association of Governments' },
    { date: 'Early 2026', event: 'Tucson expansion underway -- 2 trucks growing to 45' },
  ];

  const timelineRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={timelineRef} style={{ maxWidth: 860 }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'var(--caption)',
          display: 'block',
          marginBottom: 'var(--space-3)',
          paddingBottom: 'var(--space-2)',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        Deployment Timeline
      </span>
      {items.map((item, i) => (
        <div
          key={i}
          className="timeline-item"
          style={{
            display: 'grid',
            gridTemplateColumns: '96px 1fr',
            gap: 'var(--space-2)',
            paddingBottom: i < items.length - 1 ? 'var(--space-3)' : 0,
            marginBottom: i < items.length - 1 ? 'var(--space-3)' : 0,
            borderBottom: i < items.length - 1 ? '1px solid var(--hairline)' : 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--purple)',
              paddingTop: 2,
            }}
          >
            {item.date}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--ink)',
            }}
          >
            {item.event}
          </span>
        </div>
      ))}
    </div>
  );
}
