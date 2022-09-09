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
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOne(id) {
        return this.usersRepository.findOneBy({ id });
    }
    findOneByUsername(username) {
        return this.usersRepository.findOneBy({ username: username });
    }
    updateOneByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let test = yield this.findOneByUsername(username);
            test.character.skills.woodcutting.xpCurrent += 5;
            console.log(test.character.skills.woodcutting.xpCurrent >= test.character.skills.woodcutting.level * 10);
            if (test.character.skills.woodcutting.xpCurrent >= test.character.skills.woodcutting.level * 10) {
                console.log('level up');
                test.character.skills.woodcutting.xpCurrent = 0;
                test.character.skills.woodcutting.level += 1;
            }
            yield this.usersRepository.update({ username: username }, {
                character: test.character
            });
        });
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
            let user = {
                username: registerData.username,
                password: yield bcrypt.hash(registerData.password, 10),
                asActive: true,
                character: {
                    characterName: registerData.characterName,
                    characterAlignment: registerData.characterAlignment,
                    currencies: {
                        gold: 1,
                        energy: 1,
                        lifeForce: 1,
                        gems: 1,
                    },
                    skills: {
                        agility: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        alchemy: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        cooking: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        crafting: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        firemaking: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        fishing: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        fletching: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        herblore: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        mining: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        runecrafting: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        smithing: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        thieving: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                        woodcutting: {
                            level: 1,
                            xpMax: 1,
                            xpCurrent: 1,
                        },
                    },
                    backpack: [],
                    equipment: [],
                },
            };
            return this.usersRepository.save(user);
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map