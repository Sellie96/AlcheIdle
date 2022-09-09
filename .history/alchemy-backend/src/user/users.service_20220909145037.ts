import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterData } from './register.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username: username });
  }

  async updateOneByUsername(username: string) {
    //update woodcuttingxp in mongodb

    console.log(username);
    await this.usersRepository.update(username, { username: 'Sellie96' });


    return this.usersRepository.save(user);

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
    let user: User = {
      username: registerData.username,
      password: await bcrypt.hash(registerData.password, 10),
      asActive: true,
      character: {
        characterName: registerData.characterName,
        characterAlignment: registerData.characterAlignment,
        currencies: {
          gold: 1,
          energy: 1,
          lifeForce: 1,
          gems: 1,
        },
        skills: {
          agility: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          alchemy: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          cooking: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          crafting: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          firemaking: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          fishing: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          fletching: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          herblore: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          mining: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          runecrafting: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          smithing: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          thieving: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
          woodcutting: {
            level: 1,
            xpMax: 1,
            xpCurrent: 1,
          },
        },
        backpack: [],
        equipment: [],
      },
    };
    return this.usersRepository.save(user);
  }
}
