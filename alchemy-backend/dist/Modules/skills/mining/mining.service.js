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
exports.MiningService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../../user/users.service");
let MiningService = class MiningService {
    constructor(usersService) {
        this.usersService = usersService;
        this.miningUsers = [];
        this.startMining = true;
        this.timeLeft = 10;
        this.clientToUser = {};
    }
    addToActive(activeMiner) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = activeMiner;
            let returnedData = {
                updateMessage: '',
                miningUsers: {},
            };
            if (this.miningUsers.some((miners) => miners.username === user.username)) {
                if (this.miningUsers.some((miners) => miners.timestamp + 11 < user.timestamp)) {
                    returnedData.miningUsers = yield this.usersService.updateSkillByUsername(user);
                }
            }
            else {
                this.miningUsers.push(user);
                returnedData.miningUsers = yield this.usersService.updateSkillByUsername(user);
            }
            returnedData.updateMessage = `You gain ${returnedData.miningUsers.oreAmount}x ${user.oreType.reward} and ${user.oreType.xp} XP!`;
            return returnedData;
        });
    }
};
MiningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], MiningService);
exports.MiningService = MiningService;
//# sourceMappingURL=mining.service.js.map