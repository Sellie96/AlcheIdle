import { RPGItems, ItemType, DefenceStat, ResistStat } from "../../items.service";

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
    0.003,
    false,
    1,
    1,
  );