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
exports.AgilityGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../../../auth/auth.service");
const user_entity_1 = require("../../../user/user.entity");
const users_service_1 = require("../../../user/users.service");
const agility_service_1 = require("./agility.service");
const agility_dto_1 = require("./dto/agility.dto");
let AgilityGateway = class AgilityGateway {
    constructor(agilityService, authService, usersService) {
        this.agilityService = agilityService;
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
                    let users = this.agilityService.getAgilityUsers();
                    this.server.emit('agilityUsers', users.length);
                    this.getPlayerData(user, client);
                }
            }
            catch (_a) {
                console.log('agility connect error');
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
                    let users = this.agilityService.removeAgilityUser(user.username);
                    this.server.emit('agilityUsers', users.length);
                    client.disconnect();
                }
            }
            catch (_a) {
                console.log('agility disconnect error');
            }
        });
    }
    create(agility, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnAgilityData = yield this.agilityService.addToAgilityActive({ username: agility.username, courseType: agility.courseType, jwt: agility.jwt, timestamp: agility.timestamp });
            let users = this.agilityService.getAgilityUsers();
            this.server.emit('agilityUsers', users.length);
            this.server.to(client.id).emit('agilityActive', returnAgilityData);
        });
    }
    getPlayerData(playerData, client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.to(client.id).emit('getAgilityPlayerData', playerData);
        });
    }
};
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AgilityGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AgilityGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AgilityGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('agilityActive'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agility_dto_1.AgilityDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AgilityGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getAgilityPlayerData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AgilityGateway.prototype, "getPlayerData", null);
AgilityGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [agility_service_1.AgilityService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], AgilityGateway);
exports.AgilityGateway = AgilityGateway;
//# sourceMappingURL=agility.gateway.js.map