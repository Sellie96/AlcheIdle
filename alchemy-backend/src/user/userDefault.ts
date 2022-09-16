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
        },
        alchemy: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        cooking: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        crafting: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        firemaking: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        fishing: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        fletching: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        herblore: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        mining: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        runecrafting: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        smithing: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        thieving: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
        woodcutting: {
          level: 1,
          xpMax: 1,
          xpCurrent: 1,
        },
      },
      backpack: [],
      equipment: [],
    },
  };

  return data;
}
