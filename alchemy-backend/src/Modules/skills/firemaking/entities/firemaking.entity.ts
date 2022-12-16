export class Firemaking {
  username: string;
  type: Log;
  jwt: string;
  timestamp: string;
}

export interface Log {
  name: string;
  level: number;
  xp: number;
  reward: string;
  time: number;
  value: number;
  amount: number;
}