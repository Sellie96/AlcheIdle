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

  async updatePlayerLoot(gold: number, xp: number, player: User, monster: any, client: any) {
    const randomNumber = Math.random();

    let selected: RPGItems | null = null;

    let cumulativeDropRate = 0;

    if (
      player.character.backpack.length <
      player.character.combatStats.progression.inventorySize
    ) {
      const totalDropRate = monster.loot.reduce(
        (sum, item) => sum + item.dropChance,
        0,
      );

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
        player = await this.usersService.findOneByUsername(player.username);

        const item = player.character.backpack.find(
          (item) => item.name === selected.name,
        );

        if (selected.stackable && item) {
          item.amount += selected.amount;
        } else {
          player.character.backpack.push(selected);
        }

        player.character.combatStats.progression.experiencePoints += xp;
        player.character.combatStats.progression.gold += gold;
    
        this.checkIfLevelUp(player, client);

        if (selected.special) {
          this.messagesService.create({
            name: 'Server',
            message: `${player.username} has recieved ${selected.name}`,
            time: new Date().toISOString().split('T')[1].split('.')[0],
          });
        }


        await this.usersService.updateOne(player);
        return [selected];
      }
    }

    await this.usersService.updateOne(player);
    return [];
  }

  async checkIfLevelUp(player: User, client: any) {
    let total = 0;
    for (let i = 0; i < player.character.combatStats.progression.level; i++) {
      total += Math.floor(i + 300 * Math.pow(2, i / 7));
    }

    if (player.character.combatStats.progression.experiencePoints >= total) {
      player.character.combatStats.progression.level++;

      player.character.combatStats.stats.maxHealth += 10;
      player.character.combatStats.stats.health = player.character.combatStats.stats.maxHealth;

      if(player.character.combatStats.progression.level % 2 === 0) {
        player.character.combatStats.stats.strength += 1;
        player.character.combatStats.defenses.evasion += 10;
      }

      this.messagesService.create({
        name: 'Server',
        message: `${player.username} has reached level ${player.character.combatStats.progression.level}`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });

      client.emit('levelUp', player.character.combatStats.progression.level);
    }

    await this.usersService.updateOne(player);

    return;
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
        chanceToHit =
          (1 -
            monster.evasion /
              (player.character.combatStats.combat.accuracy * 2)) *
          100;
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
