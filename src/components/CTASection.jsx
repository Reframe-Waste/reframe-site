import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CTASection() {
  const sectionRef = useRef();
  const bgRef = useRef();
  const contentRef = useRef();
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', org: '', fleet: '', message: '' });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bgRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });

      gsap.from('.cta-content > *', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });

      gsap.from('.cta-form-panel', {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputStyle = {
    fontFamily: 'var(--font-ui)',
    fontSize: 15,
    color: '#1a1a1a',
    border: 'none',
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    padding: '14px 16px 12px',
    background: '#fff',
    width: '100%',
    outline: 'none',
    display: 'block',
    boxShadow: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    transition: 'border-bottom-color 120ms ease',
  };

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#1a1a1a',
    display: 'block',
    marginBottom: 8,
  };

  if (submitted) {
    return (
      <section id="demo" ref={sectionRef} style={{ borderBottom: '2px solid #000', overflow: 'hidden', position: 'relative' }}>
        <div ref={bgRef} style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '96px var(--page-padding)', textAlign: 'center' }}>
          <span className="eyebrow" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            textTransform: 'uppercase',
            color: '#a78bd9',
            display: 'block',
            marginBottom: 24,
          }}>
            Request Received
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 52,
            fontWeight: 400,
            color: '#fff',
            marginBottom: 24,
          }}>
            We'll be in touch shortly.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            color: '#999',
            maxWidth: 480,
            margin: '0 auto 40px',
          }}>
            A member of the Reframe team will reach out within one business day to schedule your dashboard walkthrough.
          </p>
          <button
            onClick={() => { setSubmitted(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="btn btn--ghost-white"
          >
            ← Back to Top
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="section-border"
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, background: 'var(--white)', zIndex: 0 }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        minHeight: 640,
      }}
        className="cta-grid"
      >
        {/* Info panel */}
        <div
          className="cta-content"
          style={{
            padding: '72px var(--page-padding)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--white)',
            borderRight: '1px solid var(--black)',
          }}
        >
          <div>
            <span className="eyebrow" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              color: 'var(--purple)',
              display: 'block',
              marginBottom: 24,
            }}>
              See What Your Routes Actually Look Like
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 3vw, 48px)',
              fontWeight: 400,
              marginBottom: 24,
              maxWidth: 440,
            }}>
              We'll show you the actual product dashboard with real collection data.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: 'var(--caption)',
              marginBottom: 0,
              maxWidth: 420,
              paddingBottom: 48,
            }}>
              No pitch deck. Just the product. From there, we'll talk about what a pilot looks like for your program.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--gray-400)', paddingTop: 32 }}>
            {[
              'Live dashboard walkthrough with real data, not a demo environment',
              'Address-level contamination map from current deployments',
              'Discussion of pilot scope: timeline, fleet size, and pricing',
              'Most pilots launch within weeks of a signed agreement',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: i < 3 ? 14 : 0 }}>
                <div style={{ width: 5, height: 5, background: 'var(--purple)', flexShrink: 0, marginTop: 6 }} />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>
                  {item}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Form panel */}
        <div
          ref={formRef}
          className="cta-form-panel"
          style={{
            padding: '72px var(--page-padding)',
            background: 'var(--gray-50)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#757575',
            display: 'block',
            marginBottom: 32,
          }}>
            Schedule a Demo
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                className="cta-input"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={update('name')}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Work Email</label>
              <input
                className="cta-input"
                type="email"
                placeholder="jane@city.gov"
                value={form.email}
                onChange={update('email')}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Organisation</label>
            <input
              className="cta-input"
              type="text"
              placeholder="City of Phoenix Public Works"
              value={form.org}
              onChange={update('org')}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Fleet Size (vehicles)</label>
            <input
              className="cta-input"
              type="text"
              placeholder="e.g. 24"
              value={form.fleet}
              onChange={update('fleet')}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Anything else?</label>
            <textarea
              className="cta-input cta-input--textarea"
              rows={3}
              placeholder="Tell us about your contamination challenges..."
              value={form.message}
              onChange={update('message')}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="btn btn--dark"
            style={{ width: '100%', textAlign: 'center', fontSize: 14 }}
          >
            Schedule a Demo →
          </button>

          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 10,
            textTransform: 'uppercase',
            color: 'var(--gray-700)',
            marginTop: 16,
          }}>
            We respond within one business day. No commitment required.
          </p>
        </div>
      </div>

      <style>{`
        .cta-input {
          border-top: 0 !important;
          border-right: 0 !important;
          border-left: 0 !important;
          border-bottom: 2px solid transparent !important;
          box-shadow: none !important;
          outline: none !important;
        }

        .cta-input::placeholder {
          color: var(--caption);
        }

        .cta-input:focus,
        .cta-input:focus-visible {
          border-top: 0 !important;
          border-right: 0 !important;
          border-left: 0 !important;
          border-bottom: 2px solid var(--purple) !important;
          box-shadow: none !important;
          outline: none !important;
        }

        .cta-input--textarea {
          min-height: 124px;
        }

        @media (max-width: 767px) {
          .cta-grid { grid-template-columns: 1fr !important; }
          .cta-content {
            border-right: none !important;
            border-bottom: 1px solid var(--black);
          }
        }
      `}</style>
    </section>
  );
}
