import { UsersService } from './../../user/users.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { RPGItems } from './items.service';
import { MessagesGateway } from '../messages/messages.gateway';

@Injectable()
export class CombatService {
  constructor(
    private messagesService: MessagesGateway,
    private usersService: UsersService,
  ) {}

  updatePlayerLoot(gold: number, xp: number, player: User, monster: any) {
    if (
      player.character.backpack.length <
      player.character.combatStats.progression.inventorySize
    ) {
      const totalDropRate = monster.loot.reduce(
        (sum, item) => sum + item.dropChance,
        0,
      );

      const randomNumber = Math.random();

      let selected: RPGItems | null = null;

      let cumulativeDropRate = 0;

      if (randomNumber < totalDropRate) {
        for (const item of monster.loot) {
          cumulativeDropRate += item.dropChance;
          if (randomNumber < cumulativeDropRate) {
            selected = item;
            break;
          }
        }
      }

      if (selected?.name !== undefined) {
        player.character.backpack.push(selected);

        if(selected.special) {
          this.messagesService.create({
            name: "Server",
            message: `${player.username} has recieved ${selected.name}`,
            time: new Date().toISOString().split('T')[1].split('.')[0]
          })
        }
      }
    }

    player.character.combatStats.progression.experiencePoints += xp;
    player.character.combatStats.progression.gold += gold;

    player = this.checkIfLevelUp(player);

    this.usersService.updateOne(player);

    return player;
  }

  checkIfLevelUp(player: User) {
    let total = 0;
    for (let i = 0; i < player.character.combatStats.progression.level; i++) {
      total += Math.floor(i + 300 * Math.pow(2, i / 7));
    }

    if (player.character.combatStats.progression.experiencePoints >= total) {
      player.character.combatStats.progression.level++;

      this.messagesService.create({
        name: "Server",
        message: `${player.username} has reached level ${player.character.combatStats.progression.level}`,
        time: new Date().toISOString().split('T')[1].split('.')[0]
      })
    }

    return player;
  }

  addItemToBackpack(
    user: User,
    skill: { type: { name: any } },
    reward: any,
    rewardAmount: number,
  ) {
    const item = user.character.backpack.find(
      (item) => item.name === skill.type.name,
    );
    if (item) {
      item.amount += rewardAmount;
      console.log(reward);
    } else {
      console.log(reward);
      user.character.backpack.push(reward);
    }
  }

  removeItemFromBackpack(user: User, skill: { type: { name: any } }) {
    const item = user.character.backpack.find(
      (item) => item.name === skill.type.name,
    );
    if (item) {
      item.amount -= 1;
    } else {
      return 'You have no more items!';
    }
  }


  calculatePlayerHealth(player: User, monster: any) {
    let chanceToHit = 0;
    if (monster) {
      if (monster.accuracy > player.character.combatStats.defenses.evasion) {
        chanceToHit =
          (1 -
            player.character.combatStats.defenses.evasion /
              (monster.accuracy * 2)) *
          100;
      } else {
        chanceToHit =
          (monster.accuracy /
            (2 * player.character.combatStats.defenses.evasion)) *
          100;
      }
    } else chanceToHit = 0;

    if (chanceToHit > Math.random() * 100) {
      let dmgDealt = Math.floor(Math.random() * (monster.attack - 0 + 1)) + 0;
      player.character.combatStats.stats.health -= dmgDealt;
    }

    return player;
  }

  calculateMonsterHealth(player: User, monster: any) {
    let chanceToHit = 0;
    if (monster) {
      if (player.character.combatStats.combat.accuracy > monster.evasion) {
        chanceToHit = (1 - monster.evasion / (player.character.combatStats.combat.accuracy * 2)) *100;
      } else {
        chanceToHit =
          (player.character.combatStats.combat.accuracy /
            (2 * monster.evasion)) *
          100;
      }
    } else chanceToHit = 0;

    if (chanceToHit > Math.random() * 100) {
      let dmgDealt =
        Math.floor(
          Math.random() * (player.character.combatStats.stats.strength - 0 + 1),
        ) + 0;
      monster.health -= dmgDealt;
    }

    return monster;
  }
}
