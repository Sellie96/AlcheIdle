import {
  RPGItems,
  ItemType,
  DefenceStat,
  ResistStat,
} from '../../items.service';

export const LeatherChaps: RPGItems = new RPGItems(
  'Leather Chaps',
  ItemType.LEGS,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 2 },
      { name: DefenceStat.EVASION, value: 15 },
      { name: DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
      { name: ResistStat.FIRE_RES, value: 1 },
      { name: ResistStat.ICE_RES, value: 1 },
      { name: ResistStat.LIGHTNING_RES, value: 1 },
      { name: ResistStat.POISON_RES, value: 1 },
      { name: ResistStat.BLEED_RES, value: 1 },
    ],
  },
  0.01,
  false,
  1,
  1,
);

export const RustedHelm: RPGItems = new RPGItems(
  'Rusted Legs',
  ItemType.LEGS,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 1 },
      { name: DefenceStat.EVASION, value: 4 },
      { name: DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
      { name: ResistStat.FIRE_RES, value: 1 },
      { name: ResistStat.ICE_RES, value: 1 },
      { name: ResistStat.LIGHTNING_RES, value: 1 },
      { name: ResistStat.POISON_RES, value: 1 },
      { name: ResistStat.BLEED_RES, value: 1 },
    ],
  },
  0.01,
  false,
  1,
  1,
);

export const IronCladHelm: RPGItems = new RPGItems(
  'Iron Clad Legs',
  ItemType.LEGS,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 2 },
      { name: DefenceStat.EVASION, value: 6 },
      { name: DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
      { name: ResistStat.FIRE_RES, value: 1 },
      { name: ResistStat.ICE_RES, value: 1 },
      { name: ResistStat.LIGHTNING_RES, value: 1 },
      { name: ResistStat.POISON_RES, value: 1 },
      { name: ResistStat.BLEED_RES, value: 1 },
    ],
  },
  0.01,
  false,
  1,
  1,
);

export const ShadowedCrown: RPGItems = new RPGItems(
  'Shadowed Legs',
  ItemType.LEGS,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 3 },
      { name: DefenceStat.EVASION, value: 8 },
      { name: DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
      { name: ResistStat.FIRE_RES, value: 1 },
      { name: ResistStat.ICE_RES, value: 1 },
      { name: ResistStat.LIGHTNING_RES, value: 1 },
      { name: ResistStat.POISON_RES, value: 1 },
      { name: ResistStat.BLEED_RES, value: 1 },
    ],
  },
  0.01,
  false,
  1,
  1,
);

export const FrostguardHelmet: RPGItems = new RPGItems(
  'Frostguard Legs',
  ItemType.LEGS,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 4 },
      { name: DefenceStat.EVASION, value: 10 },
      { name: DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
      { name: ResistStat.FIRE_RES, value: 1 },
      { name: ResistStat.ICE_RES, value: 1 },
      { name: ResistStat.LIGHTNING_RES, value: 1 },
      { name: ResistStat.POISON_RES, value: 1 },
      { name: ResistStat.BLEED_RES, value: 1 },
    ],
  },
  0.01,
  false,
  1,
  1,
);

export const DragonboneLegs: RPGItems = new RPGItems(
  'Dragonbone Legs',
  ItemType.LEGS,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 5 },
      { name: DefenceStat.EVASION, value: 12 },
      { name: DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
      { name: ResistStat.FIRE_RES, value: 1 },
      { name: ResistStat.ICE_RES, value: 1 },
      { name: ResistStat.LIGHTNING_RES, value: 1 },
      { name: ResistStat.POISON_RES, value: 1 },

      { name: ResistStat.BLEED_RES, value: 1 },
    ],
  },
  0.01,
  false,
  1,
  1,
);

export const AncientLegs: RPGItems = new RPGItems(
  'Ancient Legs',
  ItemType.LEGS,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 6 },
      { name: DefenceStat.EVASION, value: 14 },
      { name: DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
      { name: ResistStat.FIRE_RES, value: 1 },
      { name: ResistStat.ICE_RES, value: 1 },
      { name: ResistStat.LIGHTNING_RES, value: 1 },
      { name: ResistStat.POISON_RES, value: 1 },
      { name: ResistStat.BLEED_RES, value: 1 },
    ],
  },
  0.01,
  false,
  1,
  1,
);

export const LegsOfTheFallen: RPGItems = new RPGItems(
  'Legs of the Fallen',
  ItemType.LEGS,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 7 },
      { name: DefenceStat.EVASION, value: 16 },
      { name: DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
      { name: ResistStat.FIRE_RES, value: 1 },
      { name: ResistStat.ICE_RES, value: 1 },
      { name: ResistStat.LIGHTNING_RES, value: 1 },
      { name: ResistStat.POISON_RES, value: 1 },
      { name: ResistStat.BLEED_RES, value: 1 },
    ],
  },
  0.01,
  false,
  1,
  1,
);
