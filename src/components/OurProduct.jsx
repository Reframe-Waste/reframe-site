import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FEATURES = [
  {
    kicker: 'Contamination Detection',
    body: "AI-powered computer vision identifies soft plastic bags in recycling bins as they're lifted and tipped. No driver action required. No manual review of footage.",
  },
  {
    kicker: 'Route Mapping',
    body: 'Every collection run is GPS-logged and mapped automatically. Full record of what was collected, when, and where -- without relying on driver reporting.',
  },
  {
    kicker: 'The Dashboard',
    body: 'See contamination per address across your entire service area. Filter to top offenders. Export address lists and ready-to-send HTML emails for direct resident outreach.',
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
            <ProductUnitGraphic />
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
              {['A purpose-built device', 'for waste collection trucks.', 'Fully automatic.'].map((line, i) => (
                <div key={i} className="headline-mask">
                  <span className="headline-inner">{line}</span>
                </div>
              ))}
            </h2>

            <p
              className="product-subhead"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                color: 'var(--ink)',
                marginBottom: 'var(--space-3)',
                maxWidth: 440,
              }}
            >
              Mounts to your truck, runs on its own power, and starts collecting data from the first collection cycle. No integration with the truck. No app for drivers to manage.
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
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--caption)',
                display: 'block',
                marginBottom: 'var(--space-2)',
              }}>
                Self-Contained Hardware
              </span>
              <ul style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--caption)',
                listStylePosition: 'inside',
                padding: 0,
                margin: '0 0 var(--space-2)',
              }}>
                {['Solar panel', 'Onboard battery', 'Camera', 'GPS', 'Onboard computer', 'Weatherproof enclosure'].map((item) => (
                  <li key={item} style={{ padding: '3px 0' }}>{item}</li>
                ))}
              </ul>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--caption)',
              }}>
                Draws no power from the truck. Requires no changes to driver operations.
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
                  fontSize: 11,
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
                  fontSize: 15,
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

function ProductUnitGraphic() {
  return (
    <div style={{ textAlign: 'center', width: '100%', maxWidth: 300 }}>
      <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
        {/* Solar panel */}
        <rect x="40" y="20" width="200" height="50" rx="0" fill="#2a2a2a" stroke="#a78bd9" strokeWidth="1.5"/>
        <line x1="80" y1="20" x2="80" y2="70" stroke="#444" strokeWidth="1"/>
        <line x1="120" y1="20" x2="120" y2="70" stroke="#444" strokeWidth="1"/>
        <line x1="160" y1="20" x2="160" y2="70" stroke="#444" strokeWidth="1"/>
        <line x1="200" y1="20" x2="200" y2="70" stroke="#444" strokeWidth="1"/>
        <line x1="40" y1="45" x2="240" y2="45" stroke="#444" strokeWidth="1"/>
        <text x="140" y="52" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#a78bd9" textTransform="uppercase" letterSpacing="1">Solar Panel</text>

        {/* Main unit body */}
        <rect x="60" y="80" width="160" height="90" rx="0" fill="#2a2a2a" stroke="#555" strokeWidth="1.5"/>

        {/* Camera lens */}
        <circle cx="100" cy="125" r="22" fill="#1a1a1a" stroke="#666" strokeWidth="1.5"/>
        <circle cx="100" cy="125" r="14" fill="#111" stroke="#a78bd9" strokeWidth="1"/>
        <circle cx="100" cy="125" r="6" fill="#a78bd9" opacity="0.6"/>
        <circle cx="95" cy="120" r="2" fill="#fff" opacity="0.4"/>

        {/* Status LEDs */}
        <circle cx="160" cy="110" r="4" fill="#a78bd9"/>
        <circle cx="172" cy="110" r="4" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
        <circle cx="184" cy="110" r="4" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>

        {/* GPS antenna */}
        <rect x="192" y="88" width="18" height="6" fill="#333" stroke="#555" strokeWidth="1"/>
        <line x1="201" y1="82" x2="201" y2="88" stroke="#555" strokeWidth="1.5"/>

        {/* Labels */}
        <text x="155" y="135" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#555" letterSpacing="0.5">GPS + COMPUTE</text>
        <text x="155" y="148" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#555" letterSpacing="0.5">4G MODEM</text>
        <text x="155" y="161" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#555" letterSpacing="0.5">BATTERY</text>

        {/* Mount bracket */}
        <rect x="100" y="170" width="80" height="12" fill="#333" stroke="#555" strokeWidth="1"/>
        <rect x="115" y="182" width="8" height="16" fill="#333" stroke="#555" strokeWidth="1"/>
        <rect x="157" y="182" width="8" height="16" fill="#333" stroke="#555" strokeWidth="1"/>

        <text x="140" y="214" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#888" letterSpacing="1">TRUCK MOUNT</text>
      </svg>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          textTransform: 'uppercase',
          color: 'var(--gray-600)',
          display: 'block',
          marginBottom: 'var(--space-1)',
        }}>
          Reframe Unit v2
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: 12,
          color: 'var(--gray-700)',
        }}>
          Truck-mounted AI camera system
        </span>
      </div>
    </div>
  );
}
