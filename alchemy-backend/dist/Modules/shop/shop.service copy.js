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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../user/user.entity");
const typeorm_2 = require("typeorm");
let ShopService = class ShopService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.ironAxe = {
            name: 'Iron Axe',
            bonus: 0.95,
        };
        this.steelAxe = {
            name: 'Steel Axe',
            bonus: 0.9,
        };
        this.crystalAxe = {
            name: 'Crystal Axe',
            bonus: 0.8,
        };
        this.smallPotion = {
            name: 'Small Potion',
            amount: 1,
            value: 10,
            restores: 10,
        };
    }
    buyItem(username, item) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData = yield this.usersRepository.findOneBy({ username: username });
            let response;
            switch (item.name) {
                case 'Iron Axe':
                    response = this.buyItemUpdate(userData, item, this.ironAxe);
                    return response;
                case 'Steel Axe':
                    response = this.buyItemUpdate(userData, item, this.steelAxe);
                    return response;
                case 'Crystal Axe':
                    response = this.buyItemUpdate(userData, item, this.crystalAxe);
                    return response;
                case 'Small Potion':
                    response = this.buyPotionUpdate(userData, item, this.smallPotion);
            }
            return response;
        });
    }
    buyItemUpdate(userData, item, itemToBuy) {
        if (userData.character.combatStats.progression.gold >= item.value) {
            userData.character.combatStats.progression.gold -= item.value;
            userData.character.skills.woodcutting.tool = itemToBuy;
            this.usersRepository.update({ username: userData.username }, {
                character: userData.character,
            });
            return { message: 'Item bought', userData: userData };
        }
        else {
            return {
                message: 'You do not have enough gold to buy this item.',
                userData: userData,
            };
        }
    }
    buyPotionUpdate(userData, item, itemToBuy) {
        if (userData.character.combatStats.progression.gold >= item.value) {
            userData.character.combatStats.progression.gold -= item.value;
            if (userData.character.backpack.some((item) => item.name === itemToBuy.name)) {
                let indexOfItem = userData.character.backpack.findIndex((item) => item.name === itemToBuy.name);
                userData.character.backpack[indexOfItem].amount += itemToBuy.amount;
            }
            else {
                userData.character.backpack.push(itemToBuy);
            }
            this.usersRepository.update({ username: userData.username }, {
                character: userData.character,
            });
            return { message: 'Item bought', userData: userData };
        }
        else {
            return {
                message: 'You do not have enough gold to buy this item.',
                userData: userData,
            };
        }
    }
};
ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShopService);
exports.ShopService = ShopService;
//# sourceMappingURL=shop.service%20copy.js.map