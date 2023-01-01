import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Item } from './shop.controller';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  ironAxe = {
    name: 'Iron Axe',
    bonus: 0.95,
  };

  steelAxe = {
    name: 'Steel Axe',
    bonus: 0.9,
  };

  crystalAxe = {
    name: 'Crystal Axe',
    bonus: 0.8,
  };

  smallPotion = {
    name: 'Small Potion',
    amount: 1,
    value: 10,
    restores: 10,
  };

  async buyItem(username: string, item: Item) {
    let userData = await this.usersRepository.findOneBy({ username: username });
    let response: any;

    switch (item.name) {
      case 'Iron Axe':
        response = this.buyItemUpdate(userData, item, this.ironAxe);
        return response;
      case 'Steel Axe':
        response = this.buyItemUpdate(userData, item, this.steelAxe);
        return response;
      case 'Crystal Axe':
        response = this.buyItemUpdate(userData, item, this.crystalAxe);
        return response;
      case 'Small Potion':
        response = this.buyPotionUpdate(userData, item, this.smallPotion);
    }

    return response;
  }

  buyItemUpdate(userData: User, item: Item, itemToBuy: any) {
    if (userData.character.combatStats.progression.gold >= item.value) {
      userData.character.combatStats.progression.gold -= item.value;

      userData.character.skills.woodcutting.tool = itemToBuy;

      this.usersRepository.update(
        { username: userData.username },
        {
          character: userData.character,
        },
      );

      return { message: 'Item bought', userData: userData };
    } else {
      return {
        message: 'You do not have enough gold to buy this item.',
        userData: userData,
      };
    }
  }

  buyPotionUpdate(userData: User, item: Item, itemToBuy: any) {
    if (userData.character.combatStats.progression.gold >= item.value) {
      userData.character.combatStats.progression.gold -= item.value;

      if (
        userData.character.backpack.some((item) => item.name === itemToBuy.name)
      ) {
        let indexOfItem: number = userData.character.backpack.findIndex(
          (item: any) => item.name === itemToBuy.name,
        );
        userData.character.backpack[indexOfItem].amount += itemToBuy.amount;
      } else {
        userData.character.backpack.push(itemToBuy);
      }

      this.usersRepository.update(
        { username: userData.username },
        {
          character: userData.character,
        },
      );

      return { message: 'Item bought', userData: userData };
    } else {
      return {
        message: 'You do not have enough gold to buy this item.',
        userData: userData,
      };
    }
  }
}
