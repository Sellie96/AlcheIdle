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
exports.MiningGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../../../auth/auth.service");
const user_entity_1 = require("../../../user/user.entity");
const users_service_1 = require("../../../user/users.service");
const mining_dto_1 = require("./dto/mining.dto");
const mining_service_1 = require("./mining.service");
let MiningGateway = class MiningGateway {
    constructor(miningService, authService, usersService) {
        this.miningService = miningService;
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
                    let users = this.miningService.getMiningUsers();
                    this.server.emit('miningUsers', users.length);
                    this.getPlayerData(user, client);
                }
            }
            catch (_a) {
                console.log('mining connect error');
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
                    let users = this.miningService.removeMiningUser(user.username);
                    this.server.emit('miningUsers', users.length);
                    client.disconnect();
                }
            }
            catch (_a) {
                console.log('mining disconnect error');
            }
        });
    }
    create(mining, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnMiningData = yield this.miningService.addToMiningActive({ username: mining.username, oreType: mining.oreType, jwt: mining.jwt, timestamp: mining.timestamp });
            let users = this.miningService.getMiningUsers();
            this.server.emit('miningUsers', users.length);
            this.server.to(client.id).emit('miningActive', returnMiningData);
        });
    }
    getPlayerData(playerData, client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.to(client.id).emit('getMiningPlayerData', playerData);
        });
    }
};
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MiningGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MiningGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MiningGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('miningActive'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mining_dto_1.MiningDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MiningGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getMiningPlayerData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MiningGateway.prototype, "getPlayerData", null);
MiningGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [mining_service_1.MiningService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], MiningGateway);
exports.MiningGateway = MiningGateway;
//# sourceMappingURL=mining.gateway.js.map