import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { Firemaking } from './entities/firemaking.entity';

@Injectable()
export class FiremakingService {

    firemakingUsers: Firemaking[] = [];
    timeLeft: number = 10;
    clientToUser = {};

  constructor(private usersService: UsersService) {}

  async addToActive(activeLog: Firemaking) {
    const user: Firemaking = activeLog;

    let returnedData: any = {
      updateMessage: '',
      firemakingUsers: {},
    };

    if (this.firemakingUsers.some((firemaker) => firemaker.username === user.username)) {
      if (
        this.firemakingUsers.some(
          (firemaker) => firemaker.timestamp + 11 < user.timestamp,
        )
      ) {
        returnedData.firemakingUsers =
          await this.usersService.updateFiremakingByUsername(user);
      }
    } else {
      this.firemakingUsers.push(user);
      returnedData.firemakingUsers = await this.usersService.updateFiremakingByUsername(user);
    }

    returnedData.updateMessage = `You gain ${user.type.reward}x ${returnedData.firemakingUsers.ashes.name} and ${user.type.xp} XP!`;

    return returnedData;
  }
}
