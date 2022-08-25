import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCharacterInput } from './character.input';
import { CharacterService } from './character.service';
import { CharacterType } from './character.type';

@Resolver((of) => CharacterType)
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query((returns) => CharacterType)
  character(@Args('id') id:string) {
    return this.characterService.getCharacter(id)
  }

  @Query((returns) => [CharacterType])
  getCharacters() {
    return this.characterService.getCharacters();
  }

  @Mutation((returns) => CharacterType)
  createCharacter(
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput
  ) {
    return this.characterService.createCharacter(
      createCharacterInput
    );
  }
}
