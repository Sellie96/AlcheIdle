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
exports.SkillsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../../../auth/auth.service");
const user_entity_1 = require("../../../user/user.entity");
const users_service_1 = require("../../../user/users.service");
const agility_service_1 = require("../agility/agility.service");
const cooking_service_1 = require("../cooking/cooking.service");
const firemaking_service_1 = require("../firemaking/firemaking.service");
const fishing_service_1 = require("../fishing/fishing.service");
const mining_service_1 = require("../mining/mining.service");
const thieving_service_1 = require("../thieving/thieving.service");
const woodcutting_service_1 = require("../woodcutting/woodcutting.service");
const skill_dto_1 = require("./skill.dto");
let SkillsGateway = class SkillsGateway {
    constructor(miningService, agilityService, fishingService, woodcuttingService, thievingService, firemakingService, cookingService, authService, usersService) {
        this.miningService = miningService;
        this.agilityService = agilityService;
        this.fishingService = fishingService;
        this.woodcuttingService = woodcuttingService;
        this.thievingService = thievingService;
        this.firemakingService = firemakingService;
        this.cookingService = cookingService;
        this.authService = authService;
        this.usersService = usersService;
        this.users = 0;
        this.sendResponse = true;
    }
    handleConnection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
                const user = yield this.usersService.findOneByUsername(decodedToken.username);
                if (!user) {
                    client.disconnect();
                }
                else {
                    console.log('user connected');
                    this.getPlayerData(user, client);
                }
            }
            catch (_a) {
                console.log('skilling connect error');
            }
        });
    }
    handleDisconnect(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
                console.log(decodedToken);
                const user = yield this.usersService.findOneByUsername(decodedToken.username);
                if (!user) {
                    client.disconnect();
                }
                else {
                    console.log('user disconnected');
                    client.disconnect();
                }
            }
            catch (_a) {
                console.log('skilling disconnect error');
            }
        });
    }
    create(skilling, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const servicesMap = {
                mining: this.miningService,
                agility: this.agilityService,
                fishing: this.fishingService,
                woodcutting: this.woodcuttingService,
                thieving: this.thievingService,
                firemaking: this.firemakingService,
                cooking: this.cookingService,
            };
            const service = servicesMap[skilling.type.skillType];
            if (!service) {
                console.log('error in skills gateway');
                return;
            }
            const returnSkillingData = yield service.addToActive({
                username: skilling.username,
                type: skilling.type,
                jwt: skilling.jwt,
                timestamp: skilling.timestamp,
            });
            this.server.to(client.id).emit('skillingActive', returnSkillingData);
        });
    }
    getPlayerData(playerData, client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.to(client.id).emit('getSkillingPlayerData', playerData);
        });
    }
};
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SkillsGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SkillsGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SkillsGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('skillingActive'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [skill_dto_1.SkillingDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SkillsGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getSkillingPlayerData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SkillsGateway.prototype, "getPlayerData", null);
SkillsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [mining_service_1.MiningService,
        agility_service_1.AgilityService,
        fishing_service_1.FishingService,
        woodcutting_service_1.WoodcuttingService,
        thieving_service_1.ThievingService,
        firemaking_service_1.FiremakingService,
        cooking_service_1.CookingService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], SkillsGateway);
exports.SkillsGateway = SkillsGateway;
//# sourceMappingURL=skills.gateway.js.map