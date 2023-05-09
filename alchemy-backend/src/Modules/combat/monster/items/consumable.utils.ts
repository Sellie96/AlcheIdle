import { RPGItems, ItemType } from "../../items.service";

export const Onion: RPGItems = new RPGItems(
    'Onion',
    ItemType.CONSUMABLE,
    false,
    true,
    {},
    0,
    false,
    3,
    1,
    10,
  );

  export const Potato: RPGItems = new RPGItems(
    'Potato',
    ItemType.CONSUMABLE,
    false,
    true,
    {},
    1,
    false,
    3,
    50,
    25,
  );

  export const Bread: RPGItems = new RPGItems(
    'Bread',
    ItemType.CONSUMABLE,
    false,
    true,
    {},
    1,
    false,
    3,
    500,
    50,
  );

  export const Meat: RPGItems = new RPGItems(
    'Meat',
    ItemType.CONSUMABLE,
    false,
    true,
    {},
    1,
    false,
    1,
    1000,
    100,
  );