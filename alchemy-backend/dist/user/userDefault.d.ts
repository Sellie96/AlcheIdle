import { RegisterData } from './register.interface';
export declare function UserDataCreation(registerData: RegisterData): Promise<{
    username: string;
    password: any;
    asActive: boolean;
    character: {
        characterName: string;
        characterAlignment: string;
        combatStats: {
            stats: {
                health: number;
                maxHealth: number;
                mana: number;
                maxMana: number;
                strength: number;
                dexterity: number;
                intelligence: number;
                endurance: number;
                agility: number;
                luck: number;
            };
            defenses: {
                armor: number;
                maxArmor: number;
                magicResistance: number;
            };
            combat: {
                criticalHitChance: number;
                criticalHitDamage: number;
                attackSpeed: number;
                castSpeed: number;
                accuracy: number;
                evasion: number;
                blockChance: number;
                parryChance: number;
            };
            elemental: {
                fireResistance: number;
                iceResistance: number;
                lightningResistance: number;
                fireAffinity: number;
                iceAffinity: number;
                lightningAffinity: number;
                fireWeakness: number;
                iceWeakness: number;
                lightningWeakness: number;
            };
            magic: {
                healingPower: number;
                spellPower: number;
            };
            progression: {
                experiencePoints: number;
                level: number;
                gold: number;
                inventorySize: number;
                encumbrance: number;
                skillPoints: number;
                talentPoints: number;
            };
            resource: {
                rage: number;
                energy: number;
                comboPoints: number;
                fireCharges: number;
                iceCharges: number;
                lightningCharges: number;
            };
            debuffResistances: {
                poisonResistance: number;
                bleedResistance: number;
                stunResistance: number;
                confuseResistance: number;
                charmResistance: number;
                fearResistance: number;
                silenceResistance: number;
            };
        };
        skills: {
            agility: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            alchemy: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            cooking: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            crafting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            firemaking: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            fishing: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {
                    name: string;
                    bonus: number;
                };
            };
            fletching: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            herblore: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            mining: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            runecrafting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            smithing: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            thieving: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {};
            };
            woodcutting: {
                level: number;
                xpMax: number;
                xpCurrent: number;
                pet: boolean;
                tool: {
                    name: string;
                    bonus: number;
                };
            };
        };
        backpack: any[];
        equipment: {
            head: {};
            neck: {};
            shoulders: {};
            chest: {};
            hands: {};
            waist: {};
            legs: {};
            feet: {};
            ring1: {};
            ring2: {};
            trinket1: {};
            trinket2: {};
            mainHand: {};
            offHand: {};
            necklace: {};
            cape: {};
        };
    };
}>;
