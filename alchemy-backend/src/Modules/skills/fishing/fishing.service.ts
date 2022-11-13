import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { Fishing } from './entities/fishing.entity';

@Injectable()
export class FishingService {

  fishingUsers: Fishing[] = [];
  timeLeft: number = 10;
  clientToUser = {};

  constructor(private usersService: UsersService) {}
  
  async addToFishingActive(activeFish: Fishing) {
    const user: Fishing = activeFish;

    let returnedData:any = {
      updateMessage: '',
      fishingUsers: {},
    };

    if(this.fishingUsers.some(
      (fisher) => fisher.username === user.username)) {
        if(this.fishingUsers.some(
          (fisher) => fisher.timestamp + 11 < user.timestamp)) {
            returnedData.fishingUsers = await this.usersService.updateFishingByUsername(user);
          }
      } else {
      this.fishingUsers.push(user);
      returnedData.fishingUsers = await this.usersService.updateFishingByUsername(user);
    }

    returnedData.updateMessage = `You gain ${returnedData.fishingUsers.fishAmount}x ${user.fishType.reward} and ${user.fishType.xp} XP!`;

    return returnedData;
  }
}