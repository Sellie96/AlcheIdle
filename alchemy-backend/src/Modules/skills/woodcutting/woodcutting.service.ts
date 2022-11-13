import { Injectable } from '@nestjs/common';
import { Woodcutting } from './entities/message.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class WoodcuttingService {

  woodCuttingUsers: Woodcutting[] = [];
  startWoodcutting: boolean = true;
  timeLeft: number = 10;
  clientToUser = {};

  constructor(private usersService: UsersService) {}
  
  async addToWoodcuttingActive(activeWoodcutter: Woodcutting) {
    const user: Woodcutting = activeWoodcutter;

    let returnedData:any = {
      updateMessage: '',
      woodcuttingUsers: {},
    };

    if(this.woodCuttingUsers.some(
      (woodcutter) => woodcutter.username === user.username)) {
        if(this.woodCuttingUsers.some(
          (woodcutter) => woodcutter.timestamp + 11 < user.timestamp)) {
            returnedData.woodcuttingUsers = await this.usersService.updateWoodcuttingByUsername(user);
          }
      } else {
      this.woodCuttingUsers.push(user);
      returnedData.woodcuttingUsers = await this.usersService.updateWoodcuttingByUsername(user);
    }

    returnedData.updateMessage = `You gain ${returnedData.woodcuttingUsers.logAmount}x ${user.treeType.reward} and ${user.treeType.xp} XP!`;

    return returnedData;
  }
}
