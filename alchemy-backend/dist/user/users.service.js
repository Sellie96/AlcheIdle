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
const items_service_1 = require("../Modules/combat/items.service");
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
    updateOne(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersRepository.update({ username: user.username }, {
                character: user.character,
            });
        });
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
    useItem(user, item) {
        const itemToUse = user.character.backpack.find((backpackItem) => item.itemName === backpackItem.name);
        if (itemToUse) {
            if (user.character.combatStats.stats.health >= user.character.combatStats.stats.maxHealth) {
                return "You are already at full health!";
            }
            else {
                itemToUse.amount -= 1;
                user.character.combatStats.stats.health += itemToUse.healAmount;
                if (user.character.combatStats.stats.health > user.character.combatStats.stats.maxHealth) {
                    user.character.combatStats.stats.health = user.character.combatStats.stats.maxHealth;
                }
            }
        }
        else {
            return "You have no more items!";
        }
        if (itemToUse.amount <= 0) {
            user.character.backpack = user.character.backpack.filter((item) => item.name !== itemToUse.name);
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