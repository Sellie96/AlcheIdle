import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterData } from './register.interface';
import { UserDataCreation } from './userDefault';
import { MessagesGateway } from 'src/Modules/messages/messages.gateway';
import { MessagesService } from 'src/Modules/messages/messages.service';
import { Logs, Woodcutting } from 'src/Modules/skills/woodcutting/entities/message.entity';
import { Thieving } from 'src/Modules/skills/thieving/entities/thieving.entity';
import { Fishes, Fishing } from 'src/Modules/skills/fishing/entities/fishing.entity';
import { Mining } from 'src/Modules/skills/mining/entities/message.entity';
import { Agility } from 'src/Modules/skills/agility/entities/message.entity';
import { Firemaking } from 'src/Modules/skills/firemaking/entities/firemaking.entity';
import { Cooking } from 'src/Modules/skills/cooking/entities/cooking.entity';

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

    let fish;

    switch (fisher.fishType.reward) {
      case Fishes.prawn.name: fish = Fishes.prawn; break;
      case Fishes.trout.name: fish = Fishes.trout; break;
      case Fishes.salmon.name: fish = Fishes.salmon; break;
      case Fishes.lobster.name: fish = Fishes.lobster; break;
      case Fishes.swordfish.name: fish = Fishes.swordfish; break;
      case Fishes.shark.name: fish = Fishes.shark; break;
      case Fishes.whale.name: fish = Fishes.whale; break;
      case Fishes.kraken.name: fish = Fishes.kraken; break;
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

  async updateFiremakingByUsername(firemaking: Firemaking) {
    let user = await this.findOneByUsername(firemaking.username);

    user.character.skills.firemaking.xpCurrent += +firemaking.type.xp;

    let ashesAmount = 1;

    if (user.character.skills.firemaking.pet) {
      if((Math.random() * (10 - 1) + 1) > 8)
      ashesAmount = ashesAmount * 2;
    }

    let ashes = {
      name: "Ashes",
      amount: ashesAmount,
      value: firemaking.type.value,
    }

    if(user.character.backpack.some((item) => item.name === "Ashes")) {
      let indexOfItem: number = user.character.backpack.findIndex((item: any) => item.name === "Ashes");
      user.character.backpack[indexOfItem].amount += ashesAmount;
    } else {
      user.character.backpack.push(ashes);
    }

    if(user.character.backpack.some((item) => item.name === firemaking.type.name)) {
      let indexOfItem: number = user.character.backpack.findIndex((item: any) => item.name === firemaking.type.name);
      user.character.backpack[indexOfItem].amount -= 1;
    } else {
      return "You don't have any logs to burn!";
    }

     if((Math.random() * (10000 - 1) + 1) === 69) {
      user.character.skills.firemaking.pet = true;
      this.messagesService.create({
        name: 'Server',
        message: `${firemaking.username} has recieved a Flame Spirit at level ${user.character.skills.firemaking.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    if (user.character.skills.firemaking.xpCurrent >= this.shouldLevelup(user.character.skills.firemaking.level)) {
      user.character.skills.firemaking.level += 1;
      this.messagesService.create({
        name: 'Server',
        message: `${firemaking.username} has advanced Firemaking to level ${user.character.skills.firemaking.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    await this.usersRepository.update(
      { username: firemaking.username },
      {
        character: user.character,
      },
    );

    this.messagesGateway.findAll();

    const returnedObject = {
      user: user,
      ashes:  ashes,
      ashesAmount: ashesAmount,
    }

    return returnedObject;
  }



  async updateCookingByUsername(cooking: Cooking) {
    let user = await this.findOneByUsername(cooking.username);

    user.character.skills.cooking.xpCurrent += +cooking.type.xp;

    let rawFoodAmount = 1;

    if (user.character.skills.cooking.pet) {
      if((Math.random() * (10 - 1) + 1) > 8)
      rawFoodAmount = rawFoodAmount * 2;
    }

    let reward = {
      name: `Cooked ${cooking.type.name}`,
      amount: rawFoodAmount,
      value: cooking.type.value,
    }

    if(user.character.backpack.some((item) => item.name === `Cooked ${cooking.type.name}`)) {
      let indexOfItem: number = user.character.backpack.findIndex((item: any) => item.name === `Cooked ${cooking.type.name}`);
      user.character.backpack[indexOfItem].amount += rawFoodAmount;
    } else {
      user.character.backpack.push(reward);
    }

    if(user.character.backpack.some((item) => item.name === cooking.type.name)) {
      let indexOfItem: number = user.character.backpack.findIndex((item: any) => item.name === cooking.type.name);
      user.character.backpack[indexOfItem].amount -= 1;
    } else {
      return "You don't have any fish to burn!";
    }

     if((Math.random() * (10000 - 1) + 1) === 69) {
      user.character.skills.cooking.pet = true;
      this.messagesService.create({
        name: 'Server',
        message: `${cooking.username} has recieved Lil' Cook at level ${user.character.skills.cooking.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    if (user.character.skills.cooking.xpCurrent >= this.shouldLevelup(user.character.skills.cooking.level)) {
      user.character.skills.cooking.level += 1;
      this.messagesService.create({
        name: 'Server',
        message: `${cooking.username} has advanced Cooking to level ${user.character.skills.cooking.level}!`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
      });
    }

    await this.usersRepository.update(
      { username: cooking.username },
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
