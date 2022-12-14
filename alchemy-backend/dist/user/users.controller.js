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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
const local_auth_guard_1 = require("../auth/strategies/local-auth.guard");
const user_entity_1 = require("./user.entity");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    login(req) {
        return this.authService.login(req.user);
    }
    create(res, createUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.usersService.doesUserExist(createUser.username)) {
                return res.status(403).send({ message: 'User already exists' });
            }
            else {
                this.usersService.register(createUser);
                return res.status(200).send({ message: 'User registered' });
            }
        });
    }
    getPlayerData(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).send({
                playerData: yield this.usersService.findOneByUsername(body.username),
            });
        });
    }
    returnTotalLevelLeaderboard(res, skill) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnedData = yield this.usersService.findAll();
            let sortedObjs;
            switch (skill.toLowerCase()) {
                case 'total':
                    sortedObjs = this.filterTotalLevel(returnedData);
                    break;
                default:
                    sortedObjs = this.filterSkillLevel(returnedData, skill.toLowerCase());
                    break;
            }
            return res.status(200).send({ playerData: sortedObjs });
        });
    }
    filterTotalLevel(returnedData) {
        return returnedData.sort(function (a, b) {
            return (b.character.skills.woodcutting.level +
                b.character.skills.firemaking.level +
                b.character.skills.fishing.level +
                b.character.skills.cooking.level +
                b.character.skills.runecrafting.level +
                b.character.skills.mining.level +
                b.character.skills.smithing.level +
                b.character.skills.thieving.level +
                b.character.skills.fletching.level +
                b.character.skills.crafting.level +
                b.character.skills.herblore.level +
                b.character.skills.agility.level -
                (a.character.skills.woodcutting.level +
                    a.character.skills.mining.level +
                    a.character.skills.fishing.level +
                    a.character.skills.cooking.level +
                    a.character.skills.firemaking.level +
                    a.character.skills.runecrafting.level +
                    a.character.skills.smithing.level +
                    a.character.skills.thieving.level +
                    a.character.skills.fletching.level +
                    a.character.skills.crafting.level +
                    a.character.skills.herblore.level +
                    a.character.skills.agility.level));
        });
    }
    filterSkillLevel(returnedData, skill) {
        return returnedData.sort(function (a, b) {
            return b.character.skills[skill].level - a.character.skills[skill].level;
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register User' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User Registered',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get player data' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User Returned',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPlayerData", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns a list of users',
        type: user_entity_1.User,
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('skill')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "returnTotalLevelLeaderboard", null);
UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Alchemy'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map