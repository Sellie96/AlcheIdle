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
exports.CharacterService = void 0;
const items_service_1 = require("./../combat/items.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../user/user.entity");
const typeorm_2 = require("typeorm");
const attributeMap = {
    [items_service_1.OffenseStat.CRIT_CHANCE]: 'criticalHitChance',
    [items_service_1.OffenseStat.CRIT_DAMAGE]: 'criticalHitDamage',
    [items_service_1.OffenseStat.ATTACK_SPEED]: 'attackSpeed',
    [items_service_1.OffenseStat.ACCURACY]: 'accuracy',
    [items_service_1.DefenceStat.ARMOR]: 'armor',
    [items_service_1.DefenceStat.EVASION]: 'evasion',
    [items_service_1.DefenceStat.MAGIC_RESIST]: 'magicResistance',
    [items_service_1.DefenceStat.BLOCK_CHANCE]: 'blockChance',
    [items_service_1.DefenceStat.PARRY_CHANCE]: 'parryChance',
    [items_service_1.AttributeStat.STRENGTH]: 'strength',
    [items_service_1.AttributeStat.DEXTERITY]: 'dexterity',
    [items_service_1.AttributeStat.INTELLIGENCE]: 'intelligence',
    [items_service_1.AttributeStat.ENDURANCE]: 'endurance',
    [items_service_1.AttributeStat.AGILITY]: 'agility',
    [items_service_1.AttributeStat.LUCK]: 'luck',
    [items_service_1.ResistStat.FIRE_RES]: 'fireResistance',
    [items_service_1.ResistStat.ICE_RES]: 'iceResistance',
    [items_service_1.ResistStat.LIGHTNING_RES]: 'lightningResistance',
    [items_service_1.ResistStat.POISON_RES]: 'poisonResistance',
    [items_service_1.ResistStat.BLEED_RES]: 'bleedResistance',
    [items_service_1.ResistStat.STUN_RES]: 'stunResistance',
    [items_service_1.ResistStat.CONFUSE_RES]: 'confuseResistance',
    [items_service_1.ResistStat.SILENCE_RES]: 'silenceResistance',
};
let CharacterService = class CharacterService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    equipItem(username, item) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData = yield this.usersRepository.findOneBy({
                username: username,
            });
            let found = false;
            userData.character.backpack.map((backpackItem) => {
                if (backpackItem.name === item.item.name && !found) {
                    let prevItem = null;
                    switch (item.item.itemType) {
                        case 'Helm':
                            prevItem = userData.character.equipment.head;
                            userData = this.removeStats(prevItem, userData);
                            userData.character.equipment.head = backpackItem;
                            userData = this.addStats(backpackItem, userData);
                            break;
                        case 'Amulet':
                            prevItem = userData.character.equipment.necklace;
                            userData = this.removeStats(prevItem, userData);
                            userData.character.equipment.necklace = backpackItem;
                            userData = this.addStats(backpackItem, userData);
                            break;
                        case 'Body':
                            prevItem = userData.character.equipment.chest;
                            userData = this.removeStats(prevItem, userData);
                            userData.character.equipment.chest = backpackItem;
                            userData = this.addStats(backpackItem, userData);
                            break;
                        case 'Legs':
                            prevItem = userData.character.equipment.legs;
                            userData = this.removeStats(prevItem, userData);
                            userData.character.equipment.legs = backpackItem;
                            userData = this.addStats(backpackItem, userData);
                            break;
                        case 'Gloves':
                            prevItem = userData.character.equipment.hands;
                            userData = this.removeStats(prevItem, userData);
                            userData.character.equipment.hands = backpackItem;
                            userData = this.addStats(backpackItem, userData);
                            break;
                        case 'Ring':
                            prevItem = userData.character.equipment.ring1;
                            userData = this.removeStats(prevItem, userData);
                            userData.character.equipment.ring1 = backpackItem;
                            userData = this.addStats(backpackItem, userData);
                            break;
                        case 'Boots':
                            prevItem = userData.character.equipment.feet;
                            userData = this.removeStats(prevItem, userData);
                            userData.character.equipment.feet = backpackItem;
                            userData = this.addStats(backpackItem, userData);
                            break;
                        case 'Weapon':
                            prevItem = userData.character.equipment.mainHand;
                            userData = this.removeStats(prevItem, userData);
                            userData.character.equipment.mainHand = backpackItem;
                            this.addStats(backpackItem, userData);
                            break;
                        case 'Shield':
                            prevItem = userData.character.equipment.offHand;
                            userData = this.removeStats(prevItem, userData);
                            userData.character.equipment.offHand = backpackItem;
                            userData = this.addStats(backpackItem, userData);
                            break;
                        default:
                            return undefined;
                    }
                    if (prevItem === null || prevItem === void 0 ? void 0 : prevItem.name) {
                        userData.character.backpack.push(prevItem);
                    }
                    found = true;
                    userData.character.backpack.splice(userData.character.backpack.indexOf(backpackItem), 1);
                }
            });
            yield this.usersRepository.update({ username: userData.username }, {
                character: userData.character,
            });
            return yield this.usersRepository.findOneBy({
                username: username,
            });
        });
    }
    unequipItem(username, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData = yield this.usersRepository.findOneBy({
                username: username,
            });
            let prevItem = userData.character.equipment[type.type];
            if ((Object.keys(prevItem).length === 0)) {
                console.log("empty item");
            }
            else {
                this.removeStats(prevItem, userData);
            }
            if (prevItem === null || prevItem === void 0 ? void 0 : prevItem.name) {
                userData.character.backpack.push(prevItem);
            }
            userData.character.equipment[type.type] = {};
            yield this.usersRepository.update({ username: userData.username }, {
                character: userData.character,
            });
            return yield this.usersRepository.findOneBy({
                username: username,
            });
        });
    }
    addStats(item, player) {
        if (item.stats.offense) {
            item.stats.offense.map((stat) => {
                switch (stat.name) {
                    case items_service_1.OffenseStat.CRIT_CHANCE:
                        player.character.combatStats.combat.criticalHitChance += stat.value;
                        break;
                    case items_service_1.OffenseStat.CRIT_DAMAGE:
                        player.character.combatStats.combat.criticalHitDamage += stat.value;
                        break;
                    case items_service_1.OffenseStat.ATTACK_SPEED:
                        player.character.combatStats.combat.attackSpeed += stat.value;
                        break;
                    case items_service_1.OffenseStat.ACCURACY:
                        player.character.combatStats.combat.accuracy += stat.value;
                        break;
                }
            });
        }
        if (item.stats.defence) {
            item.stats.defence.map((stat) => {
                switch (stat.name) {
                    case items_service_1.DefenceStat.ARMOR:
                        player.character.combatStats.defenses.armor += stat.value;
                        break;
                    case items_service_1.DefenceStat.EVASION:
                        player.character.combatStats.defenses.evasion += stat.value;
                        break;
                    case items_service_1.DefenceStat.MAGIC_RESIST:
                        player.character.combatStats.defenses.magicResistance += stat.value;
                        break;
                    case items_service_1.DefenceStat.BLOCK_CHANCE:
                        player.character.combatStats.combat.blockChance += stat.value;
                        break;
                    case items_service_1.DefenceStat.PARRY_CHANCE:
                        player.character.combatStats.combat.parryChance += stat.value;
                        break;
                }
            });
        }
        if (item.stats.attributes) {
            item.stats.attributes.map((stat) => {
                switch (stat.name) {
                    case items_service_1.AttributeStat.STRENGTH:
                        player.character.combatStats.stats.strength += stat.value;
                        break;
                    case items_service_1.AttributeStat.DEXTERITY:
                        player.character.combatStats.stats.dexterity += stat.value;
                        break;
                    case items_service_1.AttributeStat.INTELLIGENCE:
                        player.character.combatStats.stats.intelligence += stat.value;
                        break;
                    case items_service_1.AttributeStat.ENDURANCE:
                        player.character.combatStats.stats.endurance += stat.value;
                        break;
                    case items_service_1.AttributeStat.AGILITY:
                        player.character.combatStats.stats.agility += stat.value;
                        break;
                    case items_service_1.AttributeStat.LUCK:
                        player.character.combatStats.stats.luck += stat.value;
                        break;
                }
            });
        }
        if (item.stats.resists) {
            item.stats.resists.map((stat) => {
                switch (stat.name) {
                    case items_service_1.ResistStat.FIRE_RES:
                        player.character.combatStats.resistances.fireResistance +=
                            stat.value;
                        break;
                    case items_service_1.ResistStat.ICE_RES:
                        player.character.combatStats.resistances.iceResistance +=
                            stat.value;
                        break;
                    case items_service_1.ResistStat.LIGHTNING_RES:
                        player.character.combatStats.resistances.lightningResistance +=
                            stat.value;
                        break;
                    case items_service_1.ResistStat.POISON_RES:
                        player.character.combatStats.resistances.poisonResistance +=
                            stat.value;
                        break;
                    case items_service_1.ResistStat.BLEED_RES:
                        player.character.combatStats.resistances.bleedResistance +=
                            stat.value;
                        break;
                    case items_service_1.ResistStat.STUN_RES:
                        player.character.combatStats.resistances.stunResistance +=
                            stat.value;
                        break;
                    case items_service_1.ResistStat.CONFUSE_RES:
                        player.character.combatStats.resistances.confuseResistance +=
                            stat.value;
                        break;
                    case items_service_1.ResistStat.SILENCE_RES:
                        player.character.combatStats.resistances.silenceResistance +=
                            stat.value;
                        break;
                }
            });
        }
        return player;
    }
    removeStats(item, player) {
        if (Object.keys(item).length === 0) {
            console.log('The object is empty');
        }
        else {
            if (item === null || item === void 0 ? void 0 : item.stats.offense) {
                item.stats.offense.map((stat) => {
                    switch (stat.name) {
                        case items_service_1.OffenseStat.CRIT_CHANCE:
                            player.character.combatStats.combat.criticalHitChance -= stat.value;
                            break;
                        case items_service_1.OffenseStat.CRIT_DAMAGE:
                            player.character.combatStats.combat.criticalHitDamage -= stat.value;
                            break;
                        case items_service_1.OffenseStat.ATTACK_SPEED:
                            player.character.combatStats.combat.attackSpeed -= stat.value;
                            break;
                        case items_service_1.OffenseStat.ACCURACY:
                            player.character.combatStats.combat.accuracy -= stat.value;
                            break;
                    }
                });
            }
            if (item === null || item === void 0 ? void 0 : item.stats.defence) {
                item.stats.defence.map((stat) => {
                    switch (stat.name) {
                        case items_service_1.DefenceStat.ARMOR:
                            player.character.combatStats.defenses.armor -= stat.value;
                            break;
                        case items_service_1.DefenceStat.EVASION:
                            player.character.combatStats.defenses.evasion -= stat.value;
                            break;
                        case items_service_1.DefenceStat.MAGIC_RESIST:
                            player.character.combatStats.defenses.magicResistance -= stat.value;
                            break;
                        case items_service_1.DefenceStat.BLOCK_CHANCE:
                            player.character.combatStats.combat.blockChance -= stat.value;
                            break;
                        case items_service_1.DefenceStat.PARRY_CHANCE:
                            player.character.combatStats.combat.parryChance -= stat.value;
                            break;
                    }
                });
            }
            if (item === null || item === void 0 ? void 0 : item.stats.attributes) {
                item.stats.attributes.map((stat) => {
                    switch (stat.name) {
                        case items_service_1.AttributeStat.STRENGTH:
                            player.character.combatStats.stats.strength -= stat.value;
                            break;
                        case items_service_1.AttributeStat.DEXTERITY:
                            player.character.combatStats.stats.dexterity -= stat.value;
                            break;
                        case items_service_1.AttributeStat.INTELLIGENCE:
                            player.character.combatStats.stats.intelligence -= stat.value;
                            break;
                        case items_service_1.AttributeStat.ENDURANCE:
                            player.character.combatStats.stats.endurance -= stat.value;
                            break;
                        case items_service_1.AttributeStat.AGILITY:
                            player.character.combatStats.stats.agility -= stat.value;
                            break;
                        case items_service_1.AttributeStat.LUCK:
                            player.character.combatStats.stats.luck -= stat.value;
                            break;
                    }
                });
            }
            if (item === null || item === void 0 ? void 0 : item.stats.resists) {
                item.stats.resists.map((stat) => {
                    switch (stat.name) {
                        case items_service_1.ResistStat.FIRE_RES:
                            player.character.combatStats.resistances.fireResistance -=
                                stat.value;
                            break;
                        case items_service_1.ResistStat.ICE_RES:
                            player.character.combatStats.resistances.iceResistance -=
                                stat.value;
                            break;
                        case items_service_1.ResistStat.LIGHTNING_RES:
                            player.character.combatStats.resistances.lightningResistance -=
                                stat.value;
                            break;
                        case items_service_1.ResistStat.POISON_RES:
                            player.character.combatStats.resistances.poisonResistance -=
                                stat.value;
                            break;
                        case items_service_1.ResistStat.BLEED_RES:
                            player.character.combatStats.resistances.bleedResistance -=
                                stat.value;
                            break;
                        case items_service_1.ResistStat.STUN_RES:
                            player.character.combatStats.resistances.stunResistance -=
                                stat.value;
                            break;
                        case items_service_1.ResistStat.CONFUSE_RES:
                            player.character.combatStats.resistances.confuseResistance -=
                                stat.value;
                            break;
                        case items_service_1.ResistStat.SILENCE_RES:
                            player.character.combatStats.resistances.silenceResistance -=
                                stat.value;
                            break;
                    }
                });
            }
        }
        return player;
    }
};
CharacterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CharacterService);
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map