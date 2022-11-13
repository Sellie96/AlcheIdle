export class Skill {
  username: string;
  type: Skill;
  jwt: string;
  timestamp: string;
}

export interface Skill {
  name: string;
  skillType: string,
  level: number;
  xp: number;
  reward: any;
  time: number;
  value: number;
  damage?: number;
}
