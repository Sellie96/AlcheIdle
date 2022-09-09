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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const messages_service_1 = require("./messages/messages.service");
const messages_gateway_1 = require("./messages/messages.gateway");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./user/user.entity");
const users_module_1 = require("./user/users.module");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const woodcutting_gateway_1 = require("./skills/woodcutting/woodcutting.gateway");
const woodcutting_service_1 = require("./skills/woodcutting/woodcutting.service");
const schedule_1 = require("@nestjs/schedule");
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
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            messages_gateway_1.MessagesGateway,
            messages_service_1.MessagesService,
            woodcutting_gateway_1.WoodcuttingGateway,
            woodcutting_service_1.WoodcuttingService,
            jwt_1.JwtService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map