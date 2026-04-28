import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CTASection() {
  const sectionRef = useRef();
  const bgRef = useRef();
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', org: '', fleetSize: '', message: '' });

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

      gsap.from('.cta-form-panel', {
        opacity: 0,
        y: 24,
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
    fontSize: 'var(--text-base)',
    color: 'var(--ink)',
    border: 'none',
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    padding: 'var(--space-2) var(--space-2) var(--space-1-5)',
    background: 'var(--white)',
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
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--ink)',
    display: 'block',
    marginBottom: 'var(--space-1)',
  };

  if (submitted) {
    return (
      <section id="demo" ref={sectionRef} className="section-border" style={{ overflow: 'hidden', position: 'relative' }}>
        <div ref={bgRef} style={{ position: 'absolute', inset: 0, background: 'var(--black)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 'var(--section-pad-y) var(--page-padding)', textAlign: 'center' }}>
          <span className="eyebrow eyebrow--purple" style={{
            display: 'block',
            marginBottom: 'var(--space-3)',
          }}>
            Request Received
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 400,
            color: 'var(--white)',
            marginBottom: 'var(--space-3)',
          }}>
            We'll be in touch shortly.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--gray-400)',
            maxWidth: 480,
            margin: '0 auto var(--space-5)',
          }}>
            A member of the Reframe team will reach out within one business day to schedule your dashboard walkthrough.
          </p>
          <button
            onClick={() => { setSubmitted(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="btn btn--ghost-white"
          >
            &larr; Back to Top
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
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, background: 'var(--gray-50)', zIndex: 0 }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 640,
        margin: '0 auto',
        padding: 'var(--space-9) var(--page-padding)',
      }}>
        <div className="cta-form-panel">
          <span className="eyebrow eyebrow--purple" style={{
            display: 'block',
            marginBottom: 'var(--space-3)',
          }}>
            See What Your Routes Actually Look Like
          </span>

          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--caption)',
            display: 'block',
            marginBottom: 'var(--space-4)',
            marginTop: 'var(--space-6)',
          }}>
            Schedule a Demo
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
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

          <div style={{ marginBottom: 'var(--space-3)' }}>
            <label style={labelStyle}>Organization</label>
            <input
              className="cta-input"
              type="text"
              placeholder="City of Phoenix Public Works"
              value={form.org}
              onChange={update('org')}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-3)' }}>
            <label style={labelStyle}>Fleet Size (optional)</label>
            <input
              className="cta-input"
              type="text"
              placeholder="e.g. 24"
              value={form.fleetSize}
              onChange={update('fleetSize')}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
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
            onClick={async () => {
              if (!form.email) {
                setError('Please enter your email address.');
                return;
              }
              setError('');
              setSubmitting(true);
              try {
                const res = await fetch('https://app.reframewaste.com/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(form),
                });
                if (!res.ok) throw new Error('Request failed');
                setSubmitted(true);
              } catch {
                setError('Something went wrong. Please try again or email us at hello@reframewaste.com.');
              } finally {
                setSubmitting(false);
              }
            }}
            disabled={submitting}
            className="btn btn--dark"
            style={{ width: '100%', textAlign: 'center', fontSize: 'var(--text-md)', opacity: submitting ? 0.6 : 1 }}
          >
            {submitting ? 'Submitting...' : 'Schedule a Demo \u2192'}
          </button>

          {error && (
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--text-sm)',
              color: '#b91c1c',
              marginTop: 'var(--space-2)',
            }}>
              {error}
            </p>
          )}

          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase',
            color: 'var(--gray-700)',
            marginTop: 'var(--space-2)',
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
      `}</style>
    </section>
  );
}
