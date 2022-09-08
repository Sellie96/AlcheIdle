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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const room_entity_1 = require("../../model/room/room.entity");
const room_interface_1 = require("../../model/room/room.interface");
const user_interface_1 = require("../../../user/model/user.interface");
const typeorm_2 = require("typeorm");
let RoomService = class RoomService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async createRoom(room, creator) {
        const newRoom = await this.addCreatorToRoom(room, creator);
        return this.roomRepository.save(newRoom);
    }
    async getRoom(roomId) {
        return this.roomRepository.findOne(roomId, {
            relations: ['users']
        });
    }
    async getRoomsForUser(userId, options) {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .leftJoin('room.users', 'users')
            .where('users.id = :userId', { userId })
            .leftJoinAndSelect('room.users', 'all_users')
            .orderBy('room.updated_at', 'DESC');
        return (0, nestjs_typeorm_paginate_1.paginate)(query, options);
    }
    async addCreatorToRoom(room, creator) {
        room.users.push(creator);
        return room;
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.RoomEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map