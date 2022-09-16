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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoodcuttingService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const users_service_1 = require("../../../user/users.service");
let WoodcuttingService = class WoodcuttingService {
    constructor(usersService) {
        this.usersService = usersService;
        this.woodCuttingUsers = [];
        this.startWoodcutting = true;
        this.timeLeft = 10;
        this.clientToUser = {};
    }
    addToWoodcuttingActive(activeWoodcutter) {
        const user = activeWoodcutter;
        if (this.woodCuttingUsers.some((woodcutter) => woodcutter.username === user.username)) {
            console.log('Username already exists');
        }
        else {
            this.woodCuttingUsers.push(user);
        }
        if (this.startWoodcutting) {
            this.updateWoodcuttingXp();
            this.startWoodcutting = false;
        }
        return this.woodCuttingUsers;
    }
    removeWoodcuttingUser(username) {
        this.woodCuttingUsers = this.woodCuttingUsers.filter((woodcutter) => woodcutter.username !== username);
        return this.woodCuttingUsers;
    }
    getWoodcuttingUsers() {
        return this.woodCuttingUsers;
    }
    identify(name, clientId) {
        this.clientToUser[clientId] = name;
        return Object.values(this.clientToUser);
    }
    getClientName(clientId) {
        return this.clientToUser[clientId];
    }
    updateWoodcuttingXp() {
        for (let i = 0; i < this.woodCuttingUsers.length; i++) {
            this.usersService.updateWoodcuttingByUsername(this.woodCuttingUsers[i]);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WoodcuttingService.prototype, "updateWoodcuttingXp", null);
WoodcuttingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], WoodcuttingService);
exports.WoodcuttingService = WoodcuttingService;
//# sourceMappingURL=woodcutting.service.js.map