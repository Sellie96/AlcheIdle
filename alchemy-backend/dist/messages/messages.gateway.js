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
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_service_1 = require("./messages.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const update_message_dto_1 = require("./dto/update-message.dto");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
let MessagesGateway = class MessagesGateway {
    constructor(messagesService) {
        this.messagesService = messagesService;
        this.users = 0;
    }
    async handleConnection(client) {
        this.users++;
        const message = this.messagesService.findAll();
        this.server.emit('findAllMessages', message);
        this.server.emit('users', this.users);
    }
    async handleDisconnect() {
        this.users--;
        this.server.emit('users', this.users);
    }
    async create(createMessageDto) {
        const message = await this.messagesService.create(createMessageDto);
        this.server.emit('findAllMessages', message);
    }
    findAll(client) {
        const message = this.messagesService.findAll();
        client.broadcast.emit('findAllMessages', message);
    }
    update(updateMessageDto) {
        return this.messagesService.update(updateMessageDto.id, updateMessageDto);
    }
    async typing(isTyping, client) {
        const name = this.messagesService.getClientName(client.id);
        client.broadcast.emit('typing', { name, isTyping });
    }
};
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(''),
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)('isTyping')),
    __param(1, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "typing", null);
MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesGateway);
exports.MessagesGateway = MessagesGateway;
//# sourceMappingURL=messages.gateway.js.map