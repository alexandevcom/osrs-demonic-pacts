import { useState } from "react";
import { AREAS, MAX_AREA_PICKS } from "../data/league";
import { AREA_DETAILS } from "../data/areaDetails";

function WikiImg({ src, alt, size = 20 }) {
  return (
    <img src={src} alt={alt}
      style={{ width: size, height: size, objectFit: 'contain', imageRendering: 'auto' }}
      onError={(e) => { e.target.style.opacity = "0.3"; }}
    />
  );
}

// Badge center positions as % of CROPPED map image (664x328)
const BADGE_POS = {
  kourend:    { x: 27.1, y: 31.0 },
  fremennik:  { x: 51.2, y: 28.1 },
  wilderness: { x: 66.7, y: 24.6 },
  asgarnia:   { x: 59.5, y: 39.3 },
  tirannwn:   { x: 42.0, y: 49.5 },
  kandarin:   { x: 49.6, y: 48.3 },
  misthalin:  { x: 68.1, y: 42.7 },
  morytania:  { x: 75.3, y: 43.5 },
  karamja:    { x: 57.3, y: 62.2 },
  desert:     { x: 69.6, y: 64.0 },
  varlamore:  { x: 27.3, y: 57.1 },
};

const HIT = { w: 9, h: 16 }; // % of image

function DetailTag({ children, color = 'var(--color-text-dim)' }) {
  return (
    <span style={{
      fontSize: 11, padding: '2px 7px', borderRadius: 3, lineHeight: 1.3,
      border: '1px solid rgba(61,50,37,0.5)', color, background: 'rgba(0,0,0,0.2)',
    }}>{children}</span>
  );
}

function Section({ title, items, color }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h5 style={{ fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700, color: 'var(--color-gold-dim)', letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase' }}>{title}</h5>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {items.map((item) => <DetailTag key={item} color={color}>{item}</DetailTag>)}
      </div>
    </div>
  );
}

export default function RegionMap({ selectedAreas, onToggle, onLock, locked }) {
  const [hovered, setHovered] = useState(null);
  const [detailArea, setDetailArea] = useState(null);
  const remaining = MAX_AREA_PICKS - selectedAreas.length;
  const lockedIds = AREAS.filter((a) => a.locked).map((a) => a.id);
  const totalAreas = lockedIds.length + selectedAreas.length;
  const progressPct = (totalAreas / 5) * 100;

  function handleBadgeClick(id) {
    if (id === "misthalin") return;
    if (lockedIds.includes(id)) {
      setDetailArea((p) => p === id ? null : id);
      return;
    }
    if (selectedAreas.includes(id)) {
      setDetailArea((p) => p === id ? null : id);
    } else if (remaining > 0) {
      onToggle(id);
      setDetailArea(id);
    }
  }

  function getHighlight(id) {
    const sel = selectedAreas.includes(id);
    const lk = lockedIds.includes(id);
    const active = detailArea === id;
    const hov = hovered === id && id !== "misthalin";
    if (active) return { bg: 'rgba(232,208,128,0.2)', border: '2px solid rgba(232,208,128,0.8)', shadow: '0 0 14px rgba(232,208,128,0.4)' };
    if (sel) return { bg: 'rgba(200,168,78,0.1)', border: '2px solid rgba(232,208,128,0.45)', shadow: '0 0 8px rgba(232,208,128,0.2)' };
    if (lk) return { bg: 'rgba(200,168,78,0.05)', border: '2px solid rgba(136,110,48,0.3)', shadow: 'none' };
    if (hov) return { bg: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.15)', shadow: 'none' };
    return { bg: 'transparent', border: '2px solid transparent', shadow: 'none' };
  }

  return (
    <section style={{ marginBottom: 64 }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: 'var(--color-gold)', marginBottom: 6 }}>Regions</h2>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--color-border), transparent)', marginBottom: 8 }} />
        <p style={{ color: 'var(--color-text-dim)', fontSize: 13, marginBottom: 4 }}>
          Click regions on the map to select. Right-click to lock from randomization.
        </p>
        <p style={{ fontSize: 11, color: 'var(--color-red)', opacity: 0.7 }}>
          Misthalin is inaccessible &middot; Sailing content excluded
        </p>
      </div>

      {/* Map frame — styled like OSRS interface */}
      <div style={{
        borderRadius: 6, overflow: 'hidden',
        border: '2px solid #4a3e2e',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        background: '#3a3228',
      }}>
        {/* Dynamic header */}
        <div style={{
          padding: '14px 24px 12px',
          borderBottom: '1px solid rgba(80,65,45,0.5)',
          background: 'linear-gradient(180deg, #42382c, #36302a)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, color: 'var(--color-gold-bright)', letterSpacing: '0.08em' }}>
              League Areas
            </span>
          </div>

          {/* Progress bar */}
          <div style={{
            width: '100%', height: 22, borderRadius: 3, overflow: 'hidden',
            background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(80,60,35,0.5)',
            position: 'relative', marginBottom: 8,
          }}>
            <div style={{
              width: `${progressPct}%`, height: '100%',
              background: 'linear-gradient(180deg, #d04030, #901818)',
              transition: 'width 0.3s',
            }} />
            <span style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: '#fff',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)', letterSpacing: '0.03em',
            }}>
              {totalAreas}/5 areas unlocked
            </span>
          </div>

          {/* Picks remaining */}
          <div style={{ textAlign: 'center' }}>
            <span style={{
              fontSize: 12, fontWeight: 600,
              color: remaining === 0 ? 'var(--color-green)' : 'var(--color-accent)',
            }}>
              {remaining === 0 ? "All regions chosen!" : `You have ${remaining} area pick${remaining > 1 ? "s" : ""} available!`}
            </span>
          </div>
        </div>

        {/* Map area */}
        <div style={{ position: 'relative', background: '#2e2a24' }}>
          <img
            src="/img/ui/league-map-cropped.png"
            alt="League Areas"
            style={{ width: '100%', display: 'block', imageRendering: 'auto' }}
            draggable={false}
          />

          {/* Badge hotspots */}
          {Object.entries(BADGE_POS).map(([id, pos]) => {
            const hl = getHighlight(id);
            const sel = selectedAreas.includes(id);
            const lk = lockedIds.includes(id);
            const isMist = id === "misthalin";
            const cantSelect = !sel && !lk && !isMist && remaining === 0;

            return (
              <div
                key={id}
                style={{
                  position: 'absolute',
                  left: `${pos.x - HIT.w / 2}%`,
                  top: `${pos.y - HIT.h / 2}%`,
                  width: `${HIT.w}%`,
                  height: `${HIT.h}%`,
                  cursor: isMist || cantSelect ? 'not-allowed' : 'pointer',
                  opacity: isMist ? 0.25 : cantSelect ? 0.35 : 1,
                  zIndex: hovered === id || detailArea === id ? 10 : 2,
                }}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => !cantSelect && handleBadgeClick(id)}
                onContextMenu={(e) => { e.preventDefault(); if (sel) onLock(id); }}
              >
                <div style={{
                  position: 'absolute', inset: '5%', borderRadius: 5,
                  background: hl.bg, border: hl.border, boxShadow: hl.shadow,
                  transition: 'all 0.2s',
                }} />

                {(sel || lk) && !isMist && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 7, fontWeight: 700, letterSpacing: '0.1em',
                    color: lk ? 'var(--color-gold-dim)' : locked.areas.includes(id) ? 'var(--color-gold)' : 'var(--color-green)',
                    textShadow: '0 1px 3px rgba(0,0,0,0.9)', whiteSpace: 'nowrap', pointerEvents: 'none',
                  }}>
                    {lk ? "START" : locked.areas.includes(id) ? "LOCKED" : "✓"}
                  </div>
                )}
              </div>
            );
          })}

          {/* Tooltip */}
          {hovered && !detailArea && (
            <div style={{
              position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(20,16,12,0.95)', border: '1px solid rgba(200,168,78,0.3)',
              borderRadius: 5, padding: '5px 12px', pointerEvents: 'none',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 3px 10px rgba(0,0,0,0.6)', zIndex: 20,
            }}>
              {(() => { const a = AREAS.find((a) => a.id === hovered); return a ? <WikiImg src={a.image} alt={a.name} size={14} /> : null; })()}
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700, color: hovered === 'misthalin' ? 'rgba(180,60,60,0.7)' : 'var(--color-gold-bright)' }}>
                {AREAS.find((a) => a.id === hovered)?.name || hovered}
              </span>
              <span style={{ fontSize: 10, color: 'var(--color-text-dim)' }}>
                {hovered === 'misthalin' ? "Inaccessible" :
                 selectedAreas.includes(hovered) ? "Click for details" :
                 lockedIds.includes(hovered) ? "Click for details" :
                 remaining === 0 ? "No picks left" : "Click to select"}
              </span>
            </div>
          )}

          {/* ── Detail overlay ── */}
          {detailArea && (() => {
            const area = AREAS.find((a) => a.id === detailArea);
            const d = AREA_DETAILS[detailArea];
            if (!d || !area) return null;
            const echo = d.echoBoss;
            const isStart = lockedIds.includes(detailArea);

            return (
              <div
                style={{
                  position: 'absolute', inset: 0, zIndex: 15,
                  background: 'rgba(10,8,6,0.85)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '16px 24px',
                }}
                onClick={() => setDetailArea(null)}
              >
                <div
                  style={{
                    width: '100%', maxWidth: 680, maxHeight: '100%', overflowY: 'auto',
                    background: '#2e2820',
                    border: '2px solid #4a3e2e',
                    borderRadius: 6, padding: 24,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: '1px solid rgba(80,65,45,0.4)', paddingBottom: 12 }}>
                    <WikiImg src={area.image} alt={area.name} size={32} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 17, fontWeight: 700, color: 'var(--color-gold)' }}>{area.name}</h3>
                      <p style={{ fontSize: 11, color: 'var(--color-text-dim)', lineHeight: 1.4 }}>{area.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      {!isStart && (
                        <button onClick={() => { onToggle(detailArea); setDetailArea(null); }} style={{
                          background: 'linear-gradient(180deg, #5a2020, #3a1414)',
                          border: '1px solid #6a3030', borderTop: '1px solid #7a3838', borderBottom: '2px solid #2a0e0e',
                          borderRadius: 3, color: '#e8a0a0', cursor: 'pointer', padding: '4px 12px',
                          fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                        }}>DESELECT</button>
                      )}
                      <button onClick={() => setDetailArea(null)} style={{
                        background: 'linear-gradient(180deg, #3a3228, #2a2218)',
                        border: '1px solid #4a3e2e', borderTop: '1px solid #5a4e3e', borderBottom: '2px solid #1a1410',
                        borderRadius: 3, color: 'var(--color-text-dim)', cursor: 'pointer', padding: '4px 12px',
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                      }}>CLOSE</button>
                    </div>
                  </div>

                  {/* Echo Boss */}
                  {echo && (
                    <div style={{
                      marginBottom: 16, padding: '10px 14px', borderRadius: 5,
                      background: 'rgba(180,50,50,0.06)', border: '1px solid rgba(180,80,50,0.15)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#d06040', fontFamily: "'Cinzel', serif", letterSpacing: '0.08em' }}>ECHO BOSS</span>
                        <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 2, background: 'rgba(180,80,50,0.12)', color: '#c07050', border: '1px solid rgba(180,80,50,0.15)' }}>{echo.difficulty}</span>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-bright)' }}>{echo.name}</p>
                      <p style={{ fontSize: 11, color: 'var(--color-text-dim)', marginBottom: echo.echoEquipment?.length ? 6 : 0 }}>{echo.location}</p>
                      {echo.echoEquipment?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {echo.echoEquipment.map((eq) => (
                            <span key={eq} style={{ fontSize: 10, padding: '1px 5px', borderRadius: 2, background: 'rgba(180,80,50,0.08)', color: '#c07050', border: '1px solid rgba(180,80,50,0.12)' }}>{eq}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content 2-col */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px' }}>
                    <Section title="Bosses" items={d.bosses} color="var(--color-text-bright)" />
                    <Section title="Notable Drops" items={d.notableDrops} color="var(--color-gold)" />
                    <Section title="Activities" items={d.notableActivities} color="var(--color-text)" />
                    <Section title="Auto-completed Quests" items={d.autoCompletedQuests} />
                    <Section title="Notable Unlocks" items={d.notableUnlocks} color="var(--color-accent)" />
                    {d.keyTraining && Object.keys(d.keyTraining).length > 0 && (
                      <div>
                        <h5 style={{ fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700, color: 'var(--color-gold-dim)', letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase' }}>Key Training</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {Object.entries(d.keyTraining).map(([skill, method]) => (
                            <div key={skill} style={{ display: 'flex', gap: 8, fontSize: 11, lineHeight: 1.4 }}>
                              <span style={{ color: 'var(--color-gold-dim)', fontWeight: 600, textTransform: 'capitalize', minWidth: 60, flexShrink: 0 }}>{skill}</span>
                              <span style={{ color: 'var(--color-text-dim)' }}>{method}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
