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
  
  addToWoodcuttingActive(activeWoodcutter: Woodcutting) {
    const user: Woodcutting = activeWoodcutter;

    if(this.woodCuttingUsers.some(
      (woodcutter) => woodcutter.username === user.username)) {
        console.log('Username already exists');
      } else {
      this.woodCuttingUsers.push(user);
    }

    if(this.startWoodcutting) {
      this.updateWoodcuttingXp();
      this.startWoodcutting = false;
    }

    return this.woodCuttingUsers;
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

  @Cron(CronExpression.EVERY_10_SECONDS)
  updateWoodcuttingXp() {
    for (let i = 0; i < this.woodCuttingUsers.length; i++) {
      this.usersService.updateWoodcuttingByUsername(this.woodCuttingUsers[i]);
    }
  }
}
