"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const userDefault_1 = require("./userDefault");
const messages_gateway_1 = require("../Modules/messages/messages.gateway");
const messages_service_1 = require("../Modules/messages/messages.service");
const message_entity_1 = require("../Modules/skills/woodcutting/entities/message.entity");
const thieving_entity_1 = require("../Modules/skills/thieving/entities/thieving.entity");
const fishing_entity_1 = require("../Modules/skills/fishing/entities/fishing.entity");
const message_entity_2 = require("../Modules/skills/mining/entities/message.entity");
const message_entity_3 = require("../Modules/skills/agility/entities/message.entity");
const firemaking_entity_1 = require("../Modules/skills/firemaking/entities/firemaking.entity");
const cooking_entity_1 = require("../Modules/skills/cooking/entities/cooking.entity");
let UsersService = class UsersService {
    constructor(usersRepository, messagesService, messagesGateway) {
        this.usersRepository = usersRepository;
        this.messagesService = messagesService;
        this.messagesGateway = messagesGateway;
    }
    findAll() {
        return this.usersRepository.find({ select: ['character']
        });
    }
    findOne(id) {
        return this.usersRepository.findOneBy({ id });
    }
    findOneByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.findOneBy({ username: username });
        });
    }
    updateWoodcuttingByUsername(woodcutter) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOneByUsername(woodcutter.username);
            console.log(woodcutter);
            user.character.skills.woodcutting.xpCurrent += +woodcutter.type.xp;
            const logAmount = user.character.skills.woodcutting.pet ? (Math.random() > 0.8 ? 2 : 1) : 1;
            let logs;
            switch (woodcutter.type.reward) {
                case message_entity_1.Logs.normal.name:
                    logs = message_entity_1.Logs.normal;
                    break;
                case message_entity_1.Logs.oak.name:
                    logs = message_entity_1.Logs.oak;
                    break;
                case message_entity_1.Logs.willow.name:
                    logs = message_entity_1.Logs.willow;
                    break;
                case message_entity_1.Logs.bonsai.name:
                    logs = message_entity_1.Logs.bonsai;
                    break;
                case message_entity_1.Logs.yew.name:
                    logs = message_entity_1.Logs.yew;
                    break;
                case message_entity_1.Logs.magic.name:
                    logs = message_entity_1.Logs.magic;
                    break;
                case message_entity_1.Logs.demonic.name:
                    logs = message_entity_1.Logs.demonic;
                    break;
                case message_entity_1.Logs.divine.name:
                    logs = message_entity_1.Logs.divine;
                    break;
            }
            const existingItem = user.character.backpack.find((item) => item.name === woodcutter.type.reward);
            if (existingItem) {
                existingItem.amount += logAmount;
            }
            else {
                user.character.backpack.push(logs);
            }
            if ((Math.random() * (10000 - 1) + 1) === 69) {
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
            yield this.usersRepository.update({ username: woodcutter.username }, {
                character: user.character,
            });
            this.messagesGateway.findAll();
            const returnedObject = {
                user: user,
                logAmount: logAmount,
            };
            return returnedObject;
        });
    }
    shouldLevelup(skill) {
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
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersRepository.delete(id);
        });
    }
    doesUserExist(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.usersRepository.findOneBy({ username: username })) {
                console.log('User exists');
                return true;
            }
            else {
                console.log('User does not exist');
                return false;
            }
        });
    }
    register(registerData) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield (0, userDefault_1.UserDataCreation)(registerData);
            this.messagesService.create({
                name: 'Server',
                message: `${user.username} has joined the game!`,
                time: new Date().toISOString().split('T')[1].split('.')[0],
            });
            return this.usersRepository.save(user);
        });
    }
    updateThievingByUsername(thief) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOneByUsername(thief.username);
            user.character.skills.thieving.xpCurrent += +thief.thievingOption.xp;
            let gold = thief.thievingOption.reward;
            if (user.character.skills.thieving.pet) {
                if ((Math.random() * (10 - 1) + 1) > 8)
                    gold = gold * 2;
            }
            else {
                gold;
            }
            user.character.currencies.gold += gold;
            user.character.combatStats.hpCurrent -= thief.thievingOption.damage;
            if (user.character.combatStats.hpCurrent <= 0) {
                user.character.combatStats.hpCurrent = user.character.combatStats.hpMax;
            }
            if ((Math.random() * (10 - 1) + 1) === 9) {
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
            yield this.usersRepository.update({ username: thief.username }, {
                character: user.character,
            });
            this.messagesGateway.findAll();
            const returnedObject = {
                user: user,
                gold: gold,
            };
            return returnedObject;
        });
    }
    updateFishingByUsername(fisher) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOneByUsername(fisher.username);
            user.character.skills.fishing.xpCurrent += +fisher.fishType.xp;
            let fishAmount = 1;
            if (user.character.skills.fishing.pet) {
                if ((Math.random() * (10 - 1) + 1) > 8)
                    fishAmount = 2;
            }
            else {
                fishAmount = 1;
            }
            let fish;
            switch (fisher.fishType.reward) {
                case fishing_entity_1.Fishes.prawn.name:
                    fish = fishing_entity_1.Fishes.prawn;
                    break;
                case fishing_entity_1.Fishes.trout.name:
                    fish = fishing_entity_1.Fishes.trout;
                    break;
                case fishing_entity_1.Fishes.salmon.name:
                    fish = fishing_entity_1.Fishes.salmon;
                    break;
                case fishing_entity_1.Fishes.lobster.name:
                    fish = fishing_entity_1.Fishes.lobster;
                    break;
                case fishing_entity_1.Fishes.swordfish.name:
                    fish = fishing_entity_1.Fishes.swordfish;
                    break;
                case fishing_entity_1.Fishes.shark.name:
                    fish = fishing_entity_1.Fishes.shark;
                    break;
                case fishing_entity_1.Fishes.whale.name:
                    fish = fishing_entity_1.Fishes.whale;
                    break;
                case fishing_entity_1.Fishes.kraken.name:
                    fish = fishing_entity_1.Fishes.kraken;
                    break;
            }
            if (user.character.backpack.some((item) => item.name === fisher.fishType.reward)) {
                let indexOfItem = user.character.backpack.findIndex((item) => item.name === fisher.fishType.reward);
                user.character.backpack[indexOfItem].amount += fishAmount;
            }
            else {
                user.character.backpack.push(fish);
            }
            if ((Math.random() * (10000 - 1) + 1) === 69) {
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
            yield this.usersRepository.update({ username: fisher.username }, {
                character: user.character,
            });
            this.messagesGateway.findAll();
            const returnedObject = {
                user: user,
                fishAmount: fishAmount,
            };
            return returnedObject;
        });
    }
    updateMiningByUsername(miner) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOneByUsername(miner.username);
            user.character.skills.mining.xpCurrent += +miner.oreType.xp;
            let oreAmount = 1;
            if (user.character.skills.mining.pet) {
                if ((Math.random() * (10 - 1) + 1) > 8)
                    oreAmount = 2;
            }
            else {
                oreAmount = 1;
            }
            let ore = {
                name: miner.oreType.reward,
                amount: oreAmount,
                value: miner.oreType.value,
            };
            if (user.character.backpack.some((item) => item.name === miner.oreType.reward)) {
                let indexOfItem = user.character.backpack.findIndex((item) => item.name === miner.oreType.reward);
                user.character.backpack[indexOfItem].amount += oreAmount;
            }
            else {
                user.character.backpack.push(ore);
            }
            if ((Math.random() * (10000 - 1) + 1) === 69) {
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
            yield this.usersRepository.update({ username: miner.username }, {
                character: user.character,
            });
            this.messagesGateway.findAll();
            const returnedObject = {
                user: user,
                oreAmount: oreAmount,
            };
            return returnedObject;
        });
    }
    updateAgilityByUsername(agility) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOneByUsername(agility.username);
            user.character.skills.agility.xpCurrent += +agility.courseType.xp;
            let marksAmount = 1;
            if (user.character.skills.agility.pet) {
                if ((Math.random() * (10 - 1) + 1) > 8)
                    marksAmount = marksAmount * 2;
            }
            let marks = {
                name: "Agility Marks",
                amount: marksAmount,
                value: agility.courseType.value,
            };
            if (user.character.backpack.some((item) => item.name === "Agility Marks")) {
                let indexOfItem = user.character.backpack.findIndex((item) => item.name === "Agility Marks");
                user.character.backpack[indexOfItem].amount += marksAmount;
            }
            else {
                user.character.backpack.push(marks);
            }
            if ((Math.random() * (10000 - 1) + 1) === 69) {
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
            yield this.usersRepository.update({ username: agility.username }, {
                character: user.character,
            });
            this.messagesGateway.findAll();
            const returnedObject = {
                user: user,
                marksAmount: marksAmount,
            };
            return returnedObject;
        });
    }
    updateFiremakingByUsername(firemaking) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOneByUsername(firemaking.username);
            user.character.skills.firemaking.xpCurrent += +firemaking.type.xp;
            let ashesAmount = 1;
            if (user.character.skills.firemaking.pet) {
                if ((Math.random() * (10 - 1) + 1) > 8)
                    ashesAmount = ashesAmount * 2;
            }
            let ashes = {
                name: "Ashes",
                amount: ashesAmount,
                value: firemaking.type.value,
            };
            if (user.character.backpack.some((item) => item.name === "Ashes")) {
                let indexOfItem = user.character.backpack.findIndex((item) => item.name === "Ashes");
                user.character.backpack[indexOfItem].amount += ashesAmount;
            }
            else {
                user.character.backpack.push(ashes);
            }
            if (user.character.backpack.some((item) => item.name === firemaking.type.name)) {
                let indexOfItem = user.character.backpack.findIndex((item) => item.name === firemaking.type.name);
                user.character.backpack[indexOfItem].amount -= 1;
            }
            else {
                return "You don't have any logs to burn!";
            }
            if ((Math.random() * (10000 - 1) + 1) === 69) {
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
            yield this.usersRepository.update({ username: firemaking.username }, {
                character: user.character,
            });
            this.messagesGateway.findAll();
            const returnedObject = {
                user: user,
                ashes: ashes,
                ashesAmount: ashesAmount,
            };
            return returnedObject;
        });
    }
    updateCookingByUsername(cooking) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOneByUsername(cooking.username);
            user.character.skills.cooking.xpCurrent += +cooking.type.xp;
            let rawFoodAmount = 1;
            if (user.character.skills.cooking.pet) {
                if ((Math.random() * (10 - 1) + 1) > 8)
                    rawFoodAmount = rawFoodAmount * 2;
            }
            let reward = {
                name: `Cooked ${cooking.type.name}`,
                amount: rawFoodAmount,
                value: cooking.type.value,
            };
            if (user.character.backpack.some((item) => item.name === `Cooked ${cooking.type.name}`)) {
                let indexOfItem = user.character.backpack.findIndex((item) => item.name === `Cooked ${cooking.type.name}`);
                user.character.backpack[indexOfItem].amount += rawFoodAmount;
            }
            else {
                user.character.backpack.push(reward);
            }
            if (user.character.backpack.some((item) => item.name === cooking.type.name)) {
                let indexOfItem = user.character.backpack.findIndex((item) => item.name === cooking.type.name);
                user.character.backpack[indexOfItem].amount -= 1;
            }
            else {
                return "You don't have any fish to burn!";
            }
            if ((Math.random() * (10000 - 1) + 1) === 69) {
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
            yield this.usersRepository.update({ username: cooking.username }, {
                character: user.character,
            });
            this.messagesGateway.findAll();
            const returnedObject = {
                user: user,
                reward: reward,
                amount: reward.amount,
            };
            return returnedObject;
        });
    }
    updateSkillByUsername(skill) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOneByUsername(skill.username);
            user.character.skills[skill.type.skillType].xpCurrent += +skill.type.xp;
            let rewardAmount = 1;
            if (user.character.skills[skill.type.skillType].pet) {
                if ((Math.random() * (10 - 1) + 1) > 8)
                    rewardAmount = rewardAmount * 2;
            }
            let reward = {
                name: `${skill.type.name}`,
                amount: rewardAmount,
                value: skill.type.value,
            };
            this.addItemToBackpack(user, skill, reward, rewardAmount);
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
            yield this.usersRepository.update({ username: skill.username }, {
                character: user.character,
            });
            this.messagesGateway.findAll();
            const returnedObject = {
                user: user,
                reward: reward,
                amount: reward.amount,
            };
            return returnedObject;
        });
    }
    addItemToBackpack(user, skill, reward, rewardAmount) {
        const item = user.character.backpack.find((item) => item.name === skill.type.name);
        if (item) {
            item.amount += rewardAmount;
            console.log(reward);
        }
        else {
            console.log(reward);
            user.character.backpack.push(reward);
        }
    }
    removeItemFromBackpack(user, skill) {
        const item = user.character.backpack.find((item) => item.name === skill.type.name);
        if (item) {
            item.amount -= 1;
        }
        else {
            return "You have no more items!";
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        messages_service_1.MessagesService,
        messages_gateway_1.MessagesGateway])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map