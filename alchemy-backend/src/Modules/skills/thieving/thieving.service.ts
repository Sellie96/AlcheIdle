import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { Thieving } from './entities/thieving.entity';

@Injectable()
export class ThievingService {

  thievingUsers: Thieving[] = [];
  timeLeft: number = 10;
  clientToUser = {};

  constructor(private usersService: UsersService) {}
  
  async addToThievingActive(activeThief: Thieving) {
    const user: Thieving = activeThief;

    let returnedData:any = {
      updateMessage: '',
      thievingUsers: {},
    };

    if(this.thievingUsers.some(
      (thief) => thief.username === user.username)) {
        if(this.thievingUsers.some(
          (thief) => thief.timestamp + 11 < user.timestamp)) {
            returnedData.thievingUsers = await this.usersService.updateThievingByUsername(user);
          }
      } else {
      this.thievingUsers.push(user);
      returnedData.thievingUsers = await this.usersService.updateThievingByUsername(user);
    }

    returnedData.updateMessage = `You gain ${returnedData.thievingUsers.gold} Gold and ${user.thievingOption.xp} XP!`;

    return returnedData;
  }

  removeThievingUser(username: string) {
    this.thievingUsers = this.thievingUsers.filter(
      (thief) => thief.username !== username
      );
    return this.thievingUsers;
  }

  getThievingUsers() {
    return this.thievingUsers;
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

}