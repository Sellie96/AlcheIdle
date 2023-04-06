"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookingModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../../../auth/auth.module");
const users_module_1 = require("../../../user/users.module");
const cooking_service_1 = require("./cooking.service");
let CookingModule = class CookingModule {
};
CookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        controllers: [],
        providers: [cooking_service_1.CookingService],
        exports: [cooking_service_1.CookingService],
    })
], CookingModule);
exports.CookingModule = CookingModule;
//# sourceMappingURL=cooking.module.js.map