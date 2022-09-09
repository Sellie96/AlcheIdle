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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoodcuttingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const woodcutting_service_1 = require("./woodcutting.service");
const decorators_1 = require("@nestjs/websockets/decorators");
const socket_io_1 = require("socket.io");
const woodcutting_dto_1 = require("./dto/woodcutting.dto");
let WoodcuttingGateway = class WoodcuttingGateway {
    constructor(woodCuttingService) {
        this.woodCuttingService = woodCuttingService;
        this.users = 0;
    }
    handleConnection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.users++;
            this.server.emit('woodcuttingUsers', this.users);
        });
    }
    handleDisconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.users--;
            this.server.emit('users', this.users);
        });
    }
    create(woodcutting) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.woodCuttingService.addToWoodcuttingActive({ username: woodcutting.username, message: woodcutting.message, time: new Date().toISOString().split("T")[1].split(".")[0] });
            this.server.emit('findAllMessages', message);
        });
    }
};
__decorate([
    (0, decorators_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WoodcuttingGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, decorators_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WoodcuttingGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('woodcuttingActive'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [woodcutting_dto_1.WoodcuttingDto]),
    __metadata("design:returntype", Promise)
], WoodcuttingGateway.prototype, "create", null);
WoodcuttingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [woodcutting_service_1.WoodcuttingService])
], WoodcuttingGateway);
exports.WoodcuttingGateway = WoodcuttingGateway;
//# sourceMappingURL=woodcutting.gateway.js.map