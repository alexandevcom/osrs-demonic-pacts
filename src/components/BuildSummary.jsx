import { AREAS, RELICS } from "../data/league";

function WikiImg({ src, alt, size = 20 }) {
  return <img src={src} alt={alt} style={{ width: size, height: size, flexShrink: 0, objectFit: 'contain', imageRendering: 'auto' }} onError={(e) => { e.target.style.opacity = "0.2"; }} />;
}

export default function BuildSummary({ selectedAreas, selectedRelics }) {
  const chosenAreas = AREAS.filter((a) => a.locked || selectedAreas.includes(a.id));
  const chosenRelics = RELICS.filter((t) => selectedRelics[t.tier]).map((t) => {
    const relic = t.choices.find((c) => c.id === selectedRelics[t.tier]);
    return { tier: t.tier, ...relic };
  });

  if (selectedAreas.length === 0 && chosenRelics.length === 0) return null;

  const rowStyle = {
    display: 'flex', alignItems: 'center', gap: 12,
    height: 36, padding: '0 12px', borderRadius: 6,
    background: 'var(--color-surface)', border: '1px solid rgba(61,50,37,0.3)',
  };

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: 'var(--color-gold)', marginBottom: 6 }}>Your Build</h2>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--color-border), transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-text-dim)', marginBottom: 12 }}>REGIONS ({chosenAreas.length}/5)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {chosenAreas.map((a) => (
              <div key={a.id} style={rowStyle}>
                <WikiImg src={a.image} alt={a.name} />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-bright)', flex: 1 }}>{a.name}</span>
                {a.locked && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-gold-dim)' }}>START</span>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-text-dim)', marginBottom: 12 }}>RELICS ({chosenRelics.length}/8)</h3>
          {chosenRelics.length === 0 ? (
            <p style={{ color: 'rgba(138,132,104,0.3)', fontSize: 12, fontStyle: 'italic', padding: '8px 0' }}>No relics chosen yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {chosenRelics.map((r) => (
                <div key={r.id} style={rowStyle}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-accent)', width: 20, textAlign: 'center', flexShrink: 0 }}>T{r.tier}</span>
                  {r.image && <WikiImg src={r.image} alt={r.name} />}
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-bright)' }}>{r.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
