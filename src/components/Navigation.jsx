import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DarkLogo } from './BrandLogo.jsx';

const NAV_ITEMS = [
  { id: 'the-problem',  label: 'The Problem' },
  { id: 'where-we-are', label: 'Where We Are' },
  { id: 'product',      label: 'Our Product' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'who-its-for',  label: "Who It's For" },
  { id: 'faq',          label: 'FAQ' },
];

export default function Navigation({ onNav, activeSection }) {
  const navRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
    });

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleNav = (id) => {
    setMenuOpen(false);
    onNav(id);
  };

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
        backdropFilter: scrolled ? 'blur(4px)' : 'none',
        borderBottom: '2px solid #000',
        transition: 'background 200ms, backdrop-filter 200ms',
      }}
    >
        <nav
          className="nav-grid"
          style={{
            display: 'grid',
            alignItems: 'center',
            padding: '12px var(--page-padding)',
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            gap: 24,
          }}
        >
        <div style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <button
            onClick={() => { handleNav('hero'); history.replaceState(null, '', window.location.pathname); }}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <DarkLogo />
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}
          className="nav-links-desktop"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} label={item.label} active={activeSection === item.id} onClick={() => handleNav(item.id)} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <button
            onClick={() => handleNav('demo')}
            className="btn btn--dark nav-demo-desktop"
            style={{ padding: '8px 20px', fontSize: 12 }}
          >
            Get a Demo
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="hamburger-btn"
            style={{
              background: 'none',
              border: '2px solid #000',
              width: 40,
              height: 40,
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <span style={{ display: 'block', width: 16, height: 2, background: '#000', transition: 'transform 200ms', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 16, height: 2, background: '#000', opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms' }} />
            <span style={{ display: 'block', width: 16, height: 2, background: '#000', transition: 'transform 200ms', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          borderTop: '1px solid #e2e8f0',
          background: '#fff',
          padding: '16px 0 24px',
        }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #e2e8f0',
                padding: '14px var(--page-padding)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#1a1a1a',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ padding: '20px var(--page-padding) 0' }}>
            <button
              onClick={() => handleNav('demo')}
              className="btn btn--dark"
              style={{ width: '100%', textAlign: 'center' }}
            >
              Get a Demo
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-grid {
          grid-template-columns: 1fr auto 1fr;
        }

        @media (max-width: 1040px) {
          .nav-grid { grid-template-columns: 1fr 1fr !important; }
          .nav-links-desktop { display: none !important; }
          .nav-demo-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function NavLink({ label, onClick, active }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        fontFamily: 'var(--font-ui)',
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        color: active || hovered ? '#553d97' : '#1a1a1a',
        padding: '12px 10px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'color 120ms',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}
