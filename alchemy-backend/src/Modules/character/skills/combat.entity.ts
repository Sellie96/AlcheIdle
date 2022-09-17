import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class CombatStats {
  @ObjectIdColumn()
  id?: number;

  @Column()
  hpCurrent: number;

  @Column()
  hpMax: number;

  @Column()
  attack: number;

  @Column()
  defence: number;

  @Column()
  strength: number;

  @Column()
  magic: number;

  @Column()
  ranged: number;
}
