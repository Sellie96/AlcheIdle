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
const skills = [
    'woodcutting',
    'firemaking',
    'fishing',
    'cooking',
    'runecrafting',
    'mining',
    'smithing',
    'thieving',
    'fletching',
    'crafting',
    'herblore',
    'agility'
];
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    login(req) {
        return this.authService.login(req.user);
    }
    registerUser(res, createUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.usersService.doesUserExist(createUser.username)) {
                return res.status(common_1.HttpStatus.FORBIDDEN).send({ message: 'User already exists' });
            }
            this.usersService.register(createUser);
            return res.status(common_1.HttpStatus.OK).send({ message: 'User registered' });
        });
    }
    getPlayerData(res, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playerData = yield this.usersService.findOneByUsername(username);
                return res.status(200).send({ playerData });
            }
            catch (error) {
                return res.status(500).send({ error: 'Failed to retrieve player data' });
            }
        });
    }
    getLeaderboard(res, skill) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!skill || !skills.includes(skill.toLowerCase())) {
                return res.status(400).send({ error: 'Invalid skill specified' });
            }
            const returnedData = yield this.usersService.findAll();
            let leaderboardData;
            if (skill === 'all') {
                leaderboardData = returnedData.map((obj, index) => ({
                    name: obj.character.characterName,
                    mode: obj.character.characterAlignment,
                    level: this.getTotalLevel(obj.character.skills),
                    xp: this.getTotalXp(obj.character.skills),
                }));
            }
            else {
                leaderboardData = returnedData.map((obj, index) => ({
                    name: obj.character.characterName,
                    mode: obj.character.characterAlignment,
                    level: this.getLevel(obj.character.skills, skill),
                    xp: this.getXp(obj.character.skills, skill),
                }));
            }
            leaderboardData = leaderboardData.sort((a, b) => b.level - a.level).map((obj, index) => (Object.assign(Object.assign({}, obj), { ranking: index + 1 })));
            return res.status(200).send({ playerData: leaderboardData });
        });
    }
    getTotalLevel(returnedData) {
        let totalLevel = 0;
        skills.forEach(value => {
            totalLevel += returnedData[value].level;
        });
        return totalLevel;
    }
    getTotalXp(returnedData) {
        let totalXp = 0;
        skills.forEach(value => {
            totalXp += returnedData[value].xpCurrent;
        });
        return totalXp;
    }
    getLevel(returnedData, skill) {
        let totalLevel = 0;
        totalLevel += returnedData[skill.toLowerCase()].level;
        return totalLevel;
    }
    getXp(returnedData, skill) {
        let totalXp = 0;
        totalXp += returnedData[skill.toLowerCase()].xpCurrent;
        return totalXp;
    }
    filterTotalLevel(returnedData, skills) {
        return returnedData.sort((a, b) => {
            const aTotalLevel = skills.reduce((total, skill) => {
                return total + a.character.skills[skill].level;
            }, 0);
            const bTotalLevel = skills.reduce((total, skill) => {
                return total + b.character.skills[skill].level;
            }, 0);
            return bTotalLevel - aTotalLevel;
        });
    }
    filterSkillLevel(returnedData, skill) {
        return returnedData.sort(function (a, b) {
            return b.character.skills[skill].level - a.character.skills[skill].level;
        });
    }
    flatten(arr) {
        const flattenedArray = [];
        for (const element of arr) {
            if (Array.isArray(element)) {
                flattenedArray.push(...this.flatten(element));
            }
            else {
                flattenedArray.push(element);
            }
        }
        return flattenedArray;
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
], UsersController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get player data' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User Returned',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
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
], UsersController.prototype, "getLeaderboard", null);
UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Alchemy'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map