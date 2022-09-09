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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
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
    handleConnection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users++;
            const message = this.messagesService.findAll();
            this.server.emit('findAllMessages', message);
            this.server.emit('users', this.users);
        });
    }
    handleDisconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.users--;
            this.server.emit('users', this.users);
        });
    }
    create(createMessageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messagesService.create(createMessageDto);
            this.server.emit('findAllMessages', message);
        });
    }
    findAll(client) {
        const message = this.messagesService.findAll();
        client.broadcast.emit('findAllMessages', message);
    }
    update(updateMessageDto) {
        return this.messagesService.update(updateMessageDto.id, updateMessageDto);
    }
    typing(isTyping, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = this.messagesService.getClientName(client.id);
            client.broadcast.emit('typing', { name, isTyping });
        });
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
    __metadata("design:paramtypes", [typeof (_b = typeof create_message_dto_1.CreateMessageDto !== "undefined" && create_message_dto_1.CreateMessageDto) === "function" ? _b : Object]),
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
    __metadata("design:paramtypes", [typeof (_c = typeof update_message_dto_1.UpdateMessageDto !== "undefined" && update_message_dto_1.UpdateMessageDto) === "function" ? _c : Object]),
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
    __metadata("design:paramtypes", [typeof (_a = typeof messages_service_1.MessagesService !== "undefined" && messages_service_1.MessagesService) === "function" ? _a : Object])
], MessagesGateway);
exports.MessagesGateway = MessagesGateway;
//# sourceMappingURL=messages.gateway.js.map