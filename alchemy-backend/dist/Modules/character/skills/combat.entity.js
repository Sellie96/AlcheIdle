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
exports.CombatStats = exports.Progression = exports.Resistances = exports.Defences = exports.Combat = exports.Stats = void 0;
const typeorm_1 = require("typeorm");
class Stats {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "health", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "maxHealth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "mana", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "maxMana", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "strength", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "dexterity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "intelligence", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "endurance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "agility", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stats.prototype, "luck", void 0);
exports.Stats = Stats;
class Combat {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Combat.prototype, "criticalHitChance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Combat.prototype, "criticalHitDamage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Combat.prototype, "attackSpeed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Combat.prototype, "castSpeed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Combat.prototype, "accuracy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Combat.prototype, "blockChance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Combat.prototype, "parryChance", void 0);
exports.Combat = Combat;
class Defences {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Defences.prototype, "armor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Defences.prototype, "magicResistance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Defences.prototype, "evasion", void 0);
exports.Defences = Defences;
class Resistances {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resistances.prototype, "fireResistance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resistances.prototype, "iceResistance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resistances.prototype, "lightningResistance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resistances.prototype, "poisonResistance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resistances.prototype, "bleedResistance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resistances.prototype, "stunResistance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resistances.prototype, "confuseResistance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Resistances.prototype, "silenceResistance", void 0);
exports.Resistances = Resistances;
class Progression {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Progression.prototype, "experiencePoints", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Progression.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Progression.prototype, "gold", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Progression.prototype, "inventorySize", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Progression.prototype, "skillPoints", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Progression.prototype, "talentPoints", void 0);
exports.Progression = Progression;
let CombatStats = class CombatStats {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Stats)
], CombatStats.prototype, "stats", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Combat)
], CombatStats.prototype, "combat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Defences)
], CombatStats.prototype, "defenses", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Resistances)
], CombatStats.prototype, "resistances", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Progression)
], CombatStats.prototype, "progression", void 0);
CombatStats = __decorate([
    (0, typeorm_1.Entity)()
], CombatStats);
exports.CombatStats = CombatStats;
//# sourceMappingURL=combat.entity.js.map