"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyOfTheFallen = exports.AncientBody = exports.DragonboneBody = exports.FrostguardBody = exports.ShadowedBody = exports.IronCladBody = exports.RustedBody = exports.LeatherBody = void 0;
const items_service_1 = require("../../items.service");
exports.LeatherBody = new items_service_1.RPGItems('Leather Body', items_service_1.ItemType.BODY, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 3 },
        { name: items_service_1.DefenceStat.EVASION, value: 20 },
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
exports.RustedBody = new items_service_1.RPGItems('Rusted Body', items_service_1.ItemType.BODY, true, false, {
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
exports.IronCladBody = new items_service_1.RPGItems('Iron Clad Body', items_service_1.ItemType.BODY, true, false, {
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
exports.ShadowedBody = new items_service_1.RPGItems('Shadowed Body', items_service_1.ItemType.BODY, true, false, {
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
exports.FrostguardBody = new items_service_1.RPGItems('Frostguard Body', items_service_1.ItemType.BODY, true, false, {
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
exports.DragonboneBody = new items_service_1.RPGItems('Dragonbone Body', items_service_1.ItemType.BODY, true, false, {
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
}, 0.1, false, 1, 1);
exports.AncientBody = new items_service_1.RPGItems('Ancient Body', items_service_1.ItemType.BODY, true, false, {
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
}, 0.1, false, 1, 1);
exports.BodyOfTheFallen = new items_service_1.RPGItems('Body of the Fallen', items_service_1.ItemType.BODY, true, false, {
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
//# sourceMappingURL=body.utils.js.map