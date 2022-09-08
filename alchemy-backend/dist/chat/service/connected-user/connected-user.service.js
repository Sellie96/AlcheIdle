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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const connected_user_entity_1 = require("../../model/connected-user/connected-user.entity");
const connected_user_interface_1 = require("../../model/connected-user/connected-user.interface");
const user_interface_1 = require("../../../user/model/user.interface");
const typeorm_2 = require("typeorm");
let ConnectedUserService = class ConnectedUserService {
    constructor(connectedUserRepository) {
        this.connectedUserRepository = connectedUserRepository;
    }
    async create(connectedUser) {
        return this.connectedUserRepository.save(connectedUser);
    }
    async findByUser(user) {
        return this.connectedUserRepository.find({ user });
    }
    async deleteBySocketId(socketId) {
        return this.connectedUserRepository.delete({ socketId });
    }
    async deleteAll() {
        await this.connectedUserRepository
            .createQueryBuilder()
            .delete()
            .execute();
    }
};
ConnectedUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(connected_user_entity_1.ConnectedUserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConnectedUserService);
exports.ConnectedUserService = ConnectedUserService;
//# sourceMappingURL=connected-user.service.js.map