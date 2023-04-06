"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortbow = exports.Longbow = void 0;
exports.Longbow = new RPGItems('Longbow', ItemType.WEAPON, true, false, {
    offense: [
        { name: OffenseStat.ATTACK_SPEED, value: -1 },
        { name: OffenseStat.ACCURACY, value: 6 },
    ],
    attributes: [
        { name: AttributeStat.STRENGTH, value: 20 },
        { name: AttributeStat.DEXTERITY, value: 2 },
    ],
}, 0.01, false, 1, 1);
exports.Shortbow = new RPGItems('Shortbow', ItemType.WEAPON, true, false, {
    offense: [
        { name: OffenseStat.ATTACK_SPEED, value: -1 },
        { name: OffenseStat.ACCURACY, value: 6 },
    ],
    attributes: [
        { name: AttributeStat.STRENGTH, value: 15 },
        { name: AttributeStat.DEXTERITY, value: 3 },
    ],
}, 0.02, false, 1, 2);
//# sourceMappingURL=weapon.utils.js.map