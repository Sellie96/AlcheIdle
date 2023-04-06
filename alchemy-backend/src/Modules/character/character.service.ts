import { map } from 'rxjs';
import {
  OffenseStat,
  RPGItems,
  DefenceStat,
  AttributeStat,
  ResistStat,
} from './../combat/items.service';
import { CombatGateway } from './../combat/combat.gateway';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ItemType } from '../combat/items.service';
import { Stats } from './skills/combat.entity';

export interface Item {
  name: string;
  itemType: ItemType;
  equipable: boolean;
  stackable: boolean;
  stats: Stats;
  dropChance: number;
  special: boolean;
}

const attributeMap = {
  [OffenseStat.CRIT_CHANCE]: 'criticalHitChance',
  [OffenseStat.CRIT_DAMAGE]: 'criticalHitDamage',
  [OffenseStat.ATTACK_SPEED]: 'attackSpeed',
  [OffenseStat.ACCURACY]: 'accuracy',
  [DefenceStat.ARMOR]: 'armor',
  [DefenceStat.EVASION]: 'evasion',
  [DefenceStat.MAGIC_RESIST]: 'magicResistance',
  [DefenceStat.BLOCK_CHANCE]: 'blockChance',
  [DefenceStat.PARRY_CHANCE]: 'parryChance',
  [AttributeStat.STRENGTH]: 'strength',
  [AttributeStat.DEXTERITY]: 'dexterity',
  [AttributeStat.INTELLIGENCE]: 'intelligence',
  [AttributeStat.ENDURANCE]: 'endurance',
  [AttributeStat.AGILITY]: 'agility',
  [AttributeStat.LUCK]: 'luck',
  [ResistStat.FIRE_RES]: 'fireResistance',
  [ResistStat.ICE_RES]: 'iceResistance',
  [ResistStat.LIGHTNING_RES]: 'lightningResistance',
  [ResistStat.POISON_RES]: 'poisonResistance',
  [ResistStat.BLEED_RES]: 'bleedResistance',
  [ResistStat.STUN_RES]: 'stunResistance',
  [ResistStat.CONFUSE_RES]: 'confuseResistance',
  [ResistStat.SILENCE_RES]: 'silenceResistance',
};

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async equipItem(username: string, item: any) {
    let userData: User = await this.usersRepository.findOneBy({
      username: username,
    });

    let found = false;
    userData.character.backpack.map((backpackItem: RPGItems) => {
      if (backpackItem.name === item.item.name && !found) {
        let prevItem = null;
        switch (item.item.itemType) {
          case 'Helm':
            prevItem = userData.character.equipment.head;
            userData = this.removeStats(prevItem, userData);
            userData.character.equipment.head = backpackItem;
            userData = this.addStats(backpackItem, userData);
            break;
          case 'Amulet':
            prevItem = userData.character.equipment.necklace;
            userData = this.removeStats(prevItem, userData);
            userData.character.equipment.necklace = backpackItem;
            userData = this.addStats(backpackItem, userData);
            break;
          case 'Body':
            prevItem = userData.character.equipment.chest;
            userData = this.removeStats(prevItem, userData);
            userData.character.equipment.chest = backpackItem;
            userData = this.addStats(backpackItem, userData);
            break;
          case 'Legs':
            prevItem = userData.character.equipment.legs;
            userData = this.removeStats(prevItem, userData);
            userData.character.equipment.legs = backpackItem;
            userData = this.addStats(backpackItem, userData);
            break;
          case 'Gloves':
            prevItem = userData.character.equipment.hands;
            userData = this.removeStats(prevItem, userData);
            userData.character.equipment.hands = backpackItem;
            userData = this.addStats(backpackItem, userData);
            break;
          case 'Ring':
            prevItem = userData.character.equipment.ring1;
            userData = this.removeStats(prevItem, userData);
            userData.character.equipment.ring1 = backpackItem;
            userData = this.addStats(backpackItem, userData);
            break;
          case 'Boots':
            prevItem = userData.character.equipment.feet;
            userData = this.removeStats(prevItem, userData);
            userData.character.equipment.feet = backpackItem;
            userData = this.addStats(backpackItem, userData);
            break;
          case 'Weapon':
            prevItem = userData.character.equipment.mainHand;
            userData = this.removeStats(prevItem, userData);
            userData.character.equipment.mainHand = backpackItem;
            this.addStats(backpackItem, userData);
            break;
          case 'Shield':
            prevItem = userData.character.equipment.offHand;
            userData = this.removeStats(prevItem, userData);
            userData.character.equipment.offHand = backpackItem;
            userData = this.addStats(backpackItem, userData);
            break;
          default:
            return undefined;
        }

        if (prevItem?.name) {
          // add previous equipment back to the backpack
          userData.character.backpack.push(prevItem);
        }

        found = true;
        // remove item from backpack
        userData.character.backpack.splice(
          userData.character.backpack.indexOf(backpackItem),
          1,
        );
      }
    });

    await this.usersRepository.update(
      { username: userData.username },
      {
        character: userData.character,
      },
    );

    return await this.usersRepository.findOneBy({
      username: username,
    });
  }

  async unequipItem(username: string, type: any) {
    let userData: User = await this.usersRepository.findOneBy({
      username: username,
    });

    let prevItem = userData.character.equipment[type.type];

    if((Object.keys(prevItem).length === 0)) {
      console.log("empty item");
    } else {
      this.removeStats(prevItem, userData);
    }

    if (prevItem?.name) {
      // add previous equipment back to the backpack
      userData.character.backpack.push(prevItem);
    }

    userData.character.equipment[type.type] = {};

    

    await this.usersRepository.update(
      { username: userData.username },
      {
        character: userData.character,
      },
    );

    return await this.usersRepository.findOneBy({
      username: username,
    });
  }

  addStats(item: RPGItems, player: User) {
    if (item.stats.offense) {
      item.stats.offense.map((stat) => {
        switch (stat.name) {
          case OffenseStat.CRIT_CHANCE:
            player.character.combatStats.combat.criticalHitChance += stat.value;
            break;
          case OffenseStat.CRIT_DAMAGE:
            player.character.combatStats.combat.criticalHitDamage += stat.value;
            break;
          case OffenseStat.ATTACK_SPEED:
            player.character.combatStats.combat.attackSpeed += stat.value;
            break;
          case OffenseStat.ACCURACY:
            player.character.combatStats.combat.accuracy += stat.value;
            break;
        }
      });
    }

    if (item.stats.defence) {
      item.stats.defence.map((stat) => {
        switch (stat.name) {
          case DefenceStat.ARMOR:
            player.character.combatStats.defenses.armor += stat.value;
            break;
          case DefenceStat.EVASION:
            player.character.combatStats.defenses.evasion += stat.value;
            break;
          case DefenceStat.MAGIC_RESIST:
            player.character.combatStats.defenses.magicResistance += stat.value;
            break;
          case DefenceStat.BLOCK_CHANCE:
            player.character.combatStats.combat.blockChance += stat.value;
            break;
          case DefenceStat.PARRY_CHANCE:
            player.character.combatStats.combat.parryChance += stat.value;
            break;
        }
      });
    }

    if (item.stats.attributes) {
      item.stats.attributes.map((stat) => {
        switch (stat.name) {
          case AttributeStat.STRENGTH:
            player.character.combatStats.stats.strength += stat.value;
            break;
          case AttributeStat.DEXTERITY:
            player.character.combatStats.stats.dexterity += stat.value;
            break;
          case AttributeStat.INTELLIGENCE:
            player.character.combatStats.stats.intelligence += stat.value;
            break;
          case AttributeStat.ENDURANCE:
            player.character.combatStats.stats.endurance += stat.value;
            break;
          case AttributeStat.AGILITY:
            player.character.combatStats.stats.agility += stat.value;
            break;
          case AttributeStat.LUCK:
            player.character.combatStats.stats.luck += stat.value;
            break;
        }
      });
    }

    if (item.stats.resists) {
      item.stats.resists.map((stat) => {
        switch (stat.name) {
          case ResistStat.FIRE_RES:
            player.character.combatStats.resistances.fireResistance +=
              stat.value;
            break;
          case ResistStat.ICE_RES:
            player.character.combatStats.resistances.iceResistance +=
              stat.value;
            break;
          case ResistStat.LIGHTNING_RES:
            player.character.combatStats.resistances.lightningResistance +=
              stat.value;
            break;
          case ResistStat.POISON_RES:
            player.character.combatStats.resistances.poisonResistance +=
              stat.value;
            break;
          case ResistStat.BLEED_RES:
            player.character.combatStats.resistances.bleedResistance +=
              stat.value;
            break;
          case ResistStat.STUN_RES:
            player.character.combatStats.resistances.stunResistance +=
              stat.value;
            break;
          case ResistStat.CONFUSE_RES:
            player.character.combatStats.resistances.confuseResistance +=
              stat.value;
            break;
          case ResistStat.SILENCE_RES:
            player.character.combatStats.resistances.silenceResistance +=
              stat.value;
            break;
        }
      });
    }

    return player;
  }

  removeStats(item: any, player: User) {
    if (Object.keys(item).length === 0) {
      console.log('The object is empty');
    } else {
      if (item?.stats.offense) {
        item.stats.offense.map((stat) => {
          switch (stat.name) {
            case OffenseStat.CRIT_CHANCE:
              player.character.combatStats.combat.criticalHitChance -= stat.value;
              break;
            case OffenseStat.CRIT_DAMAGE:
              player.character.combatStats.combat.criticalHitDamage -= stat.value;
              break;
            case OffenseStat.ATTACK_SPEED:
              player.character.combatStats.combat.attackSpeed -= stat.value;
              break;
            case OffenseStat.ACCURACY:
              player.character.combatStats.combat.accuracy -= stat.value;
              break;
          }
        });
      }
  
      if (item?.stats.defence) {
        item.stats.defence.map((stat) => {
          switch (stat.name) {
            case DefenceStat.ARMOR:
              player.character.combatStats.defenses.armor -= stat.value;
              break;
            case DefenceStat.EVASION:
              player.character.combatStats.defenses.evasion -= stat.value;
              break;
            case DefenceStat.MAGIC_RESIST:
              player.character.combatStats.defenses.magicResistance -= stat.value;
              break;
            case DefenceStat.BLOCK_CHANCE:
              player.character.combatStats.combat.blockChance -= stat.value;
              break;
            case DefenceStat.PARRY_CHANCE:
              player.character.combatStats.combat.parryChance -= stat.value;
              break;
          }
        });
      }
  
      if (item?.stats.attributes) {
        item.stats.attributes.map((stat) => {
          switch (stat.name) {
            case AttributeStat.STRENGTH:
              player.character.combatStats.stats.strength -= stat.value;
              break;
            case AttributeStat.DEXTERITY:
              player.character.combatStats.stats.dexterity -= stat.value;
              break;
            case AttributeStat.INTELLIGENCE:
              player.character.combatStats.stats.intelligence -= stat.value;
              break;
            case AttributeStat.ENDURANCE:
              player.character.combatStats.stats.endurance -= stat.value;
              break;
            case AttributeStat.AGILITY:
              player.character.combatStats.stats.agility -= stat.value;
              break;
            case AttributeStat.LUCK:
              player.character.combatStats.stats.luck -= stat.value;
              break;
          }
        });
      }
  
      if (item?.stats.resists) {
        item.stats.resists.map((stat) => {
          switch (stat.name) {
            case ResistStat.FIRE_RES:
              player.character.combatStats.resistances.fireResistance -=
                stat.value;
              break;
            case ResistStat.ICE_RES:
              player.character.combatStats.resistances.iceResistance -=
                stat.value;
              break;
            case ResistStat.LIGHTNING_RES:
              player.character.combatStats.resistances.lightningResistance -=
                stat.value;
              break;
            case ResistStat.POISON_RES:
              player.character.combatStats.resistances.poisonResistance -=
                stat.value;
              break;
            case ResistStat.BLEED_RES:
              player.character.combatStats.resistances.bleedResistance -=
                stat.value;
              break;
            case ResistStat.STUN_RES:
              player.character.combatStats.resistances.stunResistance -=
                stat.value;
              break;
            case ResistStat.CONFUSE_RES:
              player.character.combatStats.resistances.confuseResistance -=
                stat.value;
              break;
            case ResistStat.SILENCE_RES:
              player.character.combatStats.resistances.silenceResistance -=
                stat.value;
              break;
          }
        });
      }
    }

    return player;
  }
}
