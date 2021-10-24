/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import axios, {AxiosResponse} from 'axios'
import chalk from 'chalk'
import dotenv from 'dotenv'
import {Pet, Ref} from '../entity/Pet'
import _ from 'lodash'
import safeAwait from 'safe-await'
import {Connection} from 'typeorm'

import {AppError} from '../utils/app-error'

dotenv.config()

type ShelterData = {
  animal_id: number
  animal_subid: string
  animal_area_pkid: number
  animal_shelter_pkid: number
  animal_place: string
  animal_kind: string
  animal_sex: string
  animal_bodytype: string
  animal_colour: string
  animal_age: string
  animal_sterilization: string
  animal_bacterin: string
  animal_foundplace: string
  animal_title: string
  animal_status: string
  animal_remark: string
  animal_caption: string
  animal_opendate: string
  animal_closeddate: string
  animal_update: string
  animal_createtime: string
  shelter_name: string
  album_file: string
  album_update: string
  cDate: string
  shelter_address: string
  shelter_tel: string
}
// type PetData
export class Shelter {
  public url: string = process.env.NATIONAL_ANIMAL_SHELTER!
  private db: Connection
  private batch: number = 1
  /**
   * @param  {Connection} db
   */
  constructor(db: Connection) {
    this.db = db
  }
  /** get data
   * @return {Promise<ShelterData[]>} all pet data
   */
  public async getData(): Promise<ShelterData[]> {
    const allData: ShelterData[] = []
    // for (let page = 0; page < 1; page++) {
    for (let page = 0; page < 1; page++) {
      const [error, response]: [any, AxiosResponse<ShelterData[]>] =
        await safeAwait(axios.get(
          `${this.url}
        &$top=${this.batch}
        &$skip=${this.batch * page}
        &animal_status=OPEN`,
        ))
      if (error) throw new AppError(chalk.red(error))
      const data: ShelterData[] = response.data
      if (!data.length) break
      _.forEach(data, (val) => allData.push(val),
      )
    }
    return allData
  }
  public async saveData(data: ShelterData[]) {
    const PetData: any[] = []
    _.forEach(data, (val) => PetData.push({
      ref: <Ref>'gov',
      area_id: val.animal_area_pkid,
      kind: val.animal_kind,
      sex: val.animal_sex,
    }),
    )
    console.log(PetData)
    // await this.db.createQueryBuilder().
    //   insert().
    //   into(Pet).
    //   values().
    //   execute()
  }
  // save to db
  // const findArea = await this.db.getRepository(Area).findOne()
  // console.log(findArea)
}
// async function getShelterData(db: Connection) {
//   // const findArea = await db.getRepository(Area).findOne()
//   // console.log(findArea)
//   const url: string = process.env.NATIONAL_ANIMAL_SHELTER!
//   // const data = await axios.get(`${url}`)
//   console.log(url)
// }

export async function getShelterData(db: Connection) {
  const shelter = new Shelter(db)
  const data: ShelterData[] = await shelter.getData()
  await shelter.saveData(data)
}

// export async function getShelterData() {
//   const shelter = new Shelter()
//   const data = await shelter.getData()
//   console.log(data.length)
// }
