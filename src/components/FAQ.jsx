import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const QUESTIONS = [
  {
    q: "Does this require any changes to how our drivers operate?",
    a: "No. Your drivers don't even need to know it's there.",
  },
  {
    q: "What exactly does the AI detect right now?",
    a: "We're currently detecting bags of trash in the recycling. We will work with you to determine the most impactful contaminants to look out for.",
  },
  {
    q: "We already have cameras on our trucks. How is this different?",
    a: "Unlike existing truck cameras, Reframe's computer vision system uses high-end optics and computers to perform automated service audits in real time.",
  },
  {
    q: "Can we use this for enforcement, or just education?",
    a: "Up to you. We give you the data and the notices, letting you choose how to act on them. Resident and customer communications can be tailored to suit your intent.",
  },
  {
    q: "Does this work with SB1383 and other state mandates?",
    a: "Yes. Let us know which program you need to satisfy.",
  },
  {
    q: "How do we get started?",
    a: "Book a demo or drop us a line below!",
  },
];

export default function FAQ() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
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

        <div style={{ padding: 'var(--section-pad-y) var(--page-padding) 0' }}>
          <span className="eyebrow eyebrow--caption" style={{ marginBottom: 'var(--space-3)' }}>
            FAQ
          </span>
        </div>

        <div
          className="faq-list"
          style={{ padding: 'var(--space-5) var(--page-padding) var(--space-12)' }}
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
      style={{ borderBottom: isLast ? 'none' : '1px solid var(--hairline)' }}
    >
      <button
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          padding: 'var(--space-3) 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--purple)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--ink)'}
      >
        <span style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--text-base)',
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
            fontSize: 'var(--text-lg)',
            color: 'var(--purple)',
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
          fontSize: 'var(--text-base)',
          color: 'var(--caption)',
          paddingBottom: 'var(--space-4)',
          maxWidth: 720,
        }}>
          {a}
        </p>
      </div>
    </div>
  );
}
