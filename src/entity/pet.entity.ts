/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import {Area, City} from './area.entity'

export enum Ref {
  GOV = 'gov',
  MAP = 'map',
  OWN = 'own',
}
export enum Sex {
  FEMALE = 'F',
  MALE = 'M',
  UNKNOWN = 'U',
}
export enum Age {
  ADULT = 'A',
  CHILD = 'C',
  UNKNOWN = 'U',
}

export enum Ternary {
  TRUE = 'T',
  FALSE = 'F',
  UNKNOWN = 'U',
}

export enum Status {
  UNKNOWN = 'Unknown',
  OPEN = 'Open',
  ADOPTED = 'Adopted',
  OTHER = 'Other',
  DEAD = 'Dead',
}

export enum Kind {
  DOG = 'D',
  CAT = 'C',
  OTHER = 'O',
}

@Entity({name: 'pets'})
@Index(['sub_id', 'accept_num'], {unique: true})
@Index(['status', 'accept_num'])
@Index([
  'status',
  'city_id',
  'color',
  'kind',
  'age',
  'sex',
  'ref',
  'created_at',
  'updated_at',
])
/** Class representing a pet */
export class Pet {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({type: 'int', nullable: false})
  sub_id: number

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
    comment: '政府收容編號',
  })
  accept_num: string

  @Column({type: 'enum', enum: Ref, nullable: false})
  ref: Ref

  @Column({type: 'enum', enum: City, nullable: false, name: 'city_id'})
  city_id?: City

  @ManyToOne((type) => Area)
  @JoinColumn({name: 'city_id', referencedColumnName: 'city'})
  city?: City

  @Column({type: 'enum', enum: Kind, nullable: false})
  kind: Kind

  @Column({type: 'enum', enum: Sex, default: Sex.UNKNOWN})
  sex: Sex

  @Column({type: 'varchar', length: 32, nullable: true})
  color: string

  @Column({type: 'enum', enum: Age, default: Age.UNKNOWN})
  age: Age

  @Column({
    type: 'enum',
    enum: Ternary,
    default: Ternary.UNKNOWN,
    comment: '是否絕育',
  })
  ligation: Ternary

  @Column({
    type: 'enum',
    enum: Ternary,
    default: Ternary.UNKNOWN,
    comment: '是否施打狂犬病疫苗',
  })
  rabies: Ternary

  @Column({type: 'varchar', length: 255, nullable: true})
  title: string

  @Column({type: 'enum', enum: Status, default: Status.UNKNOWN})
  status: Status

  @Column({type: 'text', nullable: true})
  remark: string

  @Column({type: 'varchar', length: 255, nullable: true})
  address: string

  @Column({type: 'varchar', length: 16, nullable: true})
  phone: string

  @Column({type: 'json', nullable: true})
  image: string[] | null

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at?: Date
}
