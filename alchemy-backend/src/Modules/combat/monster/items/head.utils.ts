import {
  RPGItems,
  ItemType,
  DefenceStat,
  ResistStat,
} from '../../items.service';

export const RustedHelm: RPGItems = new RPGItems(
  'Rusted Helm',
  ItemType.HELM,
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
    'Iron Clad Helm',
    ItemType.HELM,
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
    'Shadowed Crown',
    ItemType.HELM,
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
    'Frostguard Helmet',
    ItemType.HELM,
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

export const DragonboneHelm: RPGItems = new RPGItems(
    'Dragonbone Helm',
    ItemType.HELM,
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

export const AncientHelm: RPGItems = new RPGItems(
    'Ancient Helm',
    ItemType.HELM,
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

export const HelmOfTheFallen: RPGItems = new RPGItems(
    'Helm of the Fallen',
    ItemType.HELM,
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






