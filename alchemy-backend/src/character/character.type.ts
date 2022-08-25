import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Character')
export class CharacterType {
  @Field(type => ID)
  id: string;

  @Field()
  level: Number;

  @Field()
  hpMax: Number;

  @Field()
  hpCurrent: Number;

  @Field()
  xpMax: Number;

  @Field()
  xpCurrent: Number;

  @Field()
  damage: Number;

  @Field()
  accuracy: Number;

  @Field()
  armour: Number;

  @Field()
  evasion: Number;

  @Field()
  critChance: Number;

  @Field()
  gold: Number;

  @Field()
  user: string;
}
