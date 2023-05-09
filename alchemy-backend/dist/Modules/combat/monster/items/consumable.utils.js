"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meat = exports.Bread = exports.Potato = exports.Onion = void 0;
const items_service_1 = require("../../items.service");
exports.Onion = new items_service_1.RPGItems('Onion', items_service_1.ItemType.CONSUMABLE, false, true, {}, 0, false, 3, 1, 10);
exports.Potato = new items_service_1.RPGItems('Potato', items_service_1.ItemType.CONSUMABLE, false, true, {}, 1, false, 3, 50, 25);
exports.Bread = new items_service_1.RPGItems('Bread', items_service_1.ItemType.CONSUMABLE, false, true, {}, 1, false, 3, 500, 50);
exports.Meat = new items_service_1.RPGItems('Meat', items_service_1.ItemType.CONSUMABLE, false, true, {}, 1, false, 1, 1000, 100);
//# sourceMappingURL=consumable.utils.js.map