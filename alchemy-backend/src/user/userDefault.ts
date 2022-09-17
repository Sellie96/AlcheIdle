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
}
