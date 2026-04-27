import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
            Contamination costs you up to $40,000 per year per truck and you can't stop it.
          </h2>
        </div>

        <div
          ref={visualRef}
          style={{
            background: 'var(--gray-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 480,
            padding: 'var(--section-pad-y-tight) var(--page-padding)',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/dashboard2.png`}
            alt="Reframe dashboard showing contamination data"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      </div>
    </section>
  );
}
