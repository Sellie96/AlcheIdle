import { Injectable } from '@nestjs/common';
import { Woodcutting } from './entities/message.entity';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class WoodcuttingService {
  woodCuttingUsers: Map<string, Woodcutting> = new Map();
  startWoodcutting: boolean = true;
  timeLeft: number = 10;
  clientToUser = {};

  constructor(private usersService: UsersService) {}

  async addToActive(activeWoodcutter: Woodcutting) {
    const woodcutter: Woodcutting = activeWoodcutter;

    const updatedData: any = {
      updateMessage: '',
      rewards: {},
    };

    this.woodCuttingUsers.set(woodcutter.username, woodcutter);

    updatedData.rewards = await this.usersService.updateSkillByUsername(woodcutter);

    updatedData.updateMessage = `You gain ${updatedData.rewards.reward.amount}x ${woodcutter.type.reward} and ${woodcutter.type.xp} XP!`;

    return updatedData;
  }
}
