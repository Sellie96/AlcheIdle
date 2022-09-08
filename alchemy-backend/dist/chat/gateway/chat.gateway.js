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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const dgram_1 = require("dgram");
const auth_service_1 = require("../../auth/strategies/service/auth.service");
const user_interface_1 = require("../../user/model/user.interface");
const user_service_1 = require("../../user/service/user.service");
const typeorm_1 = require("typeorm");
const connected_user_service_1 = require("../service/connected-user/connected-user.service");
const joined_room_service_1 = require("../service/joined-room/joined-room.service");
const message_service_1 = require("../service/message/message.service");
const room_service_1 = require("../service/room/room.service");
let ChatGateway = class ChatGateway {
    constructor(authService, userService, roomService, connectedUserService, joinedRoomService, messageService) {
        this.authService = authService;
        this.userService = userService;
        this.roomService = roomService;
        this.connectedUserService = connectedUserService;
        this.joinedRoomService = joinedRoomService;
        this.messageService = messageService;
    }
    async onModuleInit() {
        await this.connectedUserService.deleteAll();
        await this.joinedRoomService.deleteAll();
    }
    async handleConnection(socket) {
        try {
            const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
            const user = await this.userService.getOne(decodedToken.user.id);
            if (!user) {
                return this.disconnect(socket);
            }
            else {
                socket.data.user = user;
                const rooms = await this.roomService.getRoomsForUser(user.id, { page: 1, limit: 10 });
                rooms.meta.currentPage = rooms.meta.currentPage - 1;
                await this.connectedUserService.create({ socketId: socket.id, user });
                return this.server.to(socket.id).emit('rooms', rooms);
            }
        }
        catch (_a) {
            return this.disconnect(socket);
        }
    }
    async handleDisconnect(socket) {
        await this.connectedUserService.deleteBySocketId(socket.id);
        socket.disconnect();
    }
    disconnect(socket) {
        socket.emit('Error', new common_1.UnauthorizedException());
        socket.disconnect();
    }
    async onCreateRoom(socket, room) {
        const createdRoom = await this.roomService.createRoom(room, socket.data.user);
        for (const user of createdRoom.users) {
            const connections = await this.connectedUserService.findByUser(user);
            const rooms = await this.roomService.getRoomsForUser(user.id, { page: 1, limit: 10 });
            rooms.meta.currentPage = rooms.meta.currentPage - 1;
            for (const connection of connections) {
                await this.server.to(connection.socketId).emit('rooms', rooms);
            }
        }
    }
    async onPaginateRoom(socket, page) {
        const rooms = await this.roomService.getRoomsForUser(socket.data.user.id, this.handleIncomingPageRequest(page));
        rooms.meta.currentPage = rooms.meta.currentPage - 1;
        return this.server.to(socket.id).emit('rooms', rooms);
    }
    async onJoinRoom(socket, room) {
        const messages = await this.messageService.findMessagesForRoom(room, { limit: 10, page: 1 });
        messages.meta.currentPage = messages.meta.currentPage - 1;
        await this.joinedRoomService.create({ socketId: socket.id, user: socket.data.user, room });
        await this.server.to(socket.id).emit('messages', messages);
    }
    async onLeaveRoom(socket) {
        await this.joinedRoomService.deleteBySocketId(socket.id);
    }
    async onAddMessage(socket, message) {
        const createdMessage = await this.messageService.create(Object.assign(Object.assign({}, message), { user: socket.data.user }));
        const room = await this.roomService.getRoom(createdMessage.room.id);
        const joinedUsers = await this.joinedRoomService.findByRoom(room);
        for (const user of joinedUsers) {
            await this.server.to(user.socketId).emit('messageAdded', createdMessage);
        }
    }
    handleIncomingPageRequest(page) {
        page.limit = page.limit > 100 ? 100 : page.limit;
        page.page = page.page + 1;
        return page;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeorm_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof dgram_1.Socket !== "undefined" && dgram_1.Socket) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onCreateRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('paginateRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dgram_1.Socket !== "undefined" && dgram_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onPaginateRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof dgram_1.Socket !== "undefined" && dgram_1.Socket) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dgram_1.Socket !== "undefined" && dgram_1.Socket) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('addMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof dgram_1.Socket !== "undefined" && dgram_1.Socket) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onAddMessage", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: ['https://hoppscotch.io', 'http://localhost:3000', 'http://localhost:4200'] } }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        room_service_1.RoomService,
        connected_user_service_1.ConnectedUserService,
        joined_room_service_1.JoinedRoomService,
        message_service_1.MessageService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map