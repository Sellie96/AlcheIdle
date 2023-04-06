"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BronzeDagger = exports.BronzeAxe = exports.Shortbow = exports.Longbow = void 0;
const items_service_1 = require("./../../items.service");
exports.Longbow = new items_service_1.RPGItems('Longbow', items_service_1.ItemType.WEAPON, true, false, {
    offense: [
        { name: items_service_1.OffenseStat.ATTACK_SPEED, value: -1 },
        { name: items_service_1.OffenseStat.ACCURACY, value: 6 },
    ],
    attributes: [
        { name: items_service_1.AttributeStat.STRENGTH, value: 20 },
        { name: items_service_1.AttributeStat.DEXTERITY, value: 2 },
    ],
}, 0.01, false, 1, 1);
exports.Shortbow = new items_service_1.RPGItems('Shortbow', items_service_1.ItemType.WEAPON, true, false, {
    offense: [
        { name: items_service_1.OffenseStat.ATTACK_SPEED, value: -1 },
        { name: items_service_1.OffenseStat.ACCURACY, value: 6 },
    ],
    attributes: [
        { name: items_service_1.AttributeStat.STRENGTH, value: 15 },
        { name: items_service_1.AttributeStat.DEXTERITY, value: 3 },
    ],
}, 0.02, false, 1, 2);
exports.BronzeAxe = new items_service_1.RPGItems('Bronze Axe', items_service_1.ItemType.WEAPON, true, false, {
    offense: [
        { name: items_service_1.OffenseStat.ATTACK_SPEED, value: 1 },
        { name: items_service_1.OffenseStat.ACCURACY, value: 3 },
    ],
    attributes: [{ name: items_service_1.AttributeStat.STRENGTH, value: 16 }],
}, 0.5, false, 1, 2);
exports.BronzeDagger = new items_service_1.RPGItems('Bronze Dagger', items_service_1.ItemType.WEAPON, true, false, {
    offense: [
        { name: items_service_1.OffenseStat.CRIT_CHANCE, value: 2 },
        { name: items_service_1.OffenseStat.CRIT_DAMAGE, value: 5 },
        { name: items_service_1.OffenseStat.ATTACK_SPEED, value: -1 },
        { name: items_service_1.OffenseStat.ACCURACY, value: 6 },
    ],
    attributes: [
        { name: items_service_1.AttributeStat.STRENGTH, value: 8 },
        { name: items_service_1.AttributeStat.DEXTERITY, value: 2 },
    ],
}, 0.5, false, 1, 1);
//# sourceMappingURL=weapon.utils.js.map