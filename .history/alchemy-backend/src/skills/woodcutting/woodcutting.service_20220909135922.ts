import { Injectable } from '@nestjs/common';
import { WoodcuttingDto } from './dto/woodcutting.dto';
import { Woodcutting } from './entities/message.entity';

@Injectable()
export class WoodcuttingService {

  messages: Woodcutting[] = [];

  clientToUser = {};
  
  create(createMessageDto: WoodcuttingDto) {
    const message = createMessageDto;
    this.messages.push(message);

    console.log(this.messages);
    return this.messages;
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  findAll() {
    console.log(this.messages);
    return this.messages;
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