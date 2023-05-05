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
exports.CombatService = void 0;
const users_service_1 = require("./../../user/users.service");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../user/user.entity");
const messages_gateway_1 = require("../messages/messages.gateway");
let CombatService = class CombatService {
    constructor(messagesService, usersService) {
        this.messagesService = messagesService;
        this.usersService = usersService;
    }
    updatePlayerLoot(gold, xp, player, monster, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const randomNumber = Math.random();
            let selected = null;
            let cumulativeDropRate = 0;
            if (player.character.backpack.length <
                player.character.combatStats.progression.inventorySize) {
                const totalDropRate = monster.loot.reduce((sum, item) => sum + item.dropChance, 0);
                if (randomNumber < totalDropRate) {
                    for (const item of monster.loot) {
                        cumulativeDropRate += item.dropChance;
                        if (randomNumber < cumulativeDropRate) {
                            selected = item;
                            break;
                        }
                    }
                }
                if ((selected === null || selected === void 0 ? void 0 : selected.name) !== undefined) {
                    player = yield this.usersService.findOneByUsername(player.username);
                    const item = player.character.backpack.find((item) => item.name === selected.name);
                    if (selected.stackable && item) {
                        item.amount += selected.amount;
                    }
                    else {
                        player.character.backpack.push(selected);
                    }
                    player.character.combatStats.progression.experiencePoints += xp;
                    player.character.combatStats.progression.gold += gold;
                    this.checkIfLevelUp(player, client);
                    if (selected.special) {
                        this.messagesService.create({
                            name: 'Server',
                            message: `${player.username} has recieved ${selected.name}`,
                            time: new Date().toISOString().split('T')[1].split('.')[0],
                        });
                    }
                    yield this.usersService.updateOne(player);
                    return [selected];
                }
            }
            yield this.usersService.updateOne(player);
            return [];
        });
    }
    checkIfLevelUp(player, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let total = 0;
            for (let i = 0; i < player.character.combatStats.progression.level; i++) {
                total += Math.floor(i + 300 * Math.pow(2, i / 7));
            }
            if (player.character.combatStats.progression.experiencePoints >= total) {
                player.character.combatStats.progression.level++;
                player.character.combatStats.stats.maxHealth += 10;
                player.character.combatStats.stats.health = player.character.combatStats.stats.maxHealth;
                if (player.character.combatStats.progression.level % 2 === 0) {
                    player.character.combatStats.stats.strength += 1;
                    player.character.combatStats.defenses.evasion += 10;
                }
                this.messagesService.create({
                    name: 'Server',
                    message: `${player.username} has reached level ${player.character.combatStats.progression.level}`,
                    time: new Date().toISOString().split('T')[1].split('.')[0],
                });
                client.emit('levelUp', player.character.combatStats.progression.level);
            }
            yield this.usersService.updateOne(player);
            return;
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
            return 'You have no more items!';
        }
    }
    calculatePlayerHealth(player, monster) {
        let chanceToHit = 0;
        if (monster) {
            if (monster.accuracy > player.character.combatStats.defenses.evasion) {
                chanceToHit =
                    (1 -
                        player.character.combatStats.defenses.evasion /
                            (monster.accuracy * 2)) *
                        100;
            }
            else {
                chanceToHit =
                    (monster.accuracy /
                        (2 * player.character.combatStats.defenses.evasion)) *
                        100;
            }
        }
        else
            chanceToHit = 0;
        if (chanceToHit > Math.random() * 100) {
            let dmgDealt = Math.floor(Math.random() * (monster.attack - 0 + 1)) + 0;
            player.character.combatStats.stats.health -= dmgDealt;
        }
        return player;
    }
    calculateMonsterHealth(player, monster) {
        let chanceToHit = 0;
        if (monster) {
            if (player.character.combatStats.combat.accuracy > monster.evasion) {
                chanceToHit =
                    (1 -
                        monster.evasion /
                            (player.character.combatStats.combat.accuracy * 2)) *
                        100;
            }
            else {
                chanceToHit =
                    (player.character.combatStats.combat.accuracy /
                        (2 * monster.evasion)) *
                        100;
            }
        }
        else
            chanceToHit = 0;
        if (chanceToHit > Math.random() * 100) {
            let dmgDealt = Math.floor(Math.random() * (player.character.combatStats.stats.strength - 0 + 1)) + 0;
            monster.health -= dmgDealt;
        }
        return monster;
    }
};
CombatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [messages_gateway_1.MessagesGateway,
        users_service_1.UsersService])
], CombatService);
exports.CombatService = CombatService;
//# sourceMappingURL=combat.service.js.map