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
exports.AllSkills = void 0;
const typeorm_1 = require("typeorm");
const skill_entity_1 = require("./skill.entity");
let AllSkills = class AllSkills {
};
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "agility", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "alchemy", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "cooking", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "crafting", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "firemaking", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "fishing", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "fletching", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "herblore", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "mining", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "runecrafting", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "smithing", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "thieving", void 0);
__decorate([
    (0, typeorm_1.Column)((type) => skill_entity_1.Skill),
    __metadata("design:type", skill_entity_1.Skill)
], AllSkills.prototype, "woodcutting", void 0);
AllSkills = __decorate([
    (0, typeorm_1.Entity)()
], AllSkills);
exports.AllSkills = AllSkills;
//# sourceMappingURL=skills.entity.js.map