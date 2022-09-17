import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterData } from './register.interface';
import { UserDataCreation } from './userDefault';
import { MessagesGateway } from 'src/Modules/messages/messages.gateway';
import { MessagesService } from 'src/Modules/messages/messages.service';
import { Woodcutting } from 'src/Modules/skills/woodcutting/entities/message.entity';
import { Thieving } from 'src/Modules/skills/thieving/entities/thieving.entity';

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

    let logAmount = 1;

    if (user.character.skills.woodcutting.pet) {
      if((Math.random() * (10 - 1) + 1) > 8)
      logAmount = 2;
    } else {
      logAmount = 1;
    }

    let logs = {
      name: woodcutter.treeType.logs,
      amount: logAmount,
      value: woodcutter.treeType.value,
    }

    if(user.character.backpack.some((item) => item.name === woodcutter.treeType.logs)) {
      let indexOfItem: number = user.character.backpack.findIndex((item: any) => item.name === woodcutter.treeType.logs);
      user.character.backpack[indexOfItem].amount += logAmount;
    } else {
      user.character.backpack.push(logs);
    }

     if((Math.random() * (10000 - 1) + 1) === 69) {
      user.character.skills.woodcutting.pet = true;
      this.messagesService.create({
        name: 'Server',
        message: `${woodcutter.username} has recieved a Beaver at level ${user.character.skills.woodcutting.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    if (user.character.skills.woodcutting.xpCurrent >= this.shouldLevelup(user, 'woodcutting')) {
      user.character.skills.woodcutting.xpCurrent = 0;
      user.character.skills.woodcutting.level += 1;
      this.messagesService.create({
        name: 'Server',
        message: `${woodcutter.username} has advanced woodcutting to level ${user.character.skills.woodcutting.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    await this.usersRepository.update(
      { username: woodcutter.username },
      {
        character: user.character,
      },
    );

    this.messagesGateway.findAll();

    const returnedObject = {
      user: user,
      logAmount: logAmount,
    }

    return returnedObject;
  }

  shouldLevelup(user: User, skill: string) {
    let points = 0;
    let output = 0;
    let skillHolder: any;
    switch (skill) {
      case 'woodcutting': skillHolder = user.character.skills.woodcutting.level; break;
      case 'thieving': skillHolder = user.character.skills.thieving.level; break;
    }
    for (let lvl = 1; lvl <= skillHolder; lvl++) {
        points += Math.floor(lvl + 300.0 * Math.pow(2.0, lvl / 7.0));
        if (lvl >= skillHolder) {
            return output;
        }
        output = Math.floor(points / 4);
    }
    return 0;
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


  async updateThievingByUsername(thief: Thieving) {
    let user = await this.findOneByUsername(thief.username);
    user.character.skills.thieving.xpCurrent += +thief.thievingOption.xp;

    let gold = thief.thievingOption.value;

    if (user.character.skills.thieving.pet) {
      if((Math.random() * (10 - 1) + 1) > 8)
      gold = gold * 2;
    } else {
      gold;
    }

    user.character.currencies.gold += gold;

    user.character.combatStats.hpCurrent -= thief.thievingOption.damage;

    if(user.character.combatStats.hpCurrent <= 0) {
      user.character.combatStats.hpCurrent = user.character.combatStats.hpMax;        //Needs refactor to kill character
    }

     if((Math.random() * (10 - 1) + 1) === 9) {
      user.character.skills.thieving.pet = true;
      this.messagesService.create({
        name: 'Server',
        message: `${thief.username} has recieved a Fox at level ${user.character.skills.thieving.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    if (user.character.skills.thieving.xpCurrent >= this.shouldLevelup(user, 'thieving')) {
      user.character.skills.thieving.xpCurrent = 0;
      user.character.skills.thieving.level += 1;
      this.messagesService.create({
        name: 'Server',
        message: `${thief.username} has advanced Thieving to level ${user.character.skills.thieving.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    await this.usersRepository.update(
      { username: thief.username },
      {
        character: user.character,
      },
    );

    this.messagesGateway.findAll();

    const returnedObject = {
      user: user,
      gold: gold,
    }

    return returnedObject;
  }
}
