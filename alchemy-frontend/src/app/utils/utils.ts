export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateRandomChance(chanceInPercentage: string | number) {
  return chanceInPercentage > Math.random() * 100;
}

export enum navLinkEnums {
  town = 'Town',
  leaderboard = 'Leaderboard',
  alchemy = 'Alchemy',
  // quests = 'Quests',
  backpack = 'Backpack',
  attack = 'Attack',
  dungeons = 'Dungeon',
  raids = 'Raids',
  woodcutting = 'Woodcutting',
  firemaking = 'Firemaking',
  fishing = 'Fishing',
  cooking = 'Cooking',
  runecrafting = 'Runecrafting',
  mining = 'Mining',
  smithing = 'Smithing',
  thieving = 'Thieving',
  fletching = 'Fletching',
  crafting = 'Crafting',
  agility = 'Agility',
  herblore = 'Herblore',
}

export const navLinks = [
  navLinkEnums.town,
  navLinkEnums.alchemy,
  // navLinkEnums.quests,
  navLinkEnums.backpack,
  navLinkEnums.leaderboard,
];

export const combatLinks = [
  navLinkEnums.attack,
  navLinkEnums.dungeons,
  navLinkEnums.raids,
];

export const skillLinks = [
  navLinkEnums.woodcutting,
  navLinkEnums.firemaking,
  navLinkEnums.fishing,
  navLinkEnums.cooking,
  navLinkEnums.runecrafting,
  navLinkEnums.mining,
  navLinkEnums.smithing,
  navLinkEnums.thieving,
  navLinkEnums.fletching,
  navLinkEnums.crafting,
  navLinkEnums.agility,
  navLinkEnums.herblore,
];
