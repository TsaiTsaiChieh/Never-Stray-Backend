/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import axios, {AxiosResponse} from 'axios'
import _ from 'lodash'
import safeAwait from 'safe-await'
import {Connection, InsertResult} from 'typeorm'

import {Pet, Ref} from '../entity/Pet'
import {AppError} from '../utils/app-error'
import {
  ageConvert,
  petStatusConvert,
  sexConvert,
  ternaryConvert,
} from '../utils/value-convert'


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
        &$skip=68
        &animal_status=OPEN`,
        ))
      // &$skip=${this.batch * page}
      if (error) throw new AppError(error)
      const data: ShelterData[] = response.data
      if (!data.length) break
      _.forEach(data, (val) => {
        // Because shelters need the values of
        // animal_id and animal_subid to be linked
        if (val.animal_id && val.animal_subid) {
          allData.push(val)
        }
      },
      )
    }
    return allData
  }
  public async saveData(data: ShelterData[]) {
    const petData: Partial<Pet>[] = []
    _.forEach(data, (val) => {
      petData.push({
        ref: <Ref>'gov',
        sub_id: val.animal_id,
        accept_num: val.animal_subid,
        area_id: val.animal_area_pkid,
        kind: val.animal_kind,
        sex: sexConvert(val.animal_sex),
        color: val.animal_colour,
        age: ageConvert(val.animal_age),
        ligation: ternaryConvert(val.animal_sterilization),
        rabies: ternaryConvert(val.animal_bacterin),
        title: val.animal_place,
        status: petStatusConvert(val.animal_status),
        remark: val.animal_remark,
        address: val.shelter_address,
        phone: val.shelter_tel,
        image: [val.album_file],
        created_at: new Date(val.animal_createtime),
      })
    },
    )
    const [error, result]: [any, InsertResult] =
      await safeAwait(
        this.db.createQueryBuilder()
          .insert()
          .into(Pet)
          .values(petData)
          .execute())

    if (error) throw new AppError(error)
    console.log(result.raw)
  }
}


export async function getShelterData(db: Connection) {
  const shelter = new Shelter(db)
  const data: ShelterData[] = await shelter.getData()
  await shelter.saveData(data)
}
