"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoodcuttingModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../../../auth/auth.module");
const users_module_1 = require("../../../user/users.module");
const woodcutting_gateway_1 = require("./woodcutting.gateway");
const woodcutting_service_1 = require("./woodcutting.service");
let WoodcuttingModule = class WoodcuttingModule {
};
WoodcuttingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        controllers: [],
        providers: [woodcutting_service_1.WoodcuttingService, woodcutting_gateway_1.WoodcuttingGateway],
        exports: [woodcutting_service_1.WoodcuttingService, woodcutting_gateway_1.WoodcuttingGateway],
    })
], WoodcuttingModule);
exports.WoodcuttingModule = WoodcuttingModule;
//# sourceMappingURL=woodcutting.module.js.map