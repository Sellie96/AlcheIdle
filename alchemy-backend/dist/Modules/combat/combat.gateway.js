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
exports.CombatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../../auth/auth.service");
const user_entity_1 = require("../../user/user.entity");
const users_service_1 = require("../../user/users.service");
const monster_service_1 = require("./monster/monster.service");
let CombatGateway = class CombatGateway {
    constructor(authService, usersService, monsterService) {
        this.authService = authService;
        this.usersService = usersService;
        this.monsterService = monsterService;
        this.users = 0;
        this.sendResponse = true;
        this.clientFightInProgress = new Map();
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
                    console.log('combat connected');
                    this.getPlayerData(user, client);
                    this.getMonsterListData(client);
                }
            }
            catch (_a) {
                console.log('combat connect error');
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
                    console.log('combat disconnected');
                    clearInterval(this.playerInterval);
                    clearInterval(this.monsterInterval);
                    this.clientFightInProgress.set(client.id, false);
                    client.disconnect();
                }
            }
            catch (_a) {
                console.log('combat disconnect error');
            }
        });
    }
    handleFight(client, monsterId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.clientFightInProgress.get(client.id)) {
                console.log('client already in fight');
                return;
            }
            this.clientFightInProgress.set(client.id, true);
            const decodedToken = yield this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
            const player = yield this.usersService.findOneByUsername(decodedToken.username);
            const monster = yield this.monsterService.getMonsterData(monsterId);
            this.server.to(client.id).emit('fightResult', monster);
            const playerAttackInterval = 1000 * 5;
            const attackInterval = 1000 * 4;
            this.playerInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                console.log('player interval');
                const result = this.calculateMonsterHealth(player, monster);
                this.server.to(client.id).emit('fightResult', result);
                if (player.character.combatStats.stats.health <= 0 || monster.health <= 0) {
                    clearInterval(this.playerInterval);
                    clearInterval(this.monsterInterval);
                    this.clientFightInProgress.set(client.id, false);
                }
            }), playerAttackInterval);
            this.monsterInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const result = this.calculatePlayerHealth(player, monster);
                this.usersService.updateOne(result);
                this.server.to(client.id).emit('getPlayerData', result);
                if (player.character.combatStats.stats.health <= 0 || monster.health <= 0) {
                    clearInterval(this.playerInterval);
                    clearInterval(this.monsterInterval);
                    this.clientFightInProgress.set(client.id, false);
                }
            }), attackInterval);
        });
    }
    handleFlee(client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clientFightInProgress.set(client.id, false);
            clearInterval(this.playerInterval);
            clearInterval(this.monsterInterval);
            this.server.to(client.id).emit('flee');
        });
    }
    getPlayerData(playerData, client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.to(client.id).emit('getPlayerData', playerData);
        });
    }
    calculatePlayerHealth(player, monster) {
        player.character.combatStats.stats.health -= monster.attack;
        return player;
    }
    calculateMonsterHealth(player, monster) {
        const playerDamage = player.character.combatStats.stats.strength;
        monster.health -= playerDamage;
        return monster;
    }
    getMonsterListData(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const monsterList = yield this.monsterService.getMonsterListData();
            this.server.to(client.id).emit('getMonsterListData', monsterList);
        });
    }
};
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CombatGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('startMonsterCombat'),
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "handleFight", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('flee'),
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "handleFlee", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getPlayerData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "getPlayerData", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getMonsterListData'),
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "getMonsterListData", null);
CombatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        monster_service_1.MonsterService])
], CombatGateway);
exports.CombatGateway = CombatGateway;
//# sourceMappingURL=combat.gateway.js.map