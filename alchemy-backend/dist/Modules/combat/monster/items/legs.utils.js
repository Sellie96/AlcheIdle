"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegsOfTheFallen = exports.AncientLegs = exports.DragonboneLegs = exports.FrostguardHelmet = exports.ShadowedCrown = exports.IronCladHelm = exports.RustedHelm = exports.LeatherChaps = void 0;
const items_service_1 = require("../../items.service");
exports.LeatherChaps = new items_service_1.RPGItems('Leather Chaps', items_service_1.ItemType.LEGS, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 2 },
        { name: items_service_1.DefenceStat.EVASION, value: 15 },
        { name: items_service_1.DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
        { name: items_service_1.ResistStat.FIRE_RES, value: 1 },
        { name: items_service_1.ResistStat.ICE_RES, value: 1 },
        { name: items_service_1.ResistStat.LIGHTNING_RES, value: 1 },
        { name: items_service_1.ResistStat.POISON_RES, value: 1 },
        { name: items_service_1.ResistStat.BLEED_RES, value: 1 },
    ],
}, 0.01, false, 1, 1);
exports.RustedHelm = new items_service_1.RPGItems('Rusted Legs', items_service_1.ItemType.LEGS, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 1 },
        { name: items_service_1.DefenceStat.EVASION, value: 4 },
        { name: items_service_1.DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
        { name: items_service_1.ResistStat.FIRE_RES, value: 1 },
        { name: items_service_1.ResistStat.ICE_RES, value: 1 },
        { name: items_service_1.ResistStat.LIGHTNING_RES, value: 1 },
        { name: items_service_1.ResistStat.POISON_RES, value: 1 },
        { name: items_service_1.ResistStat.BLEED_RES, value: 1 },
    ],
}, 0.01, false, 1, 1);
exports.IronCladHelm = new items_service_1.RPGItems('Iron Clad Legs', items_service_1.ItemType.LEGS, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 2 },
        { name: items_service_1.DefenceStat.EVASION, value: 6 },
        { name: items_service_1.DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
        { name: items_service_1.ResistStat.FIRE_RES, value: 1 },
        { name: items_service_1.ResistStat.ICE_RES, value: 1 },
        { name: items_service_1.ResistStat.LIGHTNING_RES, value: 1 },
        { name: items_service_1.ResistStat.POISON_RES, value: 1 },
        { name: items_service_1.ResistStat.BLEED_RES, value: 1 },
    ],
}, 0.01, false, 1, 1);
exports.ShadowedCrown = new items_service_1.RPGItems('Shadowed Legs', items_service_1.ItemType.LEGS, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 3 },
        { name: items_service_1.DefenceStat.EVASION, value: 8 },
        { name: items_service_1.DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
        { name: items_service_1.ResistStat.FIRE_RES, value: 1 },
        { name: items_service_1.ResistStat.ICE_RES, value: 1 },
        { name: items_service_1.ResistStat.LIGHTNING_RES, value: 1 },
        { name: items_service_1.ResistStat.POISON_RES, value: 1 },
        { name: items_service_1.ResistStat.BLEED_RES, value: 1 },
    ],
}, 0.01, false, 1, 1);
exports.FrostguardHelmet = new items_service_1.RPGItems('Frostguard Legs', items_service_1.ItemType.LEGS, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 4 },
        { name: items_service_1.DefenceStat.EVASION, value: 10 },
        { name: items_service_1.DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
        { name: items_service_1.ResistStat.FIRE_RES, value: 1 },
        { name: items_service_1.ResistStat.ICE_RES, value: 1 },
        { name: items_service_1.ResistStat.LIGHTNING_RES, value: 1 },
        { name: items_service_1.ResistStat.POISON_RES, value: 1 },
        { name: items_service_1.ResistStat.BLEED_RES, value: 1 },
    ],
}, 0.01, false, 1, 1);
exports.DragonboneLegs = new items_service_1.RPGItems('Dragonbone Legs', items_service_1.ItemType.LEGS, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 5 },
        { name: items_service_1.DefenceStat.EVASION, value: 12 },
        { name: items_service_1.DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
        { name: items_service_1.ResistStat.FIRE_RES, value: 1 },
        { name: items_service_1.ResistStat.ICE_RES, value: 1 },
        { name: items_service_1.ResistStat.LIGHTNING_RES, value: 1 },
        { name: items_service_1.ResistStat.POISON_RES, value: 1 },
        { name: items_service_1.ResistStat.BLEED_RES, value: 1 },
    ],
}, 0.01, false, 1, 1);
exports.AncientLegs = new items_service_1.RPGItems('Ancient Legs', items_service_1.ItemType.LEGS, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 6 },
        { name: items_service_1.DefenceStat.EVASION, value: 14 },
        { name: items_service_1.DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
        { name: items_service_1.ResistStat.FIRE_RES, value: 1 },
        { name: items_service_1.ResistStat.ICE_RES, value: 1 },
        { name: items_service_1.ResistStat.LIGHTNING_RES, value: 1 },
        { name: items_service_1.ResistStat.POISON_RES, value: 1 },
        { name: items_service_1.ResistStat.BLEED_RES, value: 1 },
    ],
}, 0.01, false, 1, 1);
exports.LegsOfTheFallen = new items_service_1.RPGItems('Legs of the Fallen', items_service_1.ItemType.LEGS, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 7 },
        { name: items_service_1.DefenceStat.EVASION, value: 16 },
        { name: items_service_1.DefenceStat.PARRY_CHANCE, value: 1 },
    ],
    resists: [
        { name: items_service_1.ResistStat.FIRE_RES, value: 1 },
        { name: items_service_1.ResistStat.ICE_RES, value: 1 },
        { name: items_service_1.ResistStat.LIGHTNING_RES, value: 1 },
        { name: items_service_1.ResistStat.POISON_RES, value: 1 },
        { name: items_service_1.ResistStat.BLEED_RES, value: 1 },
    ],
}, 0.01, false, 1, 1);
//# sourceMappingURL=legs.utils.js.map