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
let UsersService = class UsersService {
    constructor(usersRepository, messagesService, messagesGateway) {
        this.usersRepository = usersRepository;
        this.messagesService = messagesService;
        this.messagesGateway = messagesGateway;
    }
    findAll() {
        return this.usersRepository.find();
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
            user.character.skills.woodcutting.xpCurrent += +woodcutter.treeType.xp;
            if (user.character.skills.woodcutting.xpCurrent >=
                user.character.skills.woodcutting.level * 10) {
                user.character.skills.woodcutting.xpCurrent = 0;
                user.character.skills.woodcutting.level += 1;
                this.messagesService.create({
                    name: 'Server',
                    message: `${woodcutter.username} has advanced woodcutting to level ${user.character.skills.woodcutting.level}!`,
                    time: new Date().toISOString().split('T')[1].split('.')[0],
                });
                this.messagesGateway.findAll();
            }
            yield this.usersRepository.update({ username: woodcutter.username }, {
                character: user.character,
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
            let user = yield (0, userDefault_1.UserDataCreation)(registerData);
            this.messagesService.create({
                name: 'Server',
                message: `${user.username} has joined the game!`,
                time: new Date().toISOString().split('T')[1].split('.')[0],
            });
            return this.usersRepository.save(user);
        });
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