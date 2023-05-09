"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataCreation = void 0;
const bcrypt = require("bcrypt");
function UserDataCreation(registerData) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            username: registerData.username,
            password: yield bcrypt.hash(registerData.password, 10),
            asActive: true,
            character: {
                characterName: registerData.characterName,
                characterAlignment: registerData.characterAlignment,
                combatStats: {
                    stats: {
                        health: 100,
                        maxHealth: 100,
                        mana: 50,
                        maxMana: 50,
                        strength: 23,
                        dexterity: 10,
                        intelligence: 10,
                        endurance: 10,
                        agility: 10,
                        luck: 10,
                    },
                    defenses: {
                        armor: 0,
                        magicResistance: 0,
                        evasion: 640,
                    },
                    combat: {
                        criticalHitChance: 1,
                        criticalHitDamage: 50,
                        attackSpeed: 5,
                        castSpeed: 5,
                        accuracy: 1000,
                        blockChance: 1,
                        parryChance: 1,
                    },
                    resistances: {
                        fireResistance: 0,
                        iceResistance: 0,
                        lightningResistance: 0,
                        poisonResistance: 0,
                        bleedResistance: 0,
                        stunResistance: 0,
                        confuseResistance: 0,
                        silenceResistance: 0,
                    },
                    progression: {
                        experiencePoints: 0,
                        level: 1,
                        gold: 0,
                        inventorySize: 50,
                        skillPoints: 0,
                        talentPoints: 0,
                    },
                },
                skills: {
                    agility: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    alchemy: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    cooking: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    crafting: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    firemaking: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    fishing: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {
                            name: 'Makeshift Rod',
                            bonus: 1,
                        },
                    },
                    fletching: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    herblore: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    mining: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    runecrafting: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    smithing: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    thieving: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {},
                    },
                    woodcutting: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                        tool: {
                            name: 'Makeshift Axe',
                            bonus: 0.95,
                        },
                    },
                },
                backpack: [],
                equipment: {
                    head: {},
                    neck: {},
                    shoulders: {},
                    chest: {},
                    hands: {},
                    waist: {},
                    legs: {},
                    feet: {},
                    ring1: {},
                    ring2: {},
                    trinket1: {},
                    trinket2: {},
                    mainHand: {},
                    offHand: {},
                    necklace: {},
                    cape: {},
                },
            },
        };
        return data;
    });
}
exports.UserDataCreation = UserDataCreation;
//# sourceMappingURL=userDefault.js.map