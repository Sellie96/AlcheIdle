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
exports.CookingService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../../user/users.service");
let CookingService = class CookingService {
    constructor(usersService) {
        this.usersService = usersService;
        this.cookingUsers = [];
        this.timeLeft = 10;
        this.clientToUser = {};
    }
    addToActive(activeLog) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = activeLog;
            let returnedData = {
                updateMessage: '',
                cookingUsers: {},
            };
            if (this.cookingUsers.some((cooker) => cooker.username === user.username)) {
                if (this.cookingUsers.some((cooker) => cooker.timestamp + 11 < user.timestamp)) {
                    returnedData.cookingUsers =
                        yield this.usersService.updateSkillByUsername(user);
                }
            }
            else {
                this.cookingUsers.push(user);
                returnedData.cookingUsers = yield this.usersService.updateSkillByUsername(user);
            }
            returnedData.updateMessage = `You gain ${returnedData.cookingUsers.reward.amount}x ${returnedData.cookingUsers.reward.name} and ${user.type.xp} XP!`;
            return returnedData;
        });
    }
};
CookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], CookingService);
exports.CookingService = CookingService;
//# sourceMappingURL=cooking.service.js.map