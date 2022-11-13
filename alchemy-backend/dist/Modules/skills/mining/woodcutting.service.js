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
exports.WoodcuttingService = void 0;
const common_1 = require("@nestjs/common");
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
        return __awaiter(this, void 0, void 0, function* () {
            const user = activeWoodcutter;
            let returnedData = {
                updateMessage: '',
                woodcuttingUsers: {},
            };
            if (this.woodCuttingUsers.some((woodcutter) => woodcutter.username === user.username)) {
                if (this.woodCuttingUsers.some((woodcutter) => woodcutter.timestamp + 11 < user.timestamp)) {
                    returnedData.woodcuttingUsers = yield this.usersService.updateWoodcuttingByUsername(user);
                }
            }
            else {
                this.woodCuttingUsers.push(user);
                returnedData.woodcuttingUsers = yield this.usersService.updateWoodcuttingByUsername(user);
            }
            returnedData.updateMessage = `You gain ${returnedData.woodcuttingUsers.logAmount}x ${user.treeType.reward} and ${user.treeType.xp} XP!`;
            return returnedData;
        });
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
};
WoodcuttingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], WoodcuttingService);
exports.WoodcuttingService = WoodcuttingService;
//# sourceMappingURL=woodcutting.service.js.map