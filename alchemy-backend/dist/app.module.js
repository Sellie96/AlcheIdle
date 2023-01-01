"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const combat_module_1 = require("./Modules/combat/combat.module");
const shop_module_1 = require("./Modules/shop/shop.module");
const agility_module_1 = require("./Modules/skills/agility/agility.module");
const cooking_module_1 = require("./Modules/skills/cooking/cooking.module");
const firemaking_module_1 = require("./Modules/skills/firemaking/firemaking.module");
const fishing_module_1 = require("./Modules/skills/fishing/fishing.module");
const mining_module_1 = require("./Modules/skills/mining/mining.module");
const skilling_module_1 = require("./Modules/skills/skills/skilling.module");
const thieving_module_1 = require("./Modules/skills/thieving/thieving.module");
const woodcutting_module_1 = require("./Modules/skills/woodcutting/woodcutting.module");
const user_entity_1 = require("./user/user.entity");
const users_module_1 = require("./user/users.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: process.env.DATABASE_URL,
                synchronize: true,
                entities: [user_entity_1.User],
                useUnifiedTopology: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            woodcutting_module_1.WoodcuttingModule,
            thieving_module_1.ThievingModule,
            fishing_module_1.FishingModule,
            mining_module_1.MiningModule,
            agility_module_1.AgilityModule,
            firemaking_module_1.FiremakingModule,
            cooking_module_1.CookingModule,
            skilling_module_1.SkillsModule,
            shop_module_1.ShopModule,
            combat_module_1.CombatModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map