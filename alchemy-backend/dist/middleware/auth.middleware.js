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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/strategies/service/auth.service");
const user_interface_1 = require("../user/model/user.interface");
const user_service_1 = require("../user/service/user.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async use(req, res, next) {
        try {
            const tokenArray = req.headers['authorization'].split(' ');
            const decodedToken = await this.authService.verifyJwt(tokenArray[1]);
            const user = await this.userService.getOne(decodedToken.user.id);
            if (user) {
                req.user = user;
                next();
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        catch (_a) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map