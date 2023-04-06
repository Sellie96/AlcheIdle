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
const monster_utils_1 = require("./monster.utils");
const monster_utils_2 = require("./monster.utils");
const monster_utils_3 = require("./monster.utils");
const monster_utils_4 = require("./monster.utils");
const monster_utils_5 = require("./monster.utils");
const monster_utils_6 = require("./monster.utils");
const monster_utils_7 = require("./monster.utils");
const monster_utils_8 = require("./monster.utils");
let MonsterService = class MonsterService {
    constructor() {
        this.monsters = [
            monster_utils_1.Goblin,
            monster_utils_1.GoblinArcher,
            monster_utils_1.Hobgoblin,
            monster_utils_1.GoblinBerserker,
            monster_utils_1.GoblinChief,
            monster_utils_1.SandCrab,
            monster_utils_1.SandBeast,
            monster_utils_1.SandGolem,
            monster_utils_1.DustDevil,
            monster_utils_1.Manticore,
            monster_utils_1.Mammoth,
            monster_utils_1.FrostTroll,
            monster_utils_1.FrozenTerror,
            monster_utils_2.IceGiant,
            monster_utils_3.IceWyvern,
            monster_utils_4.Tangleroot,
            monster_utils_5.CarnivorousPlant,
            monster_utils_6.VampireLord,
            monster_utils_7.SpiderQueen,
            monster_utils_8.ChaoticDragon,
            monster_utils_1.LavaGolem,
            monster_utils_1.TheEye,
            monster_utils_1.FireSpirit,
            monster_utils_1.FireSerpent,
            monster_utils_1.SolTheProtector
        ];
    }
    getMonsterListData() {
        return JSON.parse(JSON.stringify(this.monsters));
    }
    getMonsterData(monster) {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(JSON.stringify(this.monsters)).find((x) => x.name === monster.monsterId);
        });
    }
};
MonsterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MonsterService);
exports.MonsterService = MonsterService;
//# sourceMappingURL=monster.service.js.map