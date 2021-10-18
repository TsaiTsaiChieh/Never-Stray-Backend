/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import axios, {AxiosResponse} from 'axios'
import chalk from 'chalk'
import dotenv from 'dotenv'
import _ from 'lodash'
import safeAwait from 'safe-await'
import {Connection} from 'typeorm'

import {Area} from '../entity/Area'
import {AppError} from '../utils/app-error'

dotenv.config()

type ShelterData = {
  animal_id: number
  animal_subid: string
  animal_area_pkid: number
  animal_kind: string
  animal_sex: string
  animal_colour: string,
  animal_age: string
  animal_sterilization: string
  animal_bacterin: string
  animal_title: string
  animal_status: string
  animal_remark: string
  album_file: string
  shelter_tel: string
}

export class Shelter {
  public url: string = process.env.NATIONAL_ANIMAL_SHELTER!
  // private db: Connection
  private batch: number = 100

  constructor() {

  }
  // constructor(db: Connection) {
  //   this.db = db
  // }
  // get data

  public async getData() {
    const allData: ShelterData[] = []
    for (let page = 0; ; page++) {
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

// export default getShelterData
// export async function getShelterData(db: Connection) {
//   const shelter = new Shelter(db = db)
//   await shelter.getData()
// }

export async function getShelterData() {
  const shelter = new Shelter()
  const data = await shelter.getData()
  console.log(data.length)
}

getShelterData()
