import { RPGItems, ItemType, DefenceStat, ResistStat } from "../../items.service";

export const BronzeShield = new RPGItems(
  'Bronze Shield',
  ItemType.SHIELD,
  true,
  false,
  {
    defence: [
      { name: DefenceStat.ARMOR, value: 2 },
      { name: DefenceStat.EVASION, value: 10 },
      { name: DefenceStat.BLOCK_CHANCE, value: 1 },
    ],
    resists: [
      { name: ResistStat.FIRE_RES, value: 1 },
      { name: ResistStat.ICE_RES, value: 1 },
      { name: ResistStat.LIGHTNING_RES, value: 1 },
      { name: ResistStat.POISON_RES, value: 1 },
      { name: ResistStat.BLEED_RES, value: 1 },
    ],
  },
  0.03,
  false,
  1,
  1,
);
