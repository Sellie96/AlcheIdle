"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BronzeShield = void 0;
const items_service_1 = require("../../items.service");
exports.BronzeShield = new items_service_1.RPGItems('Bronze Shield', items_service_1.ItemType.SHIELD, true, false, {
    defence: [
        { name: items_service_1.DefenceStat.ARMOR, value: 2 },
        { name: items_service_1.DefenceStat.EVASION, value: 10 },
        { name: items_service_1.DefenceStat.BLOCK_CHANCE, value: 1 },
    ],
    resists: [
        { name: items_service_1.ResistStat.FIRE_RES, value: 1 },
        { name: items_service_1.ResistStat.ICE_RES, value: 1 },
        { name: items_service_1.ResistStat.LIGHTNING_RES, value: 1 },
        { name: items_service_1.ResistStat.POISON_RES, value: 1 },
        { name: items_service_1.ResistStat.BLEED_RES, value: 1 },
    ],
}, 0.08, false, 1, 1);
//# sourceMappingURL=offhand.utils.js.map