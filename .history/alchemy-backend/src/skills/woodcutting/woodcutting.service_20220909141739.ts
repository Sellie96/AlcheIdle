import { Injectable } from '@nestjs/common';
import { WoodcuttingDto } from './dto/woodcutting.dto';
import { Woodcutting } from './entities/message.entity';

@Injectable()
export class WoodcuttingService {

  woodCuttingUsers: Woodcutting[] = [];

  clientToUser = {};
  
  addToWoodcuttingActive(createMessageDto: WoodcuttingDto) {
    const user = createMessageDto;
    this.woodCuttingUsers.push(user);

    console.log(this.woodCuttingUsers.length);
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
}
