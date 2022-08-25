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
exports.CharacterType = void 0;
const graphql_1 = require("@nestjs/graphql");
let CharacterType = class CharacterType {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.ID),
    __metadata("design:type", String)
], CharacterType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "hpMax", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "hpCurrent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "xpMax", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "xpCurrent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "damage", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "accuracy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "armour", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "evasion", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "critChance", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CharacterType.prototype, "gold", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CharacterType.prototype, "user", void 0);
CharacterType = __decorate([
    (0, graphql_1.ObjectType)('Character')
], CharacterType);
exports.CharacterType = CharacterType;
//# sourceMappingURL=character.type.js.map