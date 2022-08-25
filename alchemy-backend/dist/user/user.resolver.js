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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const assign_character_1 = require("./assign-character");
const create_user_input_1 = require("./create-user-input");
const user_service_1 = require("./user.service");
const user_type_1 = require("./user.type");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return this.userService.getUsers();
    }
    getUser(id) {
        return this.userService.getUser(id);
    }
    createUser(createUserInput) {
        return this.userService.createUser(createUserInput);
    }
    assignCharacterToUser(assignCharacterToUserInput) {
        const { userId, characterIds } = assignCharacterToUserInput;
        return this.userService.assignCharactersToUser(userId, characterIds);
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => [user_type_1.UserType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, graphql_1.Query)((returns) => [user_type_1.UserType]),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_type_1.UserType),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_type_1.UserType),
    __param(0, (0, graphql_1.Args)('assignCharacterToUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_character_1.AssignCharactersToUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "assignCharacterToUser", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)((of) => user_type_1.UserType),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map