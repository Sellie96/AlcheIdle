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
import { Fishing } from 'src/Modules/skills/fishing/entities/fishing.entity';
import { Mining } from 'src/Modules/skills/mining/entities/message.entity';
import { Agility } from 'src/Modules/skills/agility/entities/message.entity';

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
      name: woodcutter.treeType.reward,
      amount: logAmount,
      value: woodcutter.treeType.value,
    }

    if(user.character.backpack.some((item) => item.name === woodcutter.treeType.reward)) {
      let indexOfItem: number = user.character.backpack.findIndex((item: any) => item.name === woodcutter.treeType.reward);
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

    if (user.character.skills.woodcutting.xpCurrent >= this.shouldLevelup(user.character.skills.woodcutting.level)) {
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


  async updateThievingByUsername(thief: Thieving) {
    let user = await this.findOneByUsername(thief.username);
    user.character.skills.thieving.xpCurrent += +thief.thievingOption.xp;

    let gold = thief.thievingOption.reward;

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

    if (user.character.skills.thieving.xpCurrent >= this.shouldLevelup(user.character.skills.thieving.level)) {
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


  async updateFishingByUsername(fisher: Fishing) {
    let user = await this.findOneByUsername(fisher.username);

    user.character.skills.fishing.xpCurrent += +fisher.fishType.xp;

    let fishAmount = 1;

    if (user.character.skills.fishing.pet) {
      if((Math.random() * (10 - 1) + 1) > 8)
      fishAmount = 2;
    } else {
      fishAmount = 1;
    }

    let fish = {
      name: fisher.fishType.reward,
      amount: fishAmount,
      value: fisher.fishType.value,
    }

    if(user.character.backpack.some((item) => item.name === fisher.fishType.reward)) {
      let indexOfItem: number = user.character.backpack.findIndex((item: any) => item.name === fisher.fishType.reward);
      user.character.backpack[indexOfItem].amount += fishAmount;
    } else {
      user.character.backpack.push(fish);
    }

     if((Math.random() * (10000 - 1) + 1) === 69) {
      user.character.skills.fishing.pet = true;
      this.messagesService.create({
        name: 'Server',
        message: `${fisher.username} has recieved a Crab at level ${user.character.skills.fishing.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    if (user.character.skills.fishing.xpCurrent >= this.shouldLevelup(user.character.skills.fishing.level)) {
      user.character.skills.fishing.xpCurrent = 0;
      user.character.skills.fishing.level += 1;
      this.messagesService.create({
        name: 'Server',
        message: `${fisher.username} has advanced fishing to level ${user.character.skills.fishing.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    await this.usersRepository.update(
      { username: fisher.username },
      {
        character: user.character,
      },
    );

    this.messagesGateway.findAll();

    const returnedObject = {
      user: user,
      fishAmount: fishAmount,
    }

    return returnedObject;
  }


  async updateMiningByUsername(miner: Mining) {
    let user = await this.findOneByUsername(miner.username);

    user.character.skills.mining.xpCurrent += +miner.oreType.xp;

    let oreAmount = 1;

    if (user.character.skills.mining.pet) {
      if((Math.random() * (10 - 1) + 1) > 8)
      oreAmount = 2;
    } else {
      oreAmount = 1;
    }

    let ore = {
      name: miner.oreType.reward,
      amount: oreAmount,
      value: miner.oreType.value,
    }

    if(user.character.backpack.some((item) => item.name === miner.oreType.reward)) {
      let indexOfItem: number = user.character.backpack.findIndex((item: any) => item.name === miner.oreType.reward);
      user.character.backpack[indexOfItem].amount += oreAmount;
    } else {
      user.character.backpack.push(ore);
    }

     if((Math.random() * (10000 - 1) + 1) === 69) {
      user.character.skills.mining.pet = true;
      this.messagesService.create({
        name: 'Server',
        message: `${miner.username} has recieved a Golem at level ${user.character.skills.mining.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    if (user.character.skills.mining.xpCurrent >= this.shouldLevelup(user.character.skills.mining.level)) {
      user.character.skills.mining.xpCurrent = 0;
      user.character.skills.mining.level += 1;
      this.messagesService.create({
        name: 'Server',
        message: `${miner.username} has advanced mining to level ${user.character.skills.mining.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    await this.usersRepository.update(
      { username: miner.username },
      {
        character: user.character,
      },
    );

    this.messagesGateway.findAll();

    const returnedObject = {
      user: user,
      oreAmount: oreAmount,
    }

    return returnedObject;
  }

  async updateAgilityByUsername(agility: Agility) {
    let user = await this.findOneByUsername(agility.username);

    user.character.skills.agility.xpCurrent += +agility.courseType.xp;

    let marksAmount = 1;

    if (user.character.skills.agility.pet) {
      if((Math.random() * (10 - 1) + 1) > 8)
      marksAmount = marksAmount * 2;
    }

    let marks = {
      name: "Agility Marks",
      amount: marksAmount,
      value: agility.courseType.value,
    }

    if(user.character.backpack.some((item) => item.name === "Agility Marks")) {
      let indexOfItem: number = user.character.backpack.findIndex((item: any) => item.name === "Agility Marks");
      user.character.backpack[indexOfItem].amount += marksAmount;
    } else {
      user.character.backpack.push(marks);
    }

     if((Math.random() * (10000 - 1) + 1) === 69) {
      user.character.skills.agility.pet = true;
      this.messagesService.create({
        name: 'Server',
        message: `${agility.username} has recieved a Monkey at level ${user.character.skills.agility.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    if (user.character.skills.agility.xpCurrent >= this.shouldLevelup(user.character.skills.agility.level)) {
      user.character.skills.agility.xpCurrent = 0;
      user.character.skills.agility.level += 1;
      this.messagesService.create({
        name: 'Server',
        message: `${agility.username} has advanced agility to level ${user.character.skills.agility.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    await this.usersRepository.update(
      { username: agility.username },
      {
        character: user.character,
      },
    );

    this.messagesGateway.findAll();

    const returnedObject = {
      user: user,
      marksAmount: marksAmount,
    }

    return returnedObject;
  }
}
