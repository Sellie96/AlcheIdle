import { LeatherBody } from './items/body.utils';
import { LeatherGloves } from './items/hands.utils';
import { LeatherChaps } from './items/legs.utils';
import { BronzeShield } from './items/offhand.utils';
import {
  BronzeAxe,
  BronzeDagger,
  Longbow,
  Shortbow,
} from './items/weapon.utils';

export const Goblin = Object.freeze({
  name: 'Goblin',
  health: 50,
  maxHealth: 50,
  attack: 23,
  defence: 1,
  evasion: 640,
  accuracy: 640,
  level: 1,
  xp: 10,
  gold: 5,
  attackSpeed: 4,
  loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const GoblinArcher = Object.freeze({
  name: 'Goblin Archer',
  health: 100,
  maxHealth: 100,
  attack: 27,
  defence: 1,
  evasion: 896,
  accuracy: 896,
  level: 6,
  xp: 15,
  gold: 15,
  attackSpeed: 3,
  loot: Object.freeze([
    Shortbow,
    Longbow,
    LeatherBody,
    LeatherChaps,
    LeatherGloves,
  ]),
});

export const Hobgoblin = Object.freeze({
  name: 'Hobgoblin',
  health: 150,
  maxHealth: 150,
  attack: 32,
  defence: 1,
  evasion: 1216,
  accuracy: 1216,
  level: 12,
  xp: 25,
  gold: 35,
  attackSpeed: 4,
  loot: Object.freeze([
    Shortbow,
    Longbow,
    LeatherBody,
    LeatherChaps,
    LeatherGloves,
  ]),
});

export const GoblinBerserker = Object.freeze({
  name: 'Goblin Berserker',
  health: 250,
  maxHealth: 250,
  attack: 52,
  defence: 1,
  evasion: 3276,
  accuracy: 2886,
  level: 33,
  xp: 40,
  gold: 55,
  attackSpeed: 4,
  loot: Object.freeze([
    Shortbow,
    Longbow,
    LeatherBody,
    LeatherChaps,
    LeatherGloves,
  ]),
});

export const GoblinChief = Object.freeze({
  name: 'Goblin Chief',
  health: 800,
  maxHealth: 800,
  attack: 212,
  defence: 1,
  evasion: 18216,
  accuracy: 14256,
  level: 101,
  xp: 100,
  gold: 150,
  attackSpeed: 4,
  loot: Object.freeze([
    Shortbow,
    Longbow,
    LeatherBody,
    LeatherChaps,
    LeatherGloves,
  ]),
});

export const SandCrab = Object.freeze({
  name: 'Sand Crab',
  health: 600,
  maxHealth: 600,
  attack: 42,
  defence: 1,
  evasion: 2886,
  accuracy: 2001,
  level: 33,
  xp: 30,
  gold: 30,
  attackSpeed: 3,
  loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const SandBeast = Object.freeze({
  name: 'Sand Beast',
  health: 600,
  maxHealth: 600,
  attack: 124,
  defence: 1,
  evasion: 5500,
  accuracy: 5700,
  level: 60,
  xp: 65,
  gold: 65,
  attackSpeed: 3,
  loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const DustDevil = Object.freeze({
  name: 'Dust Devil',
  health: 800,
  maxHealth: 800,
  attack: 148,
  defence: 2,
  evasion: 5700,
  accuracy: 5900,
  level: 70,
  xp: 85,
  gold: 85,
  attackSpeed: 3,
  loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const SandGolem = Object.freeze({
  name: 'Sand Golem',
  health: 1000,
  maxHealth: 1000,
  attack: 172,
  defence: 4,
  evasion: 5900,
  accuracy: 6100,
  level: 80,
  xp: 105,
  gold: 105,
  attackSpeed: 3,
  loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const Manticore = Object.freeze({
  name: 'Manticore',
  health: 1200,
  maxHealth: 1200,
  attack: 196,
  defence: 6,
  evasion: 6100,
  accuracy: 6300,
  level: 90,
  xp: 125,
  gold: 125,
  attackSpeed: 3,
  loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const Mammoth = Object.freeze({
    name: 'Mammoth',
    health: 1200,
    maxHealth: 1200,
    attack: 196,
    defence: 6,
    evasion: 6100,
    accuracy: 6300,
    level: 90,
    xp: 125,
    gold: 125,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const FrostTroll = Object.freeze({
    name: 'Frost Troll',
    health: 1400,
    maxHealth: 1400,
    attack: 220,
    defence: 8,
    evasion: 6300,
    accuracy: 6500,
    level: 100,
    xp: 145,
    gold: 145,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const FrozenTerror = Object.freeze({
    name: 'Frozen Terror',
    health: 1600,
    maxHealth: 1600,
    attack: 244,
    defence: 10,
    evasion: 6500,
    accuracy: 6700,
    level: 110,
    xp: 165,
    gold: 165,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const IceGiant = Object.freeze({
    name: 'Ice Giant',
    health: 1800,
    maxHealth: 1800,
    attack: 268,
    defence: 12,
    evasion: 6700,
    accuracy: 6900,
    level: 120,
    xp: 185,
    gold: 185,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const IceWyvern = Object.freeze({
    name: 'Ice Wyvern',
    health: 2000,
    maxHealth: 2000,
    attack: 292,
    defence: 14,
    evasion: 6900,
    accuracy: 7100,
    level: 130,
    xp: 205,
    gold: 205,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const Tangleroot = Object.freeze({
    name: 'Tangleroot',
    health: 2200,
    maxHealth: 2200,
    attack: 316,
    defence: 16,
    evasion: 7100,
    accuracy: 7300,
    level: 140,
    xp: 225,
    gold: 225,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const CarnivorousPlant = Object.freeze({
    name: 'Carnivorous Plant',
    health: 2400,
    maxHealth: 2400,
    attack: 340,
    defence: 18,
    evasion: 7300,
    accuracy: 7500,
    level: 150,
    xp: 245,
    gold: 245,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const VampireLord = Object.freeze({
    name: 'Vampire Lord',
    health: 2600,
    maxHealth: 2600,
    attack: 364,
    defence: 20,
    evasion: 7500,
    accuracy: 7700,
    level: 160,
    xp: 265,
    gold: 265,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const SpiderQueen = Object.freeze({
    name: 'Spider Queen',
    health: 2800,
    maxHealth: 2800,
    attack: 388,
    defence: 22,
    evasion: 7700,
    accuracy: 7900,
    level: 170,
    xp: 285,
    gold: 285,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const ChaoticDragon = Object.freeze({
    name: 'Chaotic Dragon',
    health: 3000,
    maxHealth: 3000,
    attack: 412,
    defence: 24,
    evasion: 7900,
    accuracy: 8100,
    level: 180,
    xp: 305,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const LavaGolem = Object.freeze({
    name: 'Lava Golem',
    health: 4000,
    maxHealth: 4000,
    attack: 516,
    defence: 32,
    evasion: 8000,
    accuracy: 8200,
    level: 200,
    xp: 405,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const TheEye = Object.freeze({
    name: 'The Eye',
    health: 6000,
    maxHealth: 6000,
    attack: 724,
    defence: 48,
    evasion: 8200,
    accuracy: 8400,
    level: 240,
    xp: 605,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const FireSpirit = Object.freeze({
  name: 'Fire Spirit',
  health: 8000,
  maxHealth: 8000,
  attack: 932,
  defence: 64,
  evasion: 8400,
  accuracy: 8600,
  level: 280,
  xp: 805,
  gold: 305,
  attackSpeed: 3,
  loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const FireSerpent = Object.freeze({
    name: 'Fire Serpent',
    health: 7000,
    maxHealth: 7000,
    attack: 828,
    defence: 56,
    evasion: 8300,
    accuracy: 8500,
    level: 260,
    xp: 705,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});

export const SolTheProtector = Object.freeze({
  name: 'Sol The Protector',
  health: 5000,
  maxHealth: 5000,
  attack: 620,
  defence: 40,
  evasion: 8100,
  accuracy: 8300,
  level: 220,
  xp: 505,
  gold: 305,
  attackSpeed: 3,
  loot: Object.freeze([BronzeAxe, BronzeShield, BronzeDagger]),
});
