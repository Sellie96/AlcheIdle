"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelmOfTheFallen = exports.AncientHelm = exports.DragonboneHelm = exports.FrostguardHelmet = exports.ShadowedCrown = exports.IronCladHelm = exports.RustedHelm = void 0;
const items_service_1 = require("../../items.service");
exports.RustedHelm = new items_service_1.RPGItems('Rusted Helm', items_service_1.ItemType.HELM, true, false, {
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
exports.IronCladHelm = new items_service_1.RPGItems('Iron Clad Helm', items_service_1.ItemType.HELM, true, false, {
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
exports.ShadowedCrown = new items_service_1.RPGItems('Shadowed Crown', items_service_1.ItemType.HELM, true, false, {
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
exports.FrostguardHelmet = new items_service_1.RPGItems('Frostguard Helmet', items_service_1.ItemType.HELM, true, false, {
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
exports.DragonboneHelm = new items_service_1.RPGItems('Dragonbone Helm', items_service_1.ItemType.HELM, true, false, {
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
exports.AncientHelm = new items_service_1.RPGItems('Ancient Helm', items_service_1.ItemType.HELM, true, false, {
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
exports.HelmOfTheFallen = new items_service_1.RPGItems('Helm of the Fallen', items_service_1.ItemType.HELM, true, false, {
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
//# sourceMappingURL=head.utils.js.map