/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import dotenv from 'dotenv'
import axios, {AxiosResponse} from 'axios'
import {Connection} from 'typeorm'
import _ from 'lodash'
import {Area} from '../entity/Area'
dotenv.config()
type ShelterData = {
  animal_id: number
  animal_subid: string
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
    const allData: any[] = []
    for (let page = 0; ; page++) {
      const response: AxiosResponse<ShelterData[]> = await axios.get(
        `${this.url}
        &$top=${this.batch}
        &$skip=${this.batch * page}
        &animal_status=OPEN`,
      )

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
