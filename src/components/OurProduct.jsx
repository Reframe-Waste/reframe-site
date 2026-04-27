import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FEATURES = [
  {
    kicker: 'Contamination Detection',
    body: "Reframe's computer vision looks for contamination in each cart as it's tipped into the truck.",
  },
  {
    kicker: 'Route Mapping',
    body: 'Telematics tell you where the hotspots are - where to focus your inspectors or where to focus automatic outreach.',
  },
  {
    kicker: 'Your Dashboard',
    body: 'See performance across your entire service area, filter by date, severity, and address. Trigger notices and review trends.',
  },
];

export default function OurProduct() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-eyebrow', {
        x: -24,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.product-eyebrow', start: 'top 85%', once: true },
      });

      gsap.from('.product-headline .headline-inner', {
        y: '110%',
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.product-headline', start: 'top 85%', once: true },
      });

      gsap.from('.product-subhead', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.product-subhead', start: 'top 85%', once: true },
      });

      gsap.from('.product-hw-block', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.product-hw-block', start: 'top 85%', once: true },
      });

      gsap.from('.feature-item', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.feature-item', start: 'top 85%', once: true },
      });

      gsap.from('.product-visual', {
        opacity: 0,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.product-visual', start: 'top 75%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="section-border"
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>

        {/* ── Top: image left + text right ──────────────────────────────── */}
        <div className="two-col" style={{ minHeight: 520 }}>
          <div
            className="product-visual col-rule"
            style={{
              background: 'var(--ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 480,
              padding: 'var(--section-pad-y-tight) var(--space-6)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/product-zoomed.webp`}
              alt="Reframe unit mounted on a waste collection truck"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                position: 'absolute',
                inset: 0,
              }}
            />
          </div>

          <div style={{
            padding: 'var(--section-pad-y) var(--page-padding)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <span className="eyebrow eyebrow--caption product-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
              Our Product
            </span>

            <h2
              className="product-headline"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 2.8vw, 40px)',
                fontWeight: 400,
                color: 'var(--ink)',
                marginBottom: 'var(--space-3)',
                maxWidth: 440,
              }}
            >
              {['Purpose-built AI', 'for waste collection.'].map((line, i) => (
                <div key={i} className="headline-mask">
                  <span className="headline-inner">{line}</span>
                </div>
              ))}
            </h2>

            <p
              className="product-subhead"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--ink)',
                marginBottom: 'var(--space-3)',
                maxWidth: 440,
              }}
            >
              The Reframe computer vision system mounts to your truck with zero downtime and runs automatically in the background. Zero driver involvement.
            </p>

            <div
              className="product-hw-block"
              style={{
                padding: 'var(--space-3) 0',
                borderTop: '1px solid var(--hairline)',
                borderBottom: '1px solid var(--hairline)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--caption)',
                display: 'block',
                marginBottom: 'var(--space-2)',
              }}>
                Built for the Field
              </span>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--caption)',
              }}>
                Reframe systems have survived over 1,200 days in the field, enduring 120 degree Arizona summers, hail storms, dust storms, monsoons, tree limbs, and the harsh environment of daily life on a garbage truck.
              </p>
            </div>
          </div>
        </div>

        {/* ── Features grid ──────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid var(--black)' }}>

          <div
            className="product-features-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="feature-item"
                style={{
                  padding: 'var(--space-6) var(--page-padding)',
                  borderRight: i < FEATURES.length - 1 ? '1px solid var(--black)' : 'none',
                  borderTop: '1px solid var(--black)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--purple)',
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                }}>
                  {feature.kicker}
                </span>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--ink)',
                }}>
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .product-features-grid {
              grid-template-columns: 1fr !important;
            }

            .feature-item {
              border-right: none !important;
            }
          }
        `}</style>

      </div>
    </section>
  );
}

