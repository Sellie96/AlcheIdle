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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const typeorm_2 = require("typeorm");
const character_entity_1 = require("./character.entity");
let CharacterService = class CharacterService {
    constructor(characterRepository) {
        this.characterRepository = characterRepository;
    }
    async getCharacter(id) {
        return this.characterRepository.findOne({ id });
    }
    async getCharacters() {
        return this.characterRepository.find();
    }
    async createCharacter(createCharacterInput) {
        const { level, hpMax, hpCurrent, xpMax, xpCurrent, damage, accuracy, armour, evasion, critChance, gold, user } = createCharacterInput;
        const character = this.characterRepository.create({
            id: (0, crypto_1.randomUUID)(),
            level,
            hpMax,
            hpCurrent,
            xpMax,
            xpCurrent,
            damage,
            accuracy,
            armour,
            evasion,
            critChance,
            gold,
            user
        });
        return this.characterRepository.save(character);
    }
};
CharacterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(character_entity_1.Character)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CharacterService);
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map