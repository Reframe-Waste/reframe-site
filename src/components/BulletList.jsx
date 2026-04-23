export default function BulletList({ items, font = 'ui', fontSize = 'var(--text-md)', separator = false }) {
  return (
    <>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-1-5)',
              paddingBottom: separator && !isLast ? 'var(--space-2)' : 0,
              marginBottom: isLast ? 0 : separator ? 'var(--space-2)' : 'var(--space-1)',
              borderBottom: separator && !isLast ? '1px solid var(--hairline)' : 'none',
            }}
          >
            <div style={{ width: 4, height: 4, background: 'var(--purple)', flexShrink: 0, marginTop: 7 }} />
            <span style={{
              fontFamily: font === 'body' ? 'var(--font-body)' : 'var(--font-ui)',
              fontSize,
              color: 'var(--ink)',
              lineHeight: 1.5,
            }}>
              {item}
            </span>
          </div>
        );
      })}
    </>
  );
}
