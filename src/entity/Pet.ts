import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum Ref {
  GOV = 'gov',
  MAP = 'map',
  OWN = 'own'
}
export enum Sex {
  FEMALE = 'F',
  MALE = 'M',
  UNKNOWN = 'U'
}

export enum Age {
  ADULT = 'A',
  CHILD = 'C',
  UNKNOWN = 'U'
}

export enum Ternary {
  TRUE = 'T',
  FALSE = 'F',
  UNKNOWN = 'U'
}

export enum Status {
  UNKNOWN = 'Unknown',
  OPEN = 'Open',
  ADOPTED = 'Adopted',
  OTHER = 'Other',
  DEAD = 'Dead'
}

@Entity({name: 'pets'})
@Index(['sub_id', 'accept_num'], {unique: true})
@Index(['status', 'accept_num'])
/** Class representing a pet */
export class Pet {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({type: 'bigint', nullable: false})
  sub_id: number

  @Column({
    type: 'varchar', length: 16,
    nullable: true, comment: '政府收容編號',
  })
  accept_num: string

  @Column({type: 'enum', enum: Ref, nullable: false})
  ref: Ref

  @Column({type: 'tinyint', nullable: false})
  area_id: number

  @Column({type: 'tinytext', nullable: false})
  kind: string

  @Column({type: 'enum', enum: Sex, default: Sex.UNKNOWN})
  sex: Sex

  @Column({type: 'tinytext'})
  color: string

  @Column({type: 'enum', enum: Age, default: Age.UNKNOWN})
  age: Age

  @Column({
    type: 'enum', enum: Ternary,
    default: Ternary.UNKNOWN, comment: '是否絕育',
  })
  ligation: Ternary

  @Column({
    type: 'enum', enum: Ternary,
    default: Ternary.UNKNOWN, comment: '是否施打狂犬病疫苗',
  })
  rabies: Ternary

  @Column({type: 'tinytext'})
  title: string

  @Column({type: 'enum', enum: Status, default: Status.UNKNOWN})
  status: Status

  @Column({type: 'tinytext', nullable: true})
  remark: string

  @Column({type: 'tinytext', nullable: true})
  address: string

  @Column({type: 'tinytext', nullable: true})
  phone: string

  @Column({type: 'json', nullable: true})
  image: string[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at?: Date
}

