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

    returnedData.updateMessage = `You gain ${returnedData.woodcuttingUsers.logAmount}x ${user.treeType.logs} and ${user.treeType.xp} XP!`;

    return returnedData;
  }

  removeWoodcuttingUser(username: string) {
    this.woodCuttingUsers = this.woodCuttingUsers.filter(
      (woodcutter) => woodcutter.username !== username
      );
    return this.woodCuttingUsers;
  }

  getWoodcuttingUsers() {
    return this.woodCuttingUsers;
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

}
