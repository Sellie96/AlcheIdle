import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private messages: Message[] = [];
  private clientToUser = {};

  constructor() {}

  create(createMessageDto: CreateMessageDto) {
    const message = {
      ...createMessageDto,
      time: new Date().toISOString().split('T')[1].split('.')[0],
    };
    this.messages.push(message);
    
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
    return this.messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}