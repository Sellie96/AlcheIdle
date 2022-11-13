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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThievingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../../../auth/auth.service");
const users_service_1 = require("../../../user/users.service");
const user_entity_1 = require("../../../user/user.entity");
const thieving_service_1 = require("./thieving.service");
const thieving_dto_1 = require("./dto/thieving.dto");
let ThievingGateway = class ThievingGateway {
    constructor(thievingService, authService, usersService) {
        this.thievingService = thievingService;
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
                    let users = this.thievingService.getThievingUsers();
                    this.server.emit('thievingUsers', users.length);
                    this.getPlayerData(user, client);
                }
            }
            catch (_a) {
                console.log('thieving connect error');
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
                    let users = this.thievingService.removeThievingUser(user.username);
                    this.server.emit('thievingUsers', users.length);
                    client.disconnect();
                }
            }
            catch (_a) {
                console.log('thieving disconnect error');
            }
        });
    }
    create(thieving, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnThievingData = yield this.thievingService.addToThievingActive({ username: thieving.username, thievingOption: thieving.thievingOption, jwt: thieving.jwt, timestamp: thieving.timestamp });
            let users = this.thievingService.getThievingUsers();
            this.server.emit('thievingUsers', users.length);
            this.server.to(client.id).emit('thievingActive', returnThievingData);
        });
    }
    getPlayerData(playerData, client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.to(client.id).emit('getThievingPlayerData', playerData);
        });
    }
};
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ThievingGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ThievingGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ThievingGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('thievingActive'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof thieving_dto_1.ThievingDto !== "undefined" && thieving_dto_1.ThievingDto) === "function" ? _a : Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ThievingGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getThievingPlayerData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ThievingGateway.prototype, "getPlayerData", null);
ThievingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [thieving_service_1.ThievingService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], ThievingGateway);
exports.ThievingGateway = ThievingGateway;
//# sourceMappingURL=thieving.gateway.js.map