import { Injectable } from '@nestjs/common';
import { Breads, DustDevil, FireSerpent, FireSpirit, FrostTroll, FrozenTerror, Goblin, GoblinArcher, GoblinBerserker, GoblinChief, Hobgoblin, LavaGolem, Mammoth, Manticore, Meats, Onions, Potatoes, SandBeast, SandCrab, SandGolem, SolTheProtector, TheEye } from './monster.utils';
import { IceGiant } from './monster.utils';
import { IceWyvern } from './monster.utils';
import { Tangleroot } from './monster.utils';
import { CarnivorousPlant } from './monster.utils';
import { VampireLord } from './monster.utils';
import { SpiderQueen } from './monster.utils';
import { ChaoticDragon } from './monster.utils';

@Injectable()
export class MonsterService {
  constructor() {}

  monsters = [
    Onions,
    Potatoes,
    Breads,
    Meats,
    Goblin,
    GoblinArcher,
    Hobgoblin,
    GoblinBerserker,
    GoblinChief,
    SandCrab,
    SandBeast,
    SandGolem,
    DustDevil,
    Manticore,
    Mammoth,
    FrostTroll,
    FrozenTerror,
    IceGiant,
    IceWyvern,
    Tangleroot,
    CarnivorousPlant,
    VampireLord,
    SpiderQueen,
    ChaoticDragon,
    LavaGolem,
    TheEye,
    FireSpirit,
    FireSerpent,
    SolTheProtector
  ];

  getMonsterListData() {
    return JSON.parse(JSON.stringify(this.monsters));
  }

  async getMonsterData(monster) {
    return JSON.parse(JSON.stringify(this.monsters)).find(
      (x) => x.name === monster.monsterId,
    );
  }
}
