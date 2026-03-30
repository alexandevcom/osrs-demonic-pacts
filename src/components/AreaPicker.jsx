import { useState } from "react";
import { AREAS, MAX_AREA_PICKS } from "../data/league";
import { AREA_DETAILS } from "../data/areaDetails";

function WikiImg({ src, alt, size = 32 }) {
  return (
    <img src={src} alt={alt}
      style={{ width: size, height: size, flexShrink: 0, objectFit: 'contain', imageRendering: 'auto' }}
      onError={(e) => { e.target.style.opacity = "0.3"; }}
    />
  );
}

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
      <h5 style={{ fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700, color: 'var(--color-gold-dim)', letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase' }}>
        {title}
      </h5>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {items.map((item) => <DetailTag key={item} color={color}>{item}</DetailTag>)}
      </div>
    </div>
  );
}

function AreaDetailPanel({ areaId, area, onClose }) {
  const d = AREA_DETAILS[areaId];
  if (!d) return null;
  const echo = d.echoBoss;

  return (
    <div style={{
      gridColumn: '1 / -1',
      borderRadius: 8,
      background: 'var(--color-surface-2)',
      border: '1px solid rgba(136,110,48,0.2)',
      padding: 28,
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <WikiImg src={area.image} alt={area.name} size={36} />
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, color: 'var(--color-gold)', flex: 1 }}>{area.name}</h3>
        <button onClick={onClose} style={{
          background: 'none', border: '1px solid rgba(61,50,37,0.5)', borderRadius: 4,
          color: 'var(--color-text-dim)', cursor: 'pointer', padding: '4px 12px',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
        }}>CLOSE</button>
      </div>

      {/* Echo Boss */}
      {echo && (
        <div style={{
          marginBottom: 20, padding: '12px 16px', borderRadius: 6,
          background: 'rgba(180,50,50,0.06)', border: '1px solid rgba(180,80,50,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#d06040', fontFamily: "'Cinzel', serif", letterSpacing: '0.08em' }}>ECHO BOSS</span>
            <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 2, background: 'rgba(180,80,50,0.12)', color: '#c07050', border: '1px solid rgba(180,80,50,0.15)' }}>
              {echo.difficulty}
            </span>
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

      {/* Content in 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px' }}>
        <Section title="Bosses" items={d.bosses} color="var(--color-text-bright)" />
        <Section title="Notable Drops" items={d.notableDrops} color="var(--color-gold)" />
        <Section title="Activities" items={d.notableActivities} color="var(--color-text)" />
        <Section title="Auto-completed Quests" items={d.autoCompletedQuests} />
        <Section title="Notable Unlocks" items={d.notableUnlocks} color="var(--color-accent)" />

        {d.keyTraining && Object.keys(d.keyTraining).length > 0 && (
          <div>
            <h5 style={{ fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700, color: 'var(--color-gold-dim)', letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase' }}>
              Key Training
            </h5>
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
  );
}

function AreaCard({ area, selected, isLocked, disabled, onToggle, onLock, expanded, onToggleExpand }) {
  return (
    <div
      onClick={() => !disabled && onToggle(area.id)}
      onContextMenu={(e) => { e.preventDefault(); if (selected) onLock(area.id); }}
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        borderRadius: 8, padding: 20, textAlign: 'left',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: selected ? '1px solid var(--color-selected-border)' : '1px solid rgba(61,50,37,0.5)',
        borderBottom: expanded ? '2px solid var(--color-gold-dim)' : undefined,
        background: selected ? 'var(--color-selected-bg)' : 'var(--color-surface)',
        opacity: disabled ? 0.25 : 1,
        transition: 'all 0.15s',
        boxShadow: selected ? '0 0 0 1px var(--color-selected-border), 0 2px 12px rgba(168,144,64,0.08)' : 'none',
      }}
    >
      {isLocked && (
        <span style={{ position: 'absolute', top: 10, right: 12, fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-gold-dim)' }}>LOCKED</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <WikiImg src={area.image} alt={area.name} />
        <h3 style={{
          fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 700, lineHeight: 1.2,
          color: selected ? 'var(--color-gold-bright)' : 'var(--color-text-bright)',
        }}>{area.name}</h3>
      </div>
      <p style={{ color: 'var(--color-text-dim)', fontSize: 12, lineHeight: 1.45, marginBottom: 12, flex: 1 }}>
        {area.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 6px', marginBottom: 10 }}>
        {area.highlights.slice(0, 3).map((h) => (
          <span key={h} style={{
            fontSize: 10, lineHeight: 1, padding: '3px 6px', borderRadius: 3, whiteSpace: 'nowrap',
            border: selected ? '1px solid rgba(168,144,64,0.4)' : '1px solid rgba(61,50,37,0.6)',
            color: selected ? 'var(--color-gold)' : 'rgba(138,132,104,0.6)',
            background: selected ? 'rgba(200,168,78,0.05)' : 'transparent',
          }}>{h}</span>
        ))}
        {area.highlights.length > 3 && (
          <span style={{ fontSize: 10, color: 'rgba(138,132,104,0.4)' }}>+{area.highlights.length - 3}</span>
        )}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onToggleExpand(area.id); }}
        style={{
          fontSize: 10, fontWeight: 700, color: expanded ? 'var(--color-gold)' : 'var(--color-gold-dim)',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          letterSpacing: '0.08em', textAlign: 'left',
        }}
      >
        {expanded ? "▲ HIDE DETAILS" : "▼ VIEW DETAILS"}
      </button>
    </div>
  );
}

function StartingArea({ area, expanded, onToggleExpand }) {
  return (
    <div style={{
      borderRadius: 8, background: 'var(--color-surface-2)',
      border: '1px solid rgba(136,110,48,0.25)',
      borderBottom: expanded ? '2px solid var(--color-gold-dim)' : '1px solid rgba(136,110,48,0.25)',
      padding: 24,
    }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <WikiImg src={area.image} alt={area.name} size={40} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 700, color: 'var(--color-gold)' }}>{area.name}</h3>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-gold-dim)', flexShrink: 0 }}>STARTING</span>
          </div>
          <p style={{ color: 'var(--color-text-dim)', fontSize: 13, lineHeight: 1.45, marginBottom: 10 }}>{area.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px' }}>
            {area.highlights.map((h) => (
              <span key={h} style={{ fontSize: 11, color: 'rgba(136,110,48,0.7)' }}>{h}</span>
            ))}
          </div>
          <button
            onClick={() => onToggleExpand(area.id)}
            style={{
              marginTop: 10, fontSize: 10, fontWeight: 700,
              color: expanded ? 'var(--color-gold)' : 'var(--color-gold-dim)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              letterSpacing: '0.08em',
            }}
          >
            {expanded ? "▲ HIDE DETAILS" : "▼ VIEW DETAILS"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AreaPicker({ selectedAreas, onToggle, onLock, locked }) {
  const [expandedArea, setExpandedArea] = useState(null);
  const starting = AREAS.filter((a) => a.locked);
  const selectable = AREAS.filter((a) => !a.locked);
  const remaining = MAX_AREA_PICKS - selectedAreas.length;

  const toggleExpand = (id) => setExpandedArea((prev) => prev === id ? null : id);

  // Find the expanded area data for full-width panel
  const expandedAreaData = expandedArea ? AREAS.find((a) => a.id === expandedArea) : null;
  const expandedIsStarting = expandedAreaData?.locked;

  // Build rows of 2 with detail panels inserted after each row
  const rows = [];
  for (let i = 0; i < selectable.length; i += 2) {
    const rowAreas = selectable.slice(i, i + 2);
    const items = [];
    let detailPanel = null;
    rowAreas.forEach((area) => {
      items.push(
        <AreaCard
          key={area.id}
          area={area}
          selected={selectedAreas.includes(area.id)}
          isLocked={locked.areas.includes(area.id)}
          disabled={!selectedAreas.includes(area.id) && remaining === 0}
          onToggle={onToggle}
          onLock={onLock}
          expanded={expandedArea === area.id}
          onToggleExpand={toggleExpand}
        />
      );
      if (expandedArea === area.id && !expandedIsStarting) {
        detailPanel = <AreaDetailPanel key={`detail-${area.id}`} areaId={area.id} area={area} onClose={() => setExpandedArea(null)} />;
      }
    });
    if (detailPanel) items.push(detailPanel);
    rows.push(...items);
  }

  return (
    <section style={{ marginBottom: 64 }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: 'var(--color-gold)', marginBottom: 6 }}>Regions</h2>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--color-border), transparent)', marginBottom: 8 }} />
        <p style={{ color: 'var(--color-text-dim)', fontSize: 13, marginBottom: 4 }}>
          Varlamore &amp; Karamja are starting regions. Choose {MAX_AREA_PICKS} more to unlock.
        </p>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: remaining === 0 ? 'var(--color-green)' : 'var(--color-accent)', marginBottom: 10 }}>
          {remaining === 0 ? "ALL CHOSEN" : `${remaining} PICK${remaining > 1 ? "S" : ""} LEFT`}
        </p>
        <p style={{ fontSize: 11, color: 'var(--color-red)', opacity: 0.7 }}>
          Misthalin is completely inaccessible &middot; Sailing content excluded
        </p>
      </div>

      {/* Starting areas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: expandedIsStarting ? 0 : 24 }}>
        {starting.map((a) => (
          <StartingArea key={a.id} area={a} expanded={expandedArea === a.id} onToggleExpand={toggleExpand} />
        ))}
      </div>

      {/* Starting area detail panel — full width */}
      {expandedIsStarting && expandedAreaData && (
        <div style={{ marginBottom: 24, marginTop: 20 }}>
          <AreaDetailPanel areaId={expandedAreaData.id} area={expandedAreaData} onClose={() => setExpandedArea(null)} />
        </div>
      )}

      {/* Selectable areas — 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, alignItems: 'start' }}>
        {rows}
      </div>
    </section>
  );
}
