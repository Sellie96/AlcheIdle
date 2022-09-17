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
exports.Character = void 0;
const typeorm_1 = require("typeorm");
const currencies_entity_1 = require("./currencies/currencies.entity");
const combat_entity_1 = require("./skills/combat.entity");
const skills_entity_1 = require("./skills/skills.entity");
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
    (0, typeorm_1.Column)((type) => currencies_entity_1.AllCurrencies),
    __metadata("design:type", currencies_entity_1.AllCurrencies)
], Character.prototype, "currencies", void 0);
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
    __metadata("design:type", Array)
], Character.prototype, "equipment", void 0);
Character = __decorate([
    (0, typeorm_1.Entity)()
], Character);
exports.Character = Character;
//# sourceMappingURL=character.entity.js.map