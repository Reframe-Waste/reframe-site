import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TheProblem() {
  const sectionRef = useRef();
  const textRef = useRef();
  const visualRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.problem-eyebrow', {
        x: -24,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.problem-eyebrow', start: 'top 85%', once: true },
      });

      gsap.from('.problem-headline', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.problem-headline', start: 'top 85%', once: true },
      });

      gsap.from('.problem-body p', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.problem-body', start: 'top 80%', once: true },
      });

      gsap.from(visualRef.current, {
        opacity: 0,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: { trigger: visualRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="the-problem"
      ref={sectionRef}
      className="section-border"
      style={{ minHeight: 480 }}
    >
      <div
        className="two-col"
        style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}
      >
        <div
          ref={textRef}
          className="col-rule"
          style={{
            padding: 'var(--section-pad-y) var(--page-padding)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <span
            className="eyebrow eyebrow--caption problem-eyebrow"
            style={{ marginBottom: 'var(--space-3)' }}
          >
            The Problem
          </span>

          <h2
            className="problem-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 3.2vw, 46px)',
              fontWeight: 400,
              color: 'var(--ink)',
              marginBottom: 'var(--space-3)',
              maxWidth: 480,
            }}
          >
            Contamination costs you money. Right now, you can't see where it's coming from.
          </h2>

          <div className="problem-body" style={{ maxWidth: 460 }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: 'var(--ink)',
              marginBottom: 'var(--space-2)',
            }}>
              A rejected load turns recycling revenue into disposal cost. Manual audits catch a fraction of what's out there. City-wide education campaigns treat every household the same, even though a small number of addresses drive most of the contamination.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: 'var(--ink)',
            }}>
              The problem isn't awareness. It's visibility. Reframe gives you address-level data on every route, every collection day, so you can focus on the 10% that actually matters.
            </p>
          </div>
        </div>

        <div
          ref={visualRef}
          style={{
            background: 'var(--gray-50)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            minHeight: 480,
            padding: 'var(--section-pad-y-tight) var(--page-padding)',
            gap: 0,
          }}
        >
          <ContaminationDiagram />
        </div>
      </div>
    </section>
  );
}

function ContaminationDiagram() {
  const bars = [
    { label: 'of households', pct: 23, color: 'var(--ink)', textColor: 'var(--white)' },
    { label: 'of contamination-related cost', pct: 70, color: 'var(--purple)', textColor: 'var(--white)' },
  ];

  const barsRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bar-fill', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barsRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, barsRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={barsRef}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'var(--ink)',
          display: 'block',
          marginBottom: 6,
        }}>
          The Visibility Gap
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: 13,
          color: 'var(--gray-400)',
        }}>
          Residential single-stream recycling, U.S.
        </span>
      </div>
      {bars.map((bar, i) => (
        <div key={i} style={{ marginBottom: i < bars.length - 1 ? 'var(--space-3)' : 0 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            color: 'var(--caption)',
            marginBottom: 'var(--space-1)',
          }}>
            {bar.label}
          </div>
          <div style={{
            height: 40,
            background: 'var(--hairline)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div
              className="bar-fill"
              style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: `${bar.pct}%`,
                background: bar.color,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                color: bar.textColor,
              }}>
                {bar.pct}%
              </span>
            </div>
          </div>
        </div>
      ))}
      <div style={{
        marginTop: 'var(--space-10)',
        paddingTop: 'var(--space-2)',
        borderTop: '1px solid var(--hairline)',
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        textTransform: 'uppercase',
        color: 'var(--gray-400)',
      }}>
        <p>Sources:</p>
        <ul style={{
          listStylePosition: 'inside',
          marginTop: '8',
        }}>
          <li>
            <a
              href="https://recyclingpartnership.org/residential-recycling-report/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--purple)'}
              onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
            >
              The Recycling Partnership, 2024 State of Recycling Report
            </a>
          </li>
          <li>
            <a
              href="https://swana.org/docs/default-source/resources-documents/arf-documents/arf_es-reducing_contamination_curbside_recycling-final.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--purple)'}
              onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
            >
              SWANA, Reducing Contamination in Curbside Recycling Programs
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
