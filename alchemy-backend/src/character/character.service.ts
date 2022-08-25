import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { CreateCharacterInput } from './character.input';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async getCharacter(id: string): Promise<Character> {
    return this.characterRepository.findOne({ id });
  }

  async getCharacters(): Promise<Character[]> {
    return this.characterRepository.find();
  }

  async createCharacter(
    createCharacterInput: CreateCharacterInput,
  ): Promise<Character> {
    const {
      level,
      hpMax,
      hpCurrent,
      xpMax,
      xpCurrent,
      damage,
      accuracy,
      armour,
      evasion,
      critChance,
      gold,
      user
    } = createCharacterInput;
    const character = this.characterRepository.create({
      id: randomUUID(),
      level,
      hpMax,
      hpCurrent,
      xpMax,
      xpCurrent,
      damage,
      accuracy,
      armour,
      evasion,
      critChance,
      gold,
      user
    });

    return this.characterRepository.save(character);
  }
}
