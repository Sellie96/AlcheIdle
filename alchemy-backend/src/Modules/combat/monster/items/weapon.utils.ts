import {
  AttributeStat,
  ItemType,
  OffenseStat,
  RPGItems,
} from './../../items.service';
export const Longbow = new RPGItems(
  'Longbow',
  ItemType.WEAPON,
  true,
  false,
  {
    offense: [
      { name: OffenseStat.ATTACK_SPEED, value: -1 },
      { name: OffenseStat.ACCURACY, value: 6 },
    ],
    attributes: [
      { name: AttributeStat.STRENGTH, value: 20 },
      { name: AttributeStat.DEXTERITY, value: 2 },
    ],
  },
  0.01,
  false,
  1,
  1,
);

export const Shortbow = new RPGItems(
  'Shortbow',
  ItemType.WEAPON,
  true,
  false,
  {
    offense: [
      { name: OffenseStat.ATTACK_SPEED, value: -1 },
      { name: OffenseStat.ACCURACY, value: 6 },
    ],
    attributes: [
      { name: AttributeStat.STRENGTH, value: 15 },
      { name: AttributeStat.DEXTERITY, value: 3 },
    ],
  },
  0.02,
  false,
  1,
  2,
);

export const BronzeAxe = new RPGItems(
  'Bronze Axe',
  ItemType.WEAPON,
  true,
  false,
  {
    offense: [
      { name: OffenseStat.ATTACK_SPEED, value: 1 },
      { name: OffenseStat.ACCURACY, value: 3 },
    ],
    attributes: [{ name: AttributeStat.STRENGTH, value: 16 }],
  },
  0.5,
  false,
  1,
  2,
);

export const BronzeDagger = new RPGItems(
  'Bronze Dagger',
  ItemType.WEAPON,
  true,
  false,
  {
    offense: [
      { name: OffenseStat.CRIT_CHANCE, value: 2 },
      { name: OffenseStat.CRIT_DAMAGE, value: 5 },
      { name: OffenseStat.ATTACK_SPEED, value: -1 },
      { name: OffenseStat.ACCURACY, value: 6 },
    ],
    attributes: [
      { name: AttributeStat.STRENGTH, value: 8 },
      { name: AttributeStat.DEXTERITY, value: 2 },
    ],
  },
  0.5,
  false,
  1,
  1,
);
