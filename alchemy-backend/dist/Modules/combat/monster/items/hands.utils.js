"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeatherGloves = void 0;
const items_service_1 = require("../../items.service");
exports.LeatherGloves = new items_service_1.RPGItems('Leather Gloves', items_service_1.ItemType.GLOVES, true, false, {
    attributes: [{ name: items_service_1.AttributeStat.STRENGTH, value: 1 }],
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 1 },
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
}, 0.005, false, 1, 1);
//# sourceMappingURL=hands.utils.js.map