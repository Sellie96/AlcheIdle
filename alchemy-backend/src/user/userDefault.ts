import { RegisterData } from './register.interface';
import * as bcrypt from 'bcrypt';

export async function UserDataCreation(registerData: RegisterData) {
  const data = {
    username: registerData.username,
    password: await bcrypt.hash(registerData.password, 10),
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
          tool: {},
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
      equipment: [],
    },
  };

  return data;
}
