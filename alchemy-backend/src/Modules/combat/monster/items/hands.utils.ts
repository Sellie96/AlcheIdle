import { RPGItems, ItemType, AttributeStat, DefenceStat, ResistStat } from "../../items.service";

export const LeatherGloves: RPGItems = new RPGItems(
  'Leather Gloves',
  ItemType.GLOVES,
  true,
  false,
  {
    attributes: [{ name: AttributeStat.STRENGTH, value: 1 }],
    defence: [
      { name: DefenceStat.ARMOR, value: 1 },
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
  0.005,
  false,
  1,
  1,
);
