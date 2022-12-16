import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { Cooking } from './entities/cooking.entity';

@Injectable()
export class CookingService {

    cookingUsers: Cooking[] = [];
    timeLeft: number = 10;
    clientToUser = {};

  constructor(private usersService: UsersService) {}

  async addToActive(activeLog: Cooking) {
    const user: Cooking = activeLog;

    let returnedData: any = {
      updateMessage: '',
      cookingUsers: {},
    };

    if (this.cookingUsers.some((cooker) => cooker.username === user.username)) {
      if (
        this.cookingUsers.some(
          (cooker) => cooker.timestamp + 11 < user.timestamp,
        )
      ) {
        returnedData.cookingUsers =
          await this.usersService.updateCookingByUsername(user);
      }
    } else {
      this.cookingUsers.push(user);
      returnedData.cookingUsers = await this.usersService.updateCookingByUsername(user);
    }

    returnedData.updateMessage = `You gain ${returnedData.cookingUsers.reward.amount}x ${returnedData.cookingUsers.reward.name} and ${user.type.xp} XP!`;

    return returnedData;
  }
}
