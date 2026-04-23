import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightLogo } from './BrandLogo.jsx';

const COLS = [
  {
    head: 'Product',
    links: [
      { label: 'How It Works', id: 'how-it-works' },
      { label: 'Our Product', id: 'product' },
      { label: 'Dashboard', id: 'demo' },
    ],
  },
  {
    head: 'Company',
    links: [
      { label: 'Who We Are', id: 'where-we-are' },
      { label: 'Contact', href: 'mailto:hello@reframewaste.com' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-logo-row', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
      });
      gsap.from('.footer-col', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%', once: true },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer ref={footerRef} style={{ background: 'var(--ink)', color: 'var(--white)' }}>

      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: 'var(--space-6) var(--page-padding) var(--space-4)',
      }}>
        {/* Logo + tagline */}
        <div
          className="footer-logo-row"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-5)',
            borderBottom: '1px solid var(--gray-750)',
          }}
        >
          <LightLogo />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'var(--gray-300)',
            fontStyle: 'italic',
          }}>
            AI-powered contamination detection for waste collection fleets
          </span>
        </div>

        {/* Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
          maxWidth: 480,
        }}>
          {COLS.map((col) => (
            <div key={col.head} className="footer-col">
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--white)',
                marginBottom: 'var(--space-2)',
              }}>
                {col.head}
              </div>
              {col.links.map((link) => (
                <FooterLink
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  id={link.id}
                  onNav={scrollTo}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--gray-750)',
          paddingTop: 'var(--space-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--gray-300)',
            textTransform: 'uppercase',
          }}>
            © 2026 Reframe Technologies Inc. All rights reserved.
          </span>
          <a
            href="mailto:hello@reframewaste.com"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--gray-200)',
              textDecoration: 'underline',
              textTransform: 'uppercase',
              transition: 'color 120ms',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--purple-bright)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-200)'}
          >
            hello@reframewaste.com
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label, href, id, onNav }) {
  const [hovered, setHovered] = useState(false);

  if (href) {
    return (
      <a
        href={href}
        style={{
          display: 'block',
          fontFamily: 'var(--font-ui)',
          fontSize: 13,
          color: hovered ? 'var(--purple-bright)' : 'var(--gray-400)',
          textDecoration: 'none',
          marginBottom: 'var(--space-1)',
          transition: 'color 120ms',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={() => onNav(id)}
      style={{
        display: 'block',
        background: 'none',
        border: 'none',
        fontFamily: 'var(--font-ui)',
        fontSize: 13,
        color: hovered ? 'var(--purple-bright)' : 'var(--gray-400)',
        textDecoration: 'none',
        marginBottom: 'var(--space-1)',
        transition: 'color 120ms',
        cursor: 'pointer',
        padding: 0,
        textAlign: 'left',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </button>
  );
}
