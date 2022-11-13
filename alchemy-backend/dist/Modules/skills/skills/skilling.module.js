"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../../../auth/auth.module");
const messages_module_1 = require("../../messages/messages.module");
const users_module_1 = require("../../../user/users.module");
const agility_module_1 = require("../agility/agility.module");
const fishing_module_1 = require("../fishing/fishing.module");
const mining_module_1 = require("../mining/mining.module");
const thieving_module_1 = require("../thieving/thieving.module");
const woodcutting_module_1 = require("../woodcutting/woodcutting.module");
const skills_gateway_1 = require("./skills.gateway");
let SkillsModule = class SkillsModule {
};
SkillsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => mining_module_1.MiningModule),
            (0, common_1.forwardRef)(() => agility_module_1.AgilityModule),
            (0, common_1.forwardRef)(() => fishing_module_1.FishingModule),
            (0, common_1.forwardRef)(() => woodcutting_module_1.WoodcuttingModule),
            (0, common_1.forwardRef)(() => thieving_module_1.ThievingModule),
            (0, common_1.forwardRef)(() => messages_module_1.MessagesModule),
        ],
        controllers: [],
        providers: [skills_gateway_1.SkillsGateway],
        exports: [skills_gateway_1.SkillsGateway],
    })
], SkillsModule);
exports.SkillsModule = SkillsModule;
//# sourceMappingURL=skilling.module.js.map