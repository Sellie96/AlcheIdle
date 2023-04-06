"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombatModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../../auth/auth.module");
const messages_module_1 = require("../messages/messages.module");
const users_module_1 = require("../../user/users.module");
const combat_gateway_1 = require("./combat.gateway");
const combat_service_1 = require("./combat.service");
const monster_service_1 = require("./monster/monster.service");
let CombatModule = class CombatModule {
};
CombatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => messages_module_1.MessagesModule),
        ],
        controllers: [],
        providers: [combat_gateway_1.CombatGateway, monster_service_1.MonsterService, combat_service_1.CombatService],
        exports: [combat_gateway_1.CombatGateway],
    })
], CombatModule);
exports.CombatModule = CombatModule;
//# sourceMappingURL=combat.module.js.map