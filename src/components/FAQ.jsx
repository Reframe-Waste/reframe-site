import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const QUESTIONS = [
  {
    q: "Does this require any changes to how our drivers operate?",
    a: "No. Our product is fully touchless. It mounts on the truck, runs on its own solar-charged battery, and captures data automatically throughout the collection run. Drivers don't interact with it, don't manage an app, and don't need any training beyond knowing it's there.",
  },
  {
    q: "What exactly does the AI detect right now?",
    a: "The current deployed model detects soft plastic bags in recycling bins. That's one of the most common contaminants and a major source of sorting machinery jams. We're building additional models for food waste, yard waste, and non-recyclables. We'll always tell you exactly what it can and can't detect.",
  },
  {
    q: "We already have dashcams on our trucks. How is this different?",
    a: "Fleet dashcams capture footage. Reframe captures, analyzes, and acts on it. A dashcam gives you video you'd have to manually review when something goes wrong. Our product gives you automatic contamination flagging, GPS-verified route maps, per-address data, and built-in resident outreach tools -- without anyone watching footage. It's purpose-built for waste collection, not adapted from a generic fleet telematics product.",
  },
  {
    q: "Can we use this for enforcement, or just education?",
    a: "Today the system is best suited for targeted resident education. Done at the address level, that's significantly more effective than city-wide campaigns. We're actively developing bin-level identification to make the data precise enough for formal enforcement. We'll be upfront about what the system supports at each stage.",
  },
  {
    q: "Does this work with SB1383 and other state mandates?",
    a: "Yes. Reframe provides the kind of automated contamination monitoring and documentation that SB1383 and similar state programs require. If you're working toward compliance, we can show you how the dashboard maps to your reporting needs.",
  },
  {
    q: "How do we get started?",
    a: "We'll start with a 20-minute walkthrough of the dashboard using live data from current deployments. From there, we'll discuss what a pilot looks like for your fleet: timeline, scope, and pricing. Most pilots launch within weeks of a signed agreement.",
  },
];

export default function FAQ() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-headline .headline-inner', {
        y: '110%',
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.faq-headline', start: 'top 85%', once: true },
      });

      gsap.from('.faq-item', {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.faq-list', start: 'top 80%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section-border"
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>

        <div style={{ padding: '96px var(--page-padding) 0' }}>
          <span className="eyebrow eyebrow--caption" style={{ marginBottom: 20 }}>
            FAQ
          </span>
          <h2
            className="faq-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 3.2vw, 48px)',
              fontWeight: 400,
              color: '#1a1a1a',
              maxWidth: 560,
            }}
          >
            {['Everything you need', 'to know.'].map((line, i) => (
              <div key={i} className="headline-mask">
                <span className="headline-inner">{line}</span>
              </div>
            ))}
          </h2>
        </div>

        <div
          className="faq-list"
          style={{ padding: '40px var(--page-padding) 96px' }}
        >
          {QUESTIONS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} isLast={i === QUESTIONS.length - 1} />
          ))}
        </div>

      </div>
    </section>
  );
}

function FAQItem({ q, a, isLast }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef();
  const arrowRef = useRef();

  const toggle = () => {
    const panel = panelRef.current;
    if (!panel) return;

    if (!open) {
      gsap.set(panel, { height: 0, overflow: 'hidden' });
      gsap.to(panel, {
        height: panel.scrollHeight,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => gsap.set(panel, { height: 'auto', overflow: 'visible' }),
      });
      gsap.to(arrowRef.current, { rotation: 45, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.set(panel, { overflow: 'hidden' });
      gsap.to(panel, { height: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(arrowRef.current, { rotation: 0, duration: 0.3, ease: 'power2.in' });
    }

    setOpen(!open);
  };

  return (
    <div
      className="faq-item"
      style={{ borderBottom: isLast ? 'none' : '1px solid #e2e8f0' }}
    >
      <button
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          padding: '24px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#553d97'}
        onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}
      >
        <span style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 16,
          fontWeight: 700,
          color: 'inherit',
          transition: 'color 120ms',
        }}>
          {q}
        </span>
        <span
          ref={arrowRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 20,
            color: '#553d97',
            flexShrink: 0,
            display: 'block',
            transformOrigin: 'center',
          }}
        >
          +
        </span>
      </button>

      <div
        ref={panelRef}
        style={{ height: 0, overflow: 'hidden' }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          color: '#757575',
          paddingBottom: 28,
          maxWidth: 720,
        }}>
          {a}
        </p>
      </div>
    </div>
  );
}
