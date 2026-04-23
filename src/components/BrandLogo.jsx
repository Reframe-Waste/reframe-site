export function DarkLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <img
        src={`${import.meta.env.BASE_URL}assets/reframe-logo.png`}
        alt=""
        style={{ width: 28, height: 28, borderRadius: 4, display: 'block' }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'var(--black)',
          lineHeight: 1.05,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <span>Reframe</span>
        <span>Waste</span>
      </span>
    </div>
  );
}

export function LightLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1-5)' }}>
      <img
        src={`${import.meta.env.BASE_URL}assets/reframe-logo.png`}
        alt="Reframe Waste"
        style={{ width: 32, height: 32, borderRadius: 4, display: 'block' }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'var(--white)',
          lineHeight: 1.05,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <span>Reframe</span>
        <span>Waste</span>
      </span>
    </div>
  );
}
