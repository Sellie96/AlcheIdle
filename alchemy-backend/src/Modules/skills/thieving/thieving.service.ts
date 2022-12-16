import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { Thieving } from './entities/thieving.entity';

@Injectable()
export class ThievingService {

  thievingUsers: Map<string, Thieving> = new Map();
  timeLeft: number = 10;
  clientToUser = {};

  constructor(private usersService: UsersService) {}
  
  async addToActive(activeThief: Thieving) {
    const user: Thieving = activeThief;

    let returnedData:any = {
      updateMessage: '',
      thievingUsers: {},
    };

    this.thievingUsers.set(user.username, user);
    
    returnedData.thievingUsers = await this.usersService.updateThievingByUsername(user);
  

    returnedData.updateMessage = `You gain ${returnedData.thievingUsers.gold} Gold and ${user.thievingOption.xp} XP!`;

    return returnedData;
  }

}