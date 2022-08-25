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
exports.CreateCharacterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateCharacterInput = class CreateCharacterInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "hpMax", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "hpCurrent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "xpMax", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "xpCurrent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "damage", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "accuracy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "armour", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "evasion", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "critChance", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCharacterInput.prototype, "gold", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, graphql_1.Field)(() => [graphql_1.ID], { defaultValue: [] }),
    __metadata("design:type", String)
], CreateCharacterInput.prototype, "user", void 0);
CreateCharacterInput = __decorate([
    (0, graphql_1.InputType)()
], CreateCharacterInput);
exports.CreateCharacterInput = CreateCharacterInput;
//# sourceMappingURL=character.input.js.map