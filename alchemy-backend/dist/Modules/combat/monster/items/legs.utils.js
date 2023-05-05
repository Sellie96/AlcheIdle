"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeatherChaps = void 0;
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
//# sourceMappingURL=legs.utils.js.map