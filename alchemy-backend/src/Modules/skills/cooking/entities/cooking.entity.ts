export class Cooking {
  username: string;
  type: Fish;
  jwt: string;
  timestamp: string;
}

export interface Fish {
  name: string;
  level: number;
  xp: number;
  reward: string;
  time: number;
  value: number;
  amount: number;
}