"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSerializer = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../../user/user.entity");
const users_service_1 = require("../../user/users.service");
let SessionSerializer = class SessionSerializer extends passport_1.PassportSerializer {
    serializeUser(user, done) {
        done(null, user);
    }
    ;
    deserializeUser(payload, done) {
        done(null, payload);
    }
    ;
};
SessionSerializer = __decorate([
    (0, common_1.Injectable)()
], SessionSerializer);
exports.SessionSerializer = SessionSerializer;
//# sourceMappingURL=session.serializer.js.map