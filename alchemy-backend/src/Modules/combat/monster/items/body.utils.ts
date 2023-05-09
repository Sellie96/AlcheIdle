import {
  RPGItems,
  ItemType,
  DefenceStat,
  ResistStat,
} from '../../items.service';

export const LeatherBody: RPGItems = new RPGItems(
  'Leather Body',
  ItemType.BODY,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 3 },
      { name: DefenceStat.EVASION, value: 20 },
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

export const RustedBody: RPGItems = new RPGItems(
  'Rusted Body',
  ItemType.BODY,
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

export const IronCladBody: RPGItems = new RPGItems(
  'Iron Clad Body',
  ItemType.BODY,
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

export const ShadowedBody: RPGItems = new RPGItems(
  'Shadowed Body',
  ItemType.BODY,
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

export const FrostguardBody: RPGItems = new RPGItems(
  'Frostguard Body',
  ItemType.BODY,
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

export const DragonboneBody: RPGItems = new RPGItems(
  'Dragonbone Body',
  ItemType.BODY,
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
  0.1,
  false,
  1,
  1,
);

export const AncientBody: RPGItems = new RPGItems(
  'Ancient Body',
  ItemType.BODY,
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
  0.1,
  false,
  1,
  1,
);

export const BodyOfTheFallen: RPGItems = new RPGItems(
  'Body of the Fallen',
  ItemType.BODY,
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

