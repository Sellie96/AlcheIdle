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
exports.MonsterService = void 0;
const common_1 = require("@nestjs/common");
let MonsterService = class MonsterService {
    constructor() {
        this.monsters = [
            {
                name: 'Goblin',
                health: 100,
                maxHealth: 100,
                attack: 10,
                defence: 10,
                level: 1,
                xp: 10,
                attackSpeed: 4,
                loot: [
                    {
                        name: 'Small Potion',
                        amount: 1,
                        value: 10,
                        restores: 10,
                    },
                    {
                        name: 'Iron Axe',
                        amount: 1,
                        value: 10,
                    },
                ],
            },
            {
                name: 'Orc',
                health: 200,
                maxHealth: 200,
                attack: 20,
                defence: 20,
                level: 2,
                xp: 20,
                attackSpeed: 4,
                loot: [
                    {
                        name: 'Small Potion',
                        amount: 1,
                        value: 10,
                        restores: 10,
                    },
                    {
                        name: 'Iron Axe',
                        amount: 1,
                        value: 10,
                    },
                ],
            }
        ];
    }
    getMonsterListData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.monsters;
        });
    }
    getMonsterData(monster) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(monster);
            let copiedArray = [...this.monsters];
            let monsterData = copiedArray.find(x => x.name === monster.monsterId);
            console.log(monsterData);
            return monsterData;
        });
    }
};
MonsterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MonsterService);
exports.MonsterService = MonsterService;
//# sourceMappingURL=monster.service.js.map