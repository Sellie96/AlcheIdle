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
exports.Character = exports.Equipment = void 0;
const typeorm_1 = require("typeorm");
const combat_entity_1 = require("./skills/combat.entity");
const skills_entity_1 = require("./skills/skills.entity");
let Equipment = class Equipment {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "head", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "neck", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "shoulders", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "chest", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "hands", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "waist", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "legs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "feet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "ring1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "ring2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "trinket1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "trinket2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "mainHand", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "offHand", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "necklace", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Equipment.prototype, "cape", void 0);
Equipment = __decorate([
    (0, typeorm_1.Entity)()
], Equipment);
exports.Equipment = Equipment;
let Character = class Character {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", Number)
], Character.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Character.prototype, "characterName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Character.prototype, "characterAlignment", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => combat_entity_1.CombatStats),
    __metadata("design:type", combat_entity_1.CombatStats)
], Character.prototype, "combatStats", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skills_entity_1.AllSkills),
    __metadata("design:type", skills_entity_1.AllSkills)
], Character.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Character.prototype, "backpack", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Equipment)
], Character.prototype, "equipment", void 0);
Character = __decorate([
    (0, typeorm_1.Entity)()
], Character);
exports.Character = Character;
//# sourceMappingURL=character.entity.js.map