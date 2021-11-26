import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'

export enum Region {
  EAST = 'E',
  WEST = 'W',
  SOUTH = 'S',
  NORTH = 'N',
  MIDDLE = 'M'
}

export enum City {
  TPE = '2', // 臺北市
  TPH = '3', // 新北市
  KLU = '4', // 基隆市
  ILN = '5', // 宜蘭縣
  TYC = '6', // 桃園市
  HSH = '7', // 新竹縣
  HSC = '8', // 新竹市
  MAL = '9', // 苗栗縣
  TXG = '10', // 臺中市
  CWH = '11', // 彰化縣
  NTO = '12', // 南投縣
  YLH = '13', // 雲林縣
  CHY = '14', // 嘉義縣
  CYI = '15', // 嘉義市
  TNN = '16', // 臺南市
  KHH = '17', // 高雄市
  IUH = '18', // 屏東縣
  HWA = '19', // 花蓮縣
  TTT = '20', // 臺東縣
  PEH = '21', // 澎湖縣
  KMN = '22', // 金門縣
  LNN = '23' // 連江縣
}

@Entity({name: 'areas'})
@Index(['city'])
@Index(['region', 'city'], {unique: true})
/** Class representing the Area */
export class Area {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({type: 'enum', enum: Region, nullable: false})
  region: Region

  @Column({type: 'enum', enum: City, nullable: false})
  city: City

  @Column({length: 4})
  name: string
}
