import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterData } from './register.interface';
import { UserDataCreation } from './userDefault';
import { MessagesGateway } from 'src/Modules/messages/messages.gateway';
import { MessagesService } from 'src/Modules/messages/messages.service';
import { Logs, Woodcutting } from 'src/Modules/skills/woodcutting/entities/message.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private messagesService: MessagesService,
    private messagesGateway: MessagesGateway
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({select: ['character']
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async updateOne(user: User) {
    await this.usersRepository.update(
      { username: user.username },
      {
        character: user.character,
      },
    );
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username: username });
  }

  async updateWoodcuttingByUsername(woodcutter: Woodcutting) {
    let user = await this.findOneByUsername(woodcutter.username);
    console.log(woodcutter);
    user.character.skills.woodcutting.xpCurrent += +woodcutter.type.xp;

    const logAmount = user.character.skills.woodcutting.pet ? (Math.random() > 0.8 ? 2 : 1) : 1;

    let logs;

    switch (woodcutter.type.reward) {
      case Logs.normal.name: logs = Logs.normal; break;
      case Logs.oak.name: logs = Logs.oak; break;
      case Logs.willow.name: logs = Logs.willow; break;
      case Logs.bonsai.name: logs = Logs.bonsai; break;
      case Logs.yew.name: logs = Logs.yew; break;
      case Logs.magic.name: logs = Logs.magic; break;
      case Logs.demonic.name: logs = Logs.demonic; break;
      case Logs.divine.name: logs = Logs.divine; break;
    }

    const existingItem = user.character.backpack.find(
      (item) => item.name === woodcutter.type.reward
    );

    if (existingItem) {
      existingItem.amount += logAmount;
    } else {
      user.character.backpack.push(logs);
    }

     if((Math.random() * (10000 - 1) + 1) === 69) {
      user.character.skills.woodcutting.pet = true;
      this.messagesService.create({
        name: 'Server',
        message: `${woodcutter.username} has recieved a Beaver at level ${user.character.skills.woodcutting.level}!`,
        time: new Date().toISOString().substring(11, 19),
      });
    }

    if (user.character.skills.woodcutting.xpCurrent >= this.shouldLevelup(user.character.skills.woodcutting.level)) {
      user.character.skills.woodcutting.level += 1;
      this.messagesService.create({
        name: 'Server',
        message: `${woodcutter.username} has advanced woodcutting to level ${user.character.skills.woodcutting.level}!`,
        time: new Date().toISOString().substring(11, 19),
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

  shouldLevelup(skill: number) {
    let points = 0;
    let output = 0;
    for (let lvl = 1; lvl <= skill; lvl++) {
        points += Math.floor(lvl + 300.0 * Math.pow(2.0, lvl / 7.0));
        if (lvl >= skill) {
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


  async updateSkillByUsername(skill: any) {
    let user = await this.findOneByUsername(skill.username);

    user.character.skills[skill.type.skillType].xpCurrent += +skill.type.xp;

    let rewardAmount = 1;

    if (user.character.skills[skill.type.skillType].pet) {
      if((Math.random() * (10 - 1) + 1) > 8)
      rewardAmount = rewardAmount * 2;
    }

    let reward = {
      name: `${skill.type.name}`,
      amount: rewardAmount,
      value: skill.type.value,
    }

    this.addItemToBackpack(user, skill, reward ,rewardAmount);

    // this.removeItemFromBackpack(user, skill);

    const randomNumber = Math.random() * (10000 - 1) + 1;

    if (randomNumber === 69) {
      user.character.skills[skill.type.skillType].pet = true;
      this.messagesService.create({
        name: 'Server',
        message: `${skill.username} has recieved Lil' Cook at level ${user.character.skills[skill.type.skillType].level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    const currentXP = user.character.skills[skill.type.skillType].xpCurrent;
    const currentLevel = user.character.skills[skill.type.skillType].level;
    
    if (currentXP >= this.shouldLevelup(currentLevel)) {
      user.character.skills[skill.type.skillType].level += 1;
      this.messagesService.create({
        name: 'Server',
        message: `${skill.username} has advanced ${skill.type.skillType} to level ${currentLevel + 1}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    await this.usersRepository.update(
      { username: skill.username },
      {
        character: user.character,
      },
    );

    this.messagesGateway.findAll();

    const returnedObject = {
      user: user,
      reward:  reward,
      amount: reward.amount,
    }

    return returnedObject;
  }


  addItemToBackpack(user: User, skill: { type: { name: any; }; }, reward: any, rewardAmount: number) {
    const item = user.character.backpack.find((item) => item.name === skill.type.name);
    if (item) {
      item.amount += rewardAmount;
      console.log(reward)
    } else {
      console.log(reward)
      user.character.backpack.push(reward);
    }
  }
  
  removeItemFromBackpack(user: User, skill: { type: { name: any; }; }) {
    const item = user.character.backpack.find((item) => item.name === skill.type.name);
    if (item) {
      item.amount -= 1;
    } else {
      return "You have no more items!";
    }
  }

}
