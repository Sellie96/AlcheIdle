import { PlayerData } from '../state/CharacterDataTypes';

export interface LoginResponse {
  access_token: string;
  userData: PlayerData;
  message: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface RegisterForm {
  username: string;
  password: string;
  email: string;
  characterName: string;
  characterAlignment: string;
}
