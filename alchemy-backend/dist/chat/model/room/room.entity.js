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
exports.RoomEntity = void 0;
const user_entity_1 = require("../../../user/model/user.entity");
const typeorm_1 = require("typeorm");
const joined_room_entity_1 = require("../joined-room/joined-room.entity");
const message_entity_1 = require("../message/message.entity");
let RoomEntity = class RoomEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RoomEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoomEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RoomEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], RoomEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => joined_room_entity_1.JoinedRoomEntity, joinedRoom => joinedRoom.room),
    __metadata("design:type", Array)
], RoomEntity.prototype, "joinedUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, message => message.room),
    __metadata("design:type", Array)
], RoomEntity.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RoomEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RoomEntity.prototype, "updated_at", void 0);
RoomEntity = __decorate([
    (0, typeorm_1.Entity)()
], RoomEntity);
exports.RoomEntity = RoomEntity;
//# sourceMappingURL=room.entity.js.map