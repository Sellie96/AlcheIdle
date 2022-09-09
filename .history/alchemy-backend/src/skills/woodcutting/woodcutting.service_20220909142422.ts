import { Injectable } from '@nestjs/common';
import { WoodcuttingDto } from './dto/woodcutting.dto';
import { Woodcutting } from './entities/message.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class WoodcuttingService {

  constructor() {}

  woodCuttingUsers: Woodcutting[] = [];

  clientToUser = {};
  
  addToWoodcuttingActive(createMessageDto: WoodcuttingDto) {
    const user = createMessageDto;
    this.woodCuttingUsers.push(user);

    console.log(this.woodCuttingUsers.length);

    this.updateWoodcuttingXp(this.woodCuttingUsers);

    return this.woodCuttingUsers;
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  findAll() {
    console.log(this.woodCuttingUsers);
    return this.woodCuttingUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  @Cron('* * * * * *')
  updateWoodcuttingXp(woodCuttingUsers: Woodcutting[]) {
    for (let i = 0; i < this.woodCuttingUsers.length; i++) {
      console.log(woodCuttingUsers[i].username);
      console.log(woodCuttingUsers[i].message);
      console.log(woodCuttingUsers[i].time);
    }
  }
}
