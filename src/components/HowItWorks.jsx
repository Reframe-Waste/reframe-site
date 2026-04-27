import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = [
  {
    num: '01',
    head: 'Install.',
    body: "Our team will install the Reframe system on your trucks. No downtime, no integration, nothing in the cab.",
  },
  {
    num: '02',
    head: 'Drive.',
    body: 'Drive your routes as usual.',
  },
  {
    num: '03',
    head: 'Educate.',
    body: "Reframe automatically generates resident notices for contamination. You choose how to respond. Let us know if you also need overages, set-outs, participation or other service monitoring.",
  },
];

export default function HowItWorks({ onNav }) {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
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
                gridTemplateColumns: '120px minmax(0, 1fr)',
                columnGap: 'var(--space-4)',
                rowGap: 'var(--space-1-5)',
                alignItems: 'start',
              }}
            >
              <div
                className="step-num"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
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
                    fontSize: 'var(--text-base)',
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
                    fontSize: 'var(--text-md)',
                    color: 'var(--ink)',
                    marginBottom: 0,
                    maxWidth: 520,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 767px) {
            .step-card {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
