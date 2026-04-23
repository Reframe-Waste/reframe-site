import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero({ onNav }) {
  const containerRef = useRef();
  const eyebrowRef = useRef();
  const subRef = useRef();
  const supportRef = useRef();
  const ctasRef = useRef();
  const visualRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(eyebrowRef.current, { y: 16, opacity: 0, duration: 0.7 }, 0.2)
        .from('.hero-headline', {
          y: 24,
          opacity: 0,
          duration: 1.0,
          ease: 'power4.out',
        }, 0.35)
        .from(subRef.current, { y: 16, opacity: 0, duration: 0.8 }, 0.85)
        .from(supportRef.current, { y: 12, opacity: 0, duration: 0.7 }, 1.0)
        .from(ctasRef.current.children, { y: 12, opacity: 0, duration: 0.6, stagger: 0.1 }, 1.1)
        .from(visualRef.current, { opacity: 0, duration: 1.0 }, 1.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="section-border"
      style={{
        paddingTop: 'var(--space-15)',
        paddingBottom: 'var(--space-9)',
        paddingLeft: 'var(--page-padding)',
        paddingRight: 'var(--page-padding)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <span
        ref={eyebrowRef}
        className="eyebrow eyebrow--purple"
        style={{ marginBottom: 'var(--space-3)', letterSpacing: '1.4px' }}
      >
        Waste Intelligence Platform
      </span>

      <h1
        className="hero-headline"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(44px, 6vw, 76px)',
          fontWeight: 400,
          color: 'var(--ink)',
          maxWidth: 900,
          marginBottom: 'var(--space-4)',
        }}
      >
        See what's in every bin on every route. Automatically.
      </h1>

      <p
        ref={subRef}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          color: 'var(--ink)',
          maxWidth: 600,
          marginBottom: 'var(--space-5)',
        }}
      >
        Reframe mounts AI cameras on your collection trucks, identifies contamination, maps every route, and shows you which addresses need attention. No driver input. No manual audits.
      </p>

      <div
        ref={ctasRef}
        style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', justifyContent: 'center' }}
      >
        <button onClick={() => onNav('demo')} className="btn btn--dark">
          Get a Demo
        </button>
      </div>

      <div
        ref={visualRef}
        style={{
          marginTop: 'var(--space-8)',
          width: '100%',
          maxWidth: 920,
          aspectRatio: '16/7',
          border: '1px solid var(--hairline)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/dashboard.webp`}
          alt="Reframe dashboard showing contamination map across service area"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
          }}
          onError={(e) => {
            e.currentTarget.parentElement.style.background = 'var(--hairline)';
            e.currentTarget.style.display = 'none';
            const label = document.createElement('div');
            label.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px';
            label.innerHTML = `<span style="font-family:'JetBrains Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:var(--gray-400)">Dashboard Screenshot</span><span style="font-family:'Lora',serif;font-size:13px;color:var(--gray-200);font-style:italic">Live contamination map, address-level view</span>`;
            e.currentTarget.parentElement.appendChild(label);
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid var(--hairline)',
          background: 'rgba(255,255,255,0.9)',
          padding: 'var(--space-1) var(--space-2)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase',
            color: 'var(--caption)',
          }}>
            Queen Creek, AZ · Live Dashboard · 15,000 Residential Customers
          </span>
        </div>
      </div>
    </section>
  );
}
