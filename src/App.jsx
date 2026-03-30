import { useState, useEffect, useCallback } from "react";
import RegionMap from "./components/RegionMap";
import RelicBuilder from "./components/RelicBuilder";
import BuildSummary from "./components/BuildSummary";
import { AREAS, RELICS, MAX_AREA_PICKS, LEAGUE_INFO } from "./data/league";

function Btn({ onClick, children, primary, success, icon }) {
  const base = {
    position: 'relative',
    height: 40,
    padding: '0 22px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "'Cinzel', serif",
    letterSpacing: '0.06em',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    textTransform: 'uppercase',
  };

  let style;
  if (primary) {
    style = {
      ...base,
      background: 'linear-gradient(180deg, #e8a030 0%, #c07820 50%, #a06018 100%)',
      border: '1px solid #d89828',
      borderTop: '1px solid #f0c050',
      borderBottom: '2px solid #704010',
      color: '#1a1410',
      textShadow: '0 1px 0 rgba(255,200,100,0.3)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,220,140,0.25)',
    };
  } else if (success) {
    style = {
      ...base,
      background: 'linear-gradient(180deg, #3a6a20 0%, #2a5018 50%, #1e3c12 100%)',
      border: '1px solid #4a7a28',
      borderTop: '1px solid #5a9030',
      borderBottom: '2px solid #162a0e',
      color: '#a0d870',
      textShadow: '0 1px 0 rgba(0,0,0,0.3)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(120,180,60,0.15)',
    };
  } else {
    style = {
      ...base,
      background: 'linear-gradient(180deg, #3a3228 0%, #2a2218 50%, #221a12 100%)',
      border: '1px solid #4a3e30',
      borderTop: '1px solid #5a4e3e',
      borderBottom: '2px solid #161210',
      color: 'var(--color-text-dim)',
      textShadow: '0 1px 0 rgba(0,0,0,0.4)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
    };
  }

  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.15)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'brightness(1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(1px)';
        e.currentTarget.style.boxShadow = '0 0 1px rgba(0,0,0,0.4), inset 0 2px 4px rgba(0,0,0,0.2)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = style.boxShadow;
      }}
    >
      {children}
    </button>
  );
}

function encodeBuild(areas, relics) {
  return btoa(`${areas.join(",")}|${Object.entries(relics).map(([t, id]) => `${t}:${id}`).join(",")}`);
}
function decodeBuild(hash) {
  try {
    const [a, r] = atob(hash).split("|");
    const areas = a ? a.split(",").filter(Boolean) : [];
    const relics = {};
    if (r) r.split(",").filter(Boolean).forEach((p) => { const [t, id] = p.split(":"); relics[+t] = id; });
    return { areas, relics };
  } catch { return null; }
}
function pickRandom(arr, n) { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }

export default function App() {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedRelics, setSelectedRelics] = useState({});
  const [locked, setLocked] = useState({ areas: [], relics: {} });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const b = new URLSearchParams(window.location.search).get("build");
    if (b) { const d = decodeBuild(b); if (d) { setSelectedAreas(d.areas); setSelectedRelics(d.relics); } }
  }, []);

  const toggleArea = useCallback((id) => {
    setSelectedAreas((prev) => {
      if (prev.includes(id)) {
        setLocked((l) => ({ ...l, areas: l.areas.filter((a) => a !== id) }));
        return prev.filter((a) => a !== id);
      }
      return prev.length >= MAX_AREA_PICKS ? prev : [...prev, id];
    });
  }, []);

  const selectRelic = useCallback((tier, id) => {
    setSelectedRelics((prev) => {
      if (prev[tier] === id) {
        setLocked((l) => { const r = { ...l.relics }; delete r[tier]; return { ...l, relics: r }; });
        const n = { ...prev }; delete n[tier]; return n;
      }
      return { ...prev, [tier]: id };
    });
  }, []);

  const toggleLockArea = useCallback((id) => {
    setLocked((p) => ({ ...p, areas: p.areas.includes(id) ? p.areas.filter((a) => a !== id) : [...p.areas, id] }));
  }, []);
  const toggleLockRelic = useCallback((tier) => {
    setLocked((p) => { const r = { ...p.relics }; r[tier] != null ? delete r[tier] : r[tier] = true; return { ...p, relics: r }; });
  }, []);

  const randomizeAll = useCallback(() => {
    setSelectedAreas(pickRandom(AREAS.filter((a) => !a.locked).map((a) => a.id), MAX_AREA_PICKS));
    const r = {};
    RELICS.forEach((t) => { const av = t.choices.filter((c) => !c.unrevealed); if (av.length) r[t.tier] = av[Math.floor(Math.random() * av.length)].id; });
    setSelectedRelics(r);
    setLocked({ areas: [], relics: {} });
  }, []);

  const randomizeUnlocked = useCallback(() => {
    setSelectedAreas((prev) => {
      const lk = prev.filter((id) => locked.areas.includes(id));
      const avail = AREAS.filter((a) => !a.locked && !lk.includes(a.id)).map((a) => a.id);
      return [...lk, ...pickRandom(avail, MAX_AREA_PICKS - lk.length)];
    });
    setSelectedRelics((prev) => {
      const n = {};
      RELICS.forEach((t) => {
        if (locked.relics[t.tier] != null && prev[t.tier]) n[t.tier] = prev[t.tier];
        else { const av = t.choices.filter((c) => !c.unrevealed); if (av.length) n[t.tier] = av[Math.floor(Math.random() * av.length)].id; }
      });
      return n;
    });
  }, [locked]);

  const reset = useCallback(() => {
    setSelectedAreas([]); setSelectedRelics({}); setLocked({ areas: [], relics: {} });
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const share = useCallback(() => {
    const url = `${location.origin}${location.pathname}?build=${encodeBuild(selectedAreas, selectedRelics)}`;
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, [selectedAreas, selectedRelics]);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 48px' }}>

      {/* ── Header ── */}
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 48 }}>
        <img
          src={LEAGUE_INFO.logo}
          alt="Demonic Pacts League"
          style={{ height: 120, marginBottom: 16, imageRendering: 'auto', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
        />
        <p style={{ color: 'var(--color-text-dim)', fontSize: 13, marginBottom: 24, maxWidth: 360 }}>
          Plan your build for Leagues VI — or randomize and let fate decide.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
          <Btn onClick={randomizeAll} primary>Randomize All</Btn>
          <Btn onClick={randomizeUnlocked}>Randomize Unlocked</Btn>
          <Btn onClick={reset}>Reset</Btn>
          <Btn onClick={share} success={copied}>{copied ? "Link copied!" : "Share Build"}</Btn>
        </div>

        <p style={{ color: 'rgba(138,132,104,0.4)', fontSize: 11, marginTop: 12 }}>
          Right-click a selection to lock it from randomization
        </p>
      </header>

      {/* ── Content ── */}
      <RegionMap
        selectedAreas={selectedAreas}
        onToggle={toggleArea}
        onLock={toggleLockArea}
        locked={locked}
      />

      <RelicBuilder
        selectedRelics={selectedRelics}
        onSelect={selectRelic}
        onLock={toggleLockRelic}
        locked={locked}
      />

      <BuildSummary
        selectedAreas={selectedAreas}
        selectedRelics={selectedRelics}
      />

      {/* ── Footer ── */}
      <footer style={{ textAlign: 'center', marginTop: 80, paddingTop: 24, borderTop: '1px solid rgba(61,50,37,0.3)' }}>
        <p style={{ color: 'rgba(138,132,104,0.4)', fontSize: 11 }}>
          Not affiliated with Jagex Ltd. &middot; Launches April 15 2026 &middot; Unrevealed relics shown as placeholders
        </p>
      </footer>
    </div>
  );
}
