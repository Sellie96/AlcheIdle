import { Injectable } from '@nestjs/common';

@Injectable()
export class MonsterService {
    constructor() { }

    monsters = [
        {
            name: 'Goblin',
            health: 100,
            maxHealth: 100,
            attack: 10,
            defence: 10,
            level: 1,
            xp: 10,
            attackSpeed: 4,
            loot: [
                {
                    name: 'Small Potion',
                    amount: 1,
                    value: 10,
                    restores: 10,
                },
                {
                    name: 'Iron Axe',
                    amount: 1,
                    value: 10,
                },
            ],
        },
        {
            name: 'Orc',
            health: 200,
            maxHealth: 200,
            attack: 20,
            defence: 20,
            level: 2,
            xp: 20,
            attackSpeed: 4,
            loot: [
                {
                    name: 'Small Potion',
                    amount: 1,
                    value: 10,
                    restores: 10,
                },
                {
                    name: 'Iron Axe',
                    amount: 1,
                    value: 10,
                },
            ],
        }
    ]

    async getMonsterListData() {
        return this.monsters;
    }

    async getMonsterData(monster: any) {
        console.log(monster);
        let copiedArray: any[] = [...this.monsters]
        let monsterData = copiedArray.find(x => x.name === monster.monsterId);
        console.log(monsterData);
        return monsterData;
      }

}