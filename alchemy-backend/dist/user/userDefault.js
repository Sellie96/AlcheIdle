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
                    hpCurrent: 100,
                    hpMax: 100,
                    attack: 1,
                    defence: 1,
                    strength: 1,
                    magic: 1,
                    ranged: 1,
                },
                currencies: {
                    gold: 1,
                    energy: 1,
                    lifeForce: 1,
                    gems: 1,
                },
                skills: {
                    agility: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    alchemy: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    cooking: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    crafting: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    firemaking: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    fishing: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    fletching: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    herblore: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    mining: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    runecrafting: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    smithing: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    thieving: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                    woodcutting: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1,
                        pet: false,
                    },
                },
                backpack: [],
                equipment: [],
            },
        };
        return data;
    });
}
exports.UserDataCreation = UserDataCreation;
//# sourceMappingURL=userDefault.js.map