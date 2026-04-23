import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BulletList from './BulletList.jsx';

const STEPS = [
  {
    num: '01',
    head: 'Install.',
    body: "Our product mounts on your truck in under an hour. No electrical connection to the vehicle. No driver training. Collection operations don't change.",
    detail: ['Under 1 hour per truck', 'No vehicle modifications', 'Zero driver training'],
  },
  {
    num: '02',
    head: 'Collect.',
    body: 'As your driver runs their normal route, our product records every bin lift. The camera captures footage. GPS logs the location. The AI flags contamination automatically.',
    detail: ['Every bin lift recorded', 'Address-accurate GPS', 'Runs fully automatically'],
  },
  {
    num: '03',
    head: 'Analyze.',
    body: 'Data syncs to the Reframe dashboard after each route. You see a map of your service area with contamination incidents per address, ranked by frequency and severity.',
    detail: ['Data live within hours', 'Filter by route, date, severity', 'Ranked offender lists'],
  },
  {
    num: '04',
    head: 'Educate.',
    body: 'Export a targeted address list. Send personalized outreach to residents. No mail merge. No design work. Track results at the next collection cycle.',
    detail: ['Export address lists', 'Built-in email templates', 'Track improvement over time'],
  },
];

export default function HowItWorks({ onNav }) {
  const sectionRef = useRef();
  const ribbonRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ribbonRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: ribbonRef.current, start: 'top 90%', once: true },
      });

      gsap.from('.hiw-headline .headline-inner', {
        y: '110%',
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.hiw-headline', start: 'top 85%', once: true },
      });

      gsap.from('.step-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.steps-grid', start: 'top 80%', once: true },
      });

      gsap.from('.step-num', {
        opacity: 0,
        x: -16,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.steps-grid', start: 'top 80%', once: true },
      });

      gsap.from('.hiw-cta', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.hiw-cta', start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section-border"
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <div style={{ padding: 'var(--space-14) var(--page-padding) var(--space-6)' }}>
          <span className="eyebrow eyebrow--caption" style={{ marginBottom: 'var(--space-3)' }}>
            How It Works
          </span>
          <h2
            className="hiw-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 3.2vw, 48px)',
              fontWeight: 400,
              color: 'var(--ink)',
              maxWidth: 560,
            }}
          >
            {['Four steps from', 'installation to action.'].map((line, i) => (
              <div key={i} className="headline-mask">
                <span className="headline-inner">{line}</span>
              </div>
            ))}
          </h2>
        </div>

        <div ref={ribbonRef} className="ribbon">
          <span className="ribbon__label">Four Steps · No Disruption to Operations</span>
          <div className="ribbon__rule" />
        </div>

        <div
          className="steps-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            rowGap: 4,
            paddingTop: 'var(--space-7)',
            paddingBottom: 'var(--space-7)',
          }}
        >
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="step-card"
              style={{
                padding: 'var(--space-3) var(--page-padding)',
                borderTop: 'none',
                display: 'grid',
                gridTemplateColumns: '120px minmax(0, 1.3fr) minmax(240px, 0.9fr)',
                columnGap: 'var(--space-4)',
                rowGap: 'var(--space-1-5)',
                alignItems: 'start',
              }}
            >
              <div
                className="step-num"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 64,
                  fontWeight: 400,
                  color: 'var(--hairline)',
                  lineHeight: 1,
                }}
              >
                {step.num}
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    marginBottom: 'var(--space-1-5)',
                  }}
                >
                  {step.head}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'var(--ink)',
                    marginBottom: 0,
                    maxWidth: 520,
                  }}
                >
                  {step.body}
                </p>
              </div>

              <div
                className="step-detail"
                style={{
                  borderLeft: '1px solid var(--hairline)',
                  paddingLeft: 'var(--space-3)',
                  paddingTop: 'var(--space-1)',
                }}
              >
                <BulletList items={step.detail} font="ui" fontSize={13} />
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 1023px) {
            .step-card {
              grid-template-columns: 88px minmax(0, 1fr) !important;
            }

            .step-detail {
              grid-column: 2;
              border-left: none !important;
              border-top: 1px solid var(--hairline);
              padding-left: 0 !important;
              padding-top: 16px;
              margin-top: 8px;
            }
          }

          @media (max-width: 767px) {
            .step-card {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }

            .step-detail {
              grid-column: auto;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
