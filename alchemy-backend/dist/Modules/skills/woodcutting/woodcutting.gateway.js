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
exports.WoodcuttingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const woodcutting_service_1 = require("./woodcutting.service");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
const woodcutting_dto_1 = require("./dto/woodcutting.dto");
const auth_service_1 = require("../../../auth/auth.service");
const users_service_1 = require("../../../user/users.service");
const user_entity_1 = require("../../../user/user.entity");
let WoodcuttingGateway = class WoodcuttingGateway {
    constructor(woodCuttingService, authService, usersService) {
        this.woodCuttingService = woodCuttingService;
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
                    let users = this.woodCuttingService.getWoodcuttingUsers();
                    this.server.emit('woodcuttingUsers', users.length);
                    this.getPlayerData(user, client);
                }
            }
            catch (_a) {
                console.log('woodcutting connect error');
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
                    let users = this.woodCuttingService.removeWoodcuttingUser(user.username);
                    this.server.emit('woodcuttingUsers', users.length);
                    client.disconnect();
                }
            }
            catch (_a) {
                console.log('woodcutting disconnect error');
            }
        });
    }
    create(woodcutting, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnWoodcuttingData = yield this.woodCuttingService.addToWoodcuttingActive({ username: woodcutting.username, treeType: woodcutting.treeType, jwt: woodcutting.jwt, timestamp: woodcutting.timestamp });
            let users = this.woodCuttingService.getWoodcuttingUsers();
            this.server.emit('woodcuttingUsers', users.length);
            this.server.to(client.id).emit('woodcuttingActive', returnWoodcuttingData);
        });
    }
    getPlayerData(playerData, client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.to(client.id).emit('getWoodcuttingPlayerData', playerData);
        });
    }
};
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WoodcuttingGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WoodcuttingGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WoodcuttingGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('woodcuttingActive'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [woodcutting_dto_1.WoodcuttingDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WoodcuttingGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getWoodcuttingPlayerData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WoodcuttingGateway.prototype, "getPlayerData", null);
WoodcuttingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [woodcutting_service_1.WoodcuttingService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], WoodcuttingGateway);
exports.WoodcuttingGateway = WoodcuttingGateway;
//# sourceMappingURL=woodcutting.gateway.js.map