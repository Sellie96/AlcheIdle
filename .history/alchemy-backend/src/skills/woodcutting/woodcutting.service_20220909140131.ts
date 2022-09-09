import { Injectable } from '@nestjs/common';
import { WoodcuttingDto } from './dto/woodcutting.dto';
import { Woodcutting } from './entities/message.entity';

@Injectable()
export class WoodcuttingService {

  woodCuttingUsers: Woodcutting[] = [];

  clientToUser = {};
  
  create(createMessageDto: WoodcuttingDto) {
    const message = createMessageDto;
    this.woodCuttingUsers.push(message);

    console.log(this.woodCuttingUsers);
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
