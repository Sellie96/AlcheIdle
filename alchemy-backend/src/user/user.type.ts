import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CharacterType } from 'src/character/character.type';

@ObjectType('User')
export class UserType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field(type => [CharacterType])
    characters: string[];
}