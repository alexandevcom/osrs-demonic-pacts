import { RELICS, LEAGUE_INFO } from "../data/league";

function WikiImg({ src, alt, size = 32 }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size, flexShrink: 0, objectFit: 'contain', imageRendering: 'auto' }}
      onError={(e) => { e.target.style.opacity = "0.2"; }}
    />
  );
}

const PLACEHOLDER = LEAGUE_INFO.relicIcon;

export default function RelicBuilder({ selectedRelics, onSelect, onLock, locked }) {
  const chosenCount = Object.keys(selectedRelics).length;

  return (
    <section style={{ marginBottom: 64 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: 'var(--color-gold)', marginBottom: 6 }}>Relics</h2>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--color-border), transparent)', marginBottom: 8 }} />
        <p style={{ color: 'var(--color-text-dim)', fontSize: 13, marginBottom: 4 }}>
          Choose one relic per tier as you gain League Points.
        </p>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-text-dim)' }}>
          {chosenCount}/8 CHOSEN
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {RELICS.map((tier) => {
          const selectedId = selectedRelics[tier.tier];
          const isLockedTier = locked.relics[tier.tier] != null;

          return (
            <div key={tier.tier}>
              {/* Tier label */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700, color: 'var(--color-accent)' }}>T{tier.tier}</span>
                <span style={{ color: 'rgba(138,132,104,0.4)' }}>&middot;</span>
                <span style={{ color: 'var(--color-text-dim)', fontSize: 12 }}>{tier.unlockRequirement}</span>
                {tier.xpBonus && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                    background: 'rgba(212,146,42,0.1)', color: 'var(--color-accent)',
                    border: '1px solid rgba(212,146,42,0.2)', whiteSpace: 'nowrap',
                  }}>{tier.xpBonus}</span>
                )}
                {isLockedTier && (
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-gold-dim)' }}>LOCKED</span>
                )}
              </div>

              {/* Choices */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {tier.choices.map((relic) => {
                  const isSelected = selectedId === relic.id;
                  const isDimmed = selectedId && !isSelected;

                  return (
                    <button
                      key={relic.id}
                      onClick={() => onSelect(tier.tier, relic.id)}
                      onContextMenu={(e) => { e.preventDefault(); if (isSelected) onLock(tier.tier); }}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        gap: 12,
                        borderRadius: 8,
                        padding: 20,
                        textAlign: 'left',
                        cursor: 'pointer',
                        height: '100%',
                        opacity: isDimmed ? 0.25 : 1,
                        border: isSelected
                          ? '1px solid var(--color-selected-border)'
                          : relic.unrevealed
                            ? '1px dashed rgba(61,50,37,0.5)'
                            : '1px solid rgba(61,50,37,0.5)',
                        background: isSelected ? 'var(--color-selected-bg)' : 'var(--color-surface)',
                        boxShadow: isSelected ? '0 0 0 1px var(--color-selected-border), 0 2px 12px rgba(168,144,64,0.08)' : 'none',
                        transition: 'all 0.15s',
                      }}
                    >
                      {isSelected && (
                        <span style={{
                          position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderRadius: '50%',
                          background: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 9, fontWeight: 900, color: 'var(--color-bg)', lineHeight: 1,
                        }}>&#x2713;</span>
                      )}

                      <WikiImg
                        src={relic.image || PLACEHOLDER}
                        alt={relic.name}
                        size={32}
                      />

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{
                          fontSize: 13, fontWeight: 700, marginBottom: 4, lineHeight: 1.3,
                          color: relic.unrevealed ? 'rgba(138,132,104,0.4)' : isSelected ? 'var(--color-gold-bright)' : 'var(--color-text-bright)',
                          fontStyle: relic.unrevealed ? 'italic' : 'normal',
                        }}>{relic.name}</h4>
                        <p style={{
                          fontSize: 12, lineHeight: 1.45,
                          color: relic.unrevealed ? 'rgba(138,132,104,0.25)' : 'var(--color-text-dim)',
                          fontStyle: relic.unrevealed ? 'italic' : 'normal',
                        }}>{relic.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
