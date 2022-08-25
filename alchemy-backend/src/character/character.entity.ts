import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Character {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  level: Number;

  @Column()
  hpMax: Number;

  @Column()
  hpCurrent: Number;

  @Column()
  xpMax: Number;

  @Column()
  xpCurrent: Number;

  @Column()
  damage: Number;

  @Column()
  accuracy: Number;

  @Column()
  armour: Number;

  @Column()
  evasion: Number;

  @Column()
  critChance: Number;

  @Column()
  gold: Number;

  @Column()
  user: string;
}
