"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeatherBody = void 0;
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
//# sourceMappingURL=body.utils.js.map