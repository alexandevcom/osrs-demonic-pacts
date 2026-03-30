const B = import.meta.env.BASE_URL;
const img = (path) => `${B}${path}`;

export const LEAGUE_INFO = {
  name: "Demonic Pacts",
  number: "VI",
  startDate: "2026-04-15",
  endDate: "2026-06-10",
  logo: img("img/ui/logo.png"),
  icon: img("img/ui/icon.png"),
  relicIcon: img("img/ui/relic-icon.png"),
};

export const AREAS = [
  {
    id: "varlamore",
    name: "Varlamore",
    locked: true,
    description: "Starting area. Home of the Fortis Colosseum, Cam Torum, and the Hunter Guild.",
    image: img("img/areas/varlamore.png"),
    highlights: ["Fortis Colosseum", "Cam Torum", "Hunter Guild", "Varlamore Part 3", "Yama encounters"],
  },
  {
    id: "karamja",
    name: "Karamja",
    locked: true,
    description: "Mandatory first unlock. Tropical island with TzHaar and volcanic adventures.",
    image: img("img/areas/karamja.png"),
    highlights: ["TzHaar Fight Caves", "Inferno", "Brimhaven Dungeon", "Shilo Village"],
  },
  {
    id: "asgarnia",
    name: "Asgarnia",
    locked: false,
    description: "Central kingdom with Falador, the Crafting Guild, and Ice Mountain.",
    image: img("img/areas/asgarnia.png"),
    highlights: ["Corporeal Beast", "GWD (Trollheim)", "Crafting Guild", "Falador", "Port Sarim"],
  },
  {
    id: "fremennik",
    name: "Fremennik",
    locked: false,
    description: "Northern lands of the Fremennik. DKS, Vorkath, and Lunar Isle.",
    image: img("img/areas/fremennik.png"),
    highlights: ["Vorkath", "DKS", "Lunar Isle", "Neitiznot", "God Wars Dungeon"],
  },
  {
    id: "kandarin",
    name: "Kandarin",
    locked: false,
    description: "Western lands with Camelot, Seers' Village, and Piscatoris.",
    image: img("img/areas/kandarin.png"),
    highlights: ["Zulrah", "Demonic Gorillas", "Camelot", "Ardougne", "Piscatoris"],
  },
  {
    id: "desert",
    name: "Desert",
    locked: false,
    description: "The Kharidian Desert with ancient tombs, pyramids, and Raids 3.",
    image: img("img/areas/desert.png"),
    highlights: ["Tombs of Amascut", "Kalphite Queen", "Sophanem", "Nardah", "Ancient Magicks"],
  },
  {
    id: "morytania",
    name: "Morytania",
    locked: false,
    description: "Haunted swamplands with Theatre of Blood, Barrows, and Darkmeyer.",
    image: img("img/areas/morytania.png"),
    highlights: ["Theatre of Blood", "Nightmare", "Barrows", "Darkmeyer", "Hallowed Sepulchre"],
  },
  {
    id: "tirannwn",
    name: "Tirannwn",
    locked: false,
    description: "Elven lands with Prifddinas, the Gauntlet, and Zalcano.",
    image: img("img/areas/tirannwn.png"),
    highlights: ["The Gauntlet", "Zalcano", "Prifddinas", "Crystal equipment", "Crystal Chest"],
  },
  {
    id: "wilderness",
    name: "Wilderness",
    locked: false,
    description: "Dangerous zone with wilderness bosses and the Revenant Caves.",
    image: img("img/areas/wilderness.png"),
    highlights: ["Revenant Caves", "Wilderness bosses", "Mage Arena", "Chaos Altar", "Larran's Chest"],
  },
  {
    id: "kourend",
    name: "Kourend & Kebos",
    locked: false,
    description: "Great Kourend with Chambers of Xeric, Hydra, and five houses.",
    image: img("img/areas/kourend.png"),
    highlights: ["Chambers of Xeric", "Alchemical Hydra", "Catacombs", "Konar Slayer", "Tithe Farm"],
  },
];

export const RELICS = [
  {
    tier: 1,
    unlockRequirement: "Tutorial completion",
    xpBonus: "5x XP",
    choices: [
      { id: "endless-harvest", name: "Endless Harvest", description: "Auto-banking, infinite gathering nodes, 2x resource yields.", image: img("img/relics/endless-harvest.png") },
      { id: "barbarian-gathering", name: "Barbarian Gathering", description: "140-slot knapsack, bare-handed gathering at crystal tool level, 50% secondary success on fails.", image: img("img/relics/barbarian-gathering.png") },
      { id: "abundance", name: "Abundance", description: "Permanent +10 boost to non-combat skills, 2x coins earned per XP.", image: img("img/relics/abundance.png") },
    ],
  },
  {
    tier: 2,
    unlockRequirement: "750 League Points",
    xpBonus: "8x XP",
    choices: [
      { id: "woodsman", name: "Woodsman", description: "Auto log burning, simultaneous fletching, 100% hunter success, doubled impling loot.", image: img("img/relics/woodsman.png") },
      { id: "tier2-b", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
      { id: "tier2-c", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
    ],
  },
  {
    tier: 3,
    unlockRequirement: "1,500 League Points",
    xpBonus: "1.5x Combat XP · Bigger & Badder · 5x Slayer pts",
    choices: [
      { id: "evil-eye", name: "Evil Eye", description: "Grants an item to teleport to any unlocked boss or raid entrance instantly.", image: img("img/relics/evil-eye.png") },
      { id: "tier3-b", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
      { id: "tier3-c", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
    ],
  },
  {
    tier: 4,
    unlockRequirement: "2,500 League Points",
    xpBonus: "5x drops · 8x minigame pts",
    choices: [
      { id: "conniving-clues", name: "Conniving Clues", description: "Clue contracts from caskets, teleport to steps, 1/15 drop rate, min steps & max rolls.", image: img("img/relics/conniving-clues.png") },
      { id: "tier4-b", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
      { id: "tier4-c", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
    ],
  },
  {
    tier: 5,
    unlockRequirement: "5,000 League Points",
    xpBonus: "12x XP",
    choices: [
      { id: "tier5-a", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
      { id: "tier5-b", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
      { id: "tier5-c", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
    ],
  },
  {
    tier: 6,
    unlockRequirement: "8,000 League Points",
    xpBonus: null,
    choices: [
      { id: "culling-spree", name: "Culling Spree", description: "Pick from 3 slayer tasks, 50% superior chain-spawn, free slayer perks, helm effect without wearing.", image: img("img/relics/culling-spree.png") },
      { id: "tier6-b", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
      { id: "tier6-c", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
    ],
  },
  {
    tier: 7,
    unlockRequirement: "16,000 League Points",
    xpBonus: "16x XP",
    choices: [
      { id: "tier7-a", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
      { id: "tier7-b", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
      { id: "tier7-c", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
    ],
  },
  {
    tier: 8,
    unlockRequirement: "25,000 League Points",
    xpBonus: null,
    choices: [
      { id: "minion", name: "Minion", description: "30-min combat companion with AoE attacks, auto-looting, boosted by Zamorak items.", image: img("img/relics/minion.png") },
      { id: "flask-of-fervour", name: "Flask of Fervour", description: "Full HP/Prayer/spec restore, 3 AoE explosions, invulnerability, cooldown reduced by damage." },
      { id: "tier8-c", name: "Unrevealed", description: "Not yet revealed.", unrevealed: true },
    ],
  },
];

export const MAX_AREA_PICKS = 3;
