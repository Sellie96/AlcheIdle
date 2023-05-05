"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPGItems = exports.ResistStat = exports.DefenceStat = exports.AttributeStat = exports.OffenseStat = exports.ItemType = void 0;
var ItemType;
(function (ItemType) {
    ItemType["HELM"] = "Helm";
    ItemType["AMULET"] = "Amulet";
    ItemType["BODY"] = "Body";
    ItemType["LEGS"] = "Legs";
    ItemType["GLOVES"] = "Gloves";
    ItemType["RING"] = "Ring";
    ItemType["BOOTS"] = "Boots";
    ItemType["WEAPON"] = "Weapon";
    ItemType["SHIELD"] = "Shield";
    ItemType["CONSUMABLE"] = "Consumable";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
var OffenseStat;
(function (OffenseStat) {
    OffenseStat["HP"] = "HP";
    OffenseStat["MANA"] = "Mana";
    OffenseStat["CRIT_CHANCE"] = "Crit Chance";
    OffenseStat["CRIT_DAMAGE"] = "Crit Damage";
    OffenseStat["ATTACK_SPEED"] = "Attack Speed";
    OffenseStat["ACCURACY"] = "Accuracy";
})(OffenseStat = exports.OffenseStat || (exports.OffenseStat = {}));
var AttributeStat;
(function (AttributeStat) {
    AttributeStat["STRENGTH"] = "Strength";
    AttributeStat["DEXTERITY"] = "Dexterity";
    AttributeStat["INTELLIGENCE"] = "Intelligence";
    AttributeStat["ENDURANCE"] = "Endurance";
    AttributeStat["AGILITY"] = "Agility";
    AttributeStat["LUCK"] = "Luck";
})(AttributeStat = exports.AttributeStat || (exports.AttributeStat = {}));
var DefenceStat;
(function (DefenceStat) {
    DefenceStat["ARMOR"] = "Armor";
    DefenceStat["EVASION"] = "Evasion";
    DefenceStat["MAGIC_RESIST"] = "Magic Resist";
    DefenceStat["BLOCK_CHANCE"] = "Block Chance";
    DefenceStat["PARRY_CHANCE"] = "Parry Chance";
})(DefenceStat = exports.DefenceStat || (exports.DefenceStat = {}));
var ResistStat;
(function (ResistStat) {
    ResistStat["FIRE_RES"] = "Fire Res";
    ResistStat["ICE_RES"] = "Ice Res";
    ResistStat["LIGHTNING_RES"] = "Lightning Res";
    ResistStat["POISON_RES"] = "Poison Res";
    ResistStat["BLEED_RES"] = "Bleed Res";
    ResistStat["STUN_RES"] = "Stun Res";
    ResistStat["CONFUSE_RES"] = "Confuse Res";
    ResistStat["SILENCE_RES"] = "Silence Res";
})(ResistStat = exports.ResistStat || (exports.ResistStat = {}));
class RPGItems {
    constructor(name, itemType, equipable, stackable, stats, dropChance, special, amount, value, healAmount) {
        var _a, _b, _c, _d;
        this.name = name;
        this.itemType = itemType;
        this.equipable = equipable;
        this.stackable = stackable;
        this.stats = {
            offense: (_a = stats.offense) === null || _a === void 0 ? void 0 : _a.filter((stat) => stat.value !== 0),
            attributes: (_b = stats.attributes) === null || _b === void 0 ? void 0 : _b.filter((stat) => stat.value !== 0),
            defence: (_c = stats.defence) === null || _c === void 0 ? void 0 : _c.filter((stat) => stat.value !== 0),
            resists: (_d = stats.resists) === null || _d === void 0 ? void 0 : _d.filter((stat) => stat.value !== 0),
        };
        this.dropChance = dropChance;
        this.special = special;
        this.amount = amount;
        this.value = value;
        this.healAmount = healAmount;
    }
}
exports.RPGItems = RPGItems;
//# sourceMappingURL=items.service.js.map