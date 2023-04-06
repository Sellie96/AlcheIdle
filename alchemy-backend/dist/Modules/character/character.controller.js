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
exports.CharacterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/strategies/jwt-auth.guard");
const common_2 = require("@nestjs/common");
const auth_service_1 = require("../../auth/auth.service");
const character_service_1 = require("./character.service");
let CharacterController = class CharacterController {
    constructor(characterService, authService) {
        this.characterService = characterService;
        this.authService = authService;
    }
    equipItem(req, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = yield this.authService.verifyJwt(req.headers.authorization.slice(7));
            let updatedPlayer = yield this.characterService.equipItem(decodedToken.username, item);
            return {
                message: 'Equipped',
                player: updatedPlayer,
            };
        });
    }
    unequipItem(req, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = yield this.authService.verifyJwt(req.headers.authorization.slice(7));
            let returnedData = yield this.characterService.unequipItem(decodedToken.username, type);
            return {
                message: 'Unequipped',
                player: returnedData,
            };
        });
    }
};
__decorate([
    (0, common_1.Post)('equipItem'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "equipItem", null);
__decorate([
    (0, common_1.Post)('unequipItem'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "unequipItem", null);
CharacterController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Character'),
    (0, common_1.Controller)('character'),
    __metadata("design:paramtypes", [character_service_1.CharacterService,
        auth_service_1.AuthService])
], CharacterController);
exports.CharacterController = CharacterController;
//# sourceMappingURL=character.controller.js.map