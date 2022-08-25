export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateRandomChance(chanceInPercentage: string | number) {
  return chanceInPercentage > Math.random() * 100;
}
