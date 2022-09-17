export class Thieving {
    username: string;
    thievingOption: ThievingOption;
    jwt: string;
    timestamp: string;
  }
  
  export interface ThievingOption {
    name: string;
    level: number;
    xp: number;
    damage: number;
    time: number;
    value: number;
  }