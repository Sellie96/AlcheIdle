import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user-input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { name } = createUserInput;
    const user = this.userRepository.create({
      id: randomUUID(),
      name,
    });

    return this.userRepository.save(user);
  }

  async assignCharactersToUser(userId: string, characterIds: string[]): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId });
    user.characters = characterIds;
    return this.userRepository.save(user);
  }
}
