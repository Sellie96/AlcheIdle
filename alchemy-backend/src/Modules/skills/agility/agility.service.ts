import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { Agility } from './entities/message.entity';

@Injectable()
export class AgilityService {
  agilityUsers: Agility[] = [];
  startAgility: boolean = true;
  timeLeft: number = 10;
  clientToUser = {};

  constructor(private usersService: UsersService) {}
  
  async addToActive(activeRunner: Agility) {
    const user: Agility = activeRunner;

    let returnedData:any = {
      updateMessage: '',
      agilityUsers: {},
    };

    if(this.agilityUsers.some(
      (runners) => runners.username === user.username)) {
        if(this.agilityUsers.some(
          (runners) => runners.timestamp + 11 < user.timestamp)) {
            returnedData.agilityUsers = await this.usersService.updateSkillByUsername(user);
          }
      } else {
      this.agilityUsers.push(user);
      returnedData.agilityUsers = await this.usersService.updateSkillByUsername(user);
    }

    returnedData.updateMessage = `You gain ${returnedData.agilityUsers.marksAmount}x Agility Marks and ${user.courseType.xp} XP!`;

    return returnedData;
  }
}
