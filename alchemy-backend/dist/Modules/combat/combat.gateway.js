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
const combat_service_1 = require("./combat.service");
const monster_service_1 = require("./monster/monster.service");
let CombatGateway = class CombatGateway {
    constructor(authService, usersService, monsterService, combatService) {
        this.authService = authService;
        this.usersService = usersService;
        this.monsterService = monsterService;
        this.combatService = combatService;
        this.users = 0;
        this.sendResponse = true;
        this.clientFightInProgress = new Map();
        this.ongoingCombatPlayers = [];
    }
    handleConnection(client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authToken = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.slice(7);
                if (!authToken) {
                    throw new Error('Authorization token not found');
                }
                const decodedToken = yield this.authService.verifyJwt(authToken);
                this.player = yield this.usersService.findOneByUsername(decodedToken.username);
                if (!this.player) {
                    console.log(`User with username ${decodedToken.username} not found`);
                    client.disconnect();
                    return;
                }
                this.getPlayerData(client);
                this.clientFightInProgress.set(client.id, false);
                this.getMonsterListData(client);
                this.currentClient = client;
            }
            catch (error) {
                console.error(`Error while handling connection: ${error.message}`);
                client.disconnect();
            }
        });
    }
    handleDisconnect(client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authToken = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.slice(7);
                if (!authToken) {
                    throw new Error('Authorization token not found');
                }
                const decodedToken = yield this.authService.verifyJwt(authToken);
                if (!this.player) {
                    console.log(`User with username ${decodedToken.username} not found`);
                }
                else {
                    clearInterval(this.playerInterval);
                    clearInterval(this.monsterInterval);
                    this.clientFightInProgress.set(client.id, false);
                }
            }
            catch (error) {
                console.error(`Error while handling disconnect: ${error.message}`);
            }
            finally {
                client.disconnect();
            }
        });
    }
    startMonsterCombat(client, monsterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = yield this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
            this.player = yield this.usersService.findOneByUsername(decodedToken.username);
            if (this.ongoingCombatPlayers.includes(this.player.username)) {
                client.emit('combatError', { message: `You are already engaged in a combat` });
                return;
            }
            this.ongoingCombatPlayers.push(this.player.username);
            let monster = yield this.findMonsterById(monsterId);
            if (!monster) {
                client.emit('combatError', { message: `Monster with ID ${monsterId} not found` });
                return;
            }
            client.emit('updateMonster', { monster: monster });
            client.emit('fightResult', { player: this.player, monster: monster });
            this.combatInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                this.player = yield this.usersService.findOneByUsername(decodedToken.username);
                monster = this.combatService.calculateMonsterHealth(this.player, monster);
                if (monster.health <= 0) {
                    monster.health = 0;
                }
                client.emit('updateMonster', { monster: monster });
                if (monster.health <= 0) {
                    const loot = 0;
                    const gold = 5;
                    const xp = 5;
                    this.player = this.combatService.updatePlayerLoot(gold, xp, this.player, monster);
                    client.emit('monsterDeath', { loot, gold, xp });
                    this.resetFight(client, monsterId);
                    const index = this.ongoingCombatPlayers.indexOf(this.player.username);
                    if (index > -1) {
                        this.ongoingCombatPlayers.splice(index, 1);
                    }
                }
                this.getPlayerData(client);
            }), this.player.character.combatStats.combat.attackSpeed * 1000);
            this.combatIntervalMonster = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                this.player = yield this.usersService.findOneByUsername(decodedToken.username);
                this.player = this.combatService.calculatePlayerHealth(this.player, monster);
                console.log(this.player.character.combatStats.stats.health);
                client.emit('updatePlayer', { player: this.player });
                if (this.player.character.combatStats.stats.health <= 0) {
                    this.playerDied(client);
                }
                this.usersService.updateOne(this.player);
                this.getPlayerData(client);
            }), monster.attackSpeed * 1000);
        });
    }
    getMonsterListData(client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server
                .to(client.id)
                .emit('getMonsterListData', yield this.monsterService.getMonsterListData());
        });
    }
    handleFlee(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.player) {
                const index = this.ongoingCombatPlayers.indexOf(this.player.username);
                if (index > -1) {
                    this.ongoingCombatPlayers.splice(index, 1);
                }
                clearInterval(this.combatInterval);
                clearInterval(this.combatIntervalMonster);
            }
        });
    }
    getPlayerData(client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.to(client.id).emit('getPlayerData', this.player);
        });
    }
    updatePlayer(client) {
        return __awaiter(this, void 0, void 0, function* () {
            let updatedData = yield this.usersService.findOneByUsername(this.player.username);
            this.server.to(client.id).emit('updatePlayer', updatedData);
        });
    }
    resetFight(client, monsterId) {
        clearInterval(this.combatInterval);
        clearInterval(this.combatIntervalMonster);
        const index = this.ongoingCombatPlayers.indexOf(this.player.username);
        if (index > -1) {
            this.ongoingCombatPlayers.splice(index, 1);
        }
        this.startMonsterCombat(client, monsterId);
    }
    findMonsterById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.monsterService.getMonsterData(id);
        });
    }
    playerDied(client) {
        client.emit('playerDeath');
        clearInterval(this.combatInterval);
        clearInterval(this.combatIntervalMonster);
        const index = this.ongoingCombatPlayers.indexOf(this.player.username);
        if (index > -1) {
            this.ongoingCombatPlayers.splice(index, 1);
        }
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "startMonsterCombat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getMonsterListData'),
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "getMonsterListData", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('flee'),
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "handleFlee", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getPlayerData'),
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "getPlayerData", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updatePlayer'),
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CombatGateway.prototype, "updatePlayer", null);
CombatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        monster_service_1.MonsterService,
        combat_service_1.CombatService])
], CombatGateway);
exports.CombatGateway = CombatGateway;
//# sourceMappingURL=combat.gateway.js.map