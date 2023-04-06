import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { Mining } from './entities/message.entity';

@Injectable()
export class MiningService {

  miningUsers: Mining[] = [];
  startMining: boolean = true;
  timeLeft: number = 10;
  clientToUser = {};

  constructor(private usersService: UsersService) {}
  
  async addToActive(activeMiner: Mining) {
    const user: Mining = activeMiner;

    let returnedData:any = {
      updateMessage: '',
      miningUsers: {},
    };

    if(this.miningUsers.some(
      (miners) => miners.username === user.username)) {
        if(this.miningUsers.some(
          (miners) => miners.timestamp + 11 < user.timestamp)) {
            returnedData.miningUsers = await this.usersService.updateSkillByUsername(user);
          }
      } else {
      this.miningUsers.push(user);
      returnedData.miningUsers = await this.usersService.updateSkillByUsername(user);
    }

    returnedData.updateMessage = `You gain ${returnedData.miningUsers.oreAmount}x ${user.oreType.reward} and ${user.oreType.xp} XP!`;

    return returnedData;
  }
}
