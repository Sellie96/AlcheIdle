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
exports.FishingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../../../auth/auth.service");
const users_service_1 = require("../../../user/users.service");
const user_entity_1 = require("../../../user/user.entity");
const fishing_service_1 = require("./fishing.service");
const fishing_dto_1 = require("./dto/fishing.dto");
let FishingGateway = class FishingGateway {
    constructor(fishingService, authService, usersService) {
        this.fishingService = fishingService;
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
                    let users = this.fishingService.getFishingUsers();
                    this.server.emit('fishingUsers', users.length);
                    this.getPlayerData(user, client);
                }
            }
            catch (_a) {
                console.log('fishing connect error');
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
                    let users = this.fishingService.removeFishingUser(user.username);
                    this.server.emit('fishingUsers', users.length);
                    client.disconnect();
                }
            }
            catch (_a) {
                console.log('fishing disconnect error');
            }
        });
    }
    create(fishing, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnFishingData = yield this.fishingService.addToFishingActive({ username: fishing.username, fishType: fishing.fishType, jwt: fishing.jwt, timestamp: fishing.timestamp });
            let users = this.fishingService.getFishingUsers();
            this.server.emit('fishingUsers', users.length);
            this.server.to(client.id).emit('fishingActive', returnFishingData);
        });
    }
    getPlayerData(playerData, client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.to(client.id).emit('getFishingPlayerData', playerData);
        });
    }
};
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], FishingGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], FishingGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], FishingGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('fishingActive'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fishing_dto_1.FishingDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], FishingGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getFishingPlayerData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], FishingGateway.prototype, "getPlayerData", null);
FishingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [fishing_service_1.FishingService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], FishingGateway);
exports.FishingGateway = FishingGateway;
//# sourceMappingURL=fishing.gateway.js.map