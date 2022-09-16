import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterData } from './register.interface';
import { UserDataCreation } from './userDefault';
import { MessagesGateway } from 'src/Modules/messages/messages.gateway';
import { MessagesService } from 'src/Modules/messages/messages.service';
import { Woodcutting } from 'src/Modules/skills/woodcutting/entities/message.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private messagesService: MessagesService,
    private messagesGateway: MessagesGateway
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username: username });
  }

  async updateWoodcuttingByUsername(woodcutter: Woodcutting) {
    let user = await this.findOneByUsername(woodcutter.username);

    user.character.skills.woodcutting.xpCurrent += +woodcutter.treeType.xp;

    if (
      user.character.skills.woodcutting.xpCurrent >=
      user.character.skills.woodcutting.level * 10
    ) {
      user.character.skills.woodcutting.xpCurrent = 0;
      user.character.skills.woodcutting.level += 1;

      this.messagesService.create({
        name: 'Server',
        message: `${woodcutter.username} has advanced woodcutting to level ${user.character.skills.woodcutting.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });

      this.messagesGateway.findAll();
    }

    await this.usersRepository.update(
      { username: woodcutter.username },
      {
        character: user.character,
      },
    );
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async doesUserExist(username: string): Promise<boolean> {
    if (await this.usersRepository.findOneBy({ username: username })) {
      console.log('User exists');
      return true;
    } else {
      console.log('User does not exist');
      return false;
    }
  }

  async register(registerData: RegisterData) {
    let user: User = await UserDataCreation(registerData)

    this.messagesService.create({
      name: 'Server',
      message: `${user.username} has joined the game!`,
      time: new Date().toISOString().split('T')[1].split('.')[0],
    });

    return this.usersRepository.save(user);
  }
}
