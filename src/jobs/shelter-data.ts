/* eslint-disable camelcase */
import axios, {AxiosResponse} from 'axios'
import chalk from 'chalk'
import safeAwait from 'safe-await'

import {Pet, Ref} from '../entity/Pet'
import {PetRepository} from '../repositories/pet.repository'
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
/** Class representing a pet repository  */
export class Shelter {
  public url: string = process.env.NATIONAL_ANIMAL_SHELTER!
  private batch: number = 1
  private petRepository: PetRepository
  /** Create a shelter */
  constructor() {
    this.petRepository = new PetRepository()
  }
  /** 取得狀態為待認養的動物資料
   * @return {Promise<ShelterData[]>}
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
  /** 更新動物的資訊
   * @param  {ShelterData[]} data - From API
   * @return {ShelterData[]}
   */
  public async updateData(data: ShelterData[]): Promise<ShelterData[]> {
    const rmIndex: number[] = []


    data.forEach(async (ele, i) => {
      const [error, result]: [any, Pet | undefined] =
        await safeAwait(this.petRepository.findOne({
          sub_id: ele.animal_id,
          accept_num: ele.animal_subid,
        }))
      if (error) throw new AppError(error)
      if (result) {
        // update it
      }
    })
    //   // save it, if the data not found
    //   if (result === undefined) {
    //     const pet: Pet = petRepository.create()
    //     pet.ref = <Ref>'gov'
    //     pet.sub_id = val.animal_id
    //     pet.accept_num = val.animal_subid
    //     pet.area_id = val.animal_area_pkid
    //     pet.kind = val.animal_kind
    //     pet.sex = sexConvert(val.animal_sex)
    //     pet.color = val.animal_colour
    //     pet.age = ageConvert(val.animal_age)
    //     pet.ligation = ternaryConvert(val.animal_sterilization)
    //     pet.rabies = ternaryConvert(val.animal_bacterin)
    //     pet.title = val.animal_place
    //     pet.status = petStatusConvert(val.animal_status)
    //     pet.remark = val.animal_remark
    //     pet.address =val.shelter_address
    //     pet.phone = val.shelter_tel
    //     pet.image = [val.album_file]
    //     pet.created_at = new Date(val.animal_createtime)

    //     const [error, result] : [any, Pet] =
    //     await safeAwait(this.db.getRepository(Pet).save(pet))
    //     if (error) throw new AppError(error)
    //     console.log(`insert: ${result}`)
    //     console.log(result)
    //   } else {
    //     // or update the pet data and push the index to the rmIndex array
    //     const [error, result] : [any, UpdateResult] =
    //     await safeAwait(petRepository.update({
    //       sub_id: val.animal_id,
    //       accept_num: val.animal_subid},
    //       {
    //         ref: <Ref>'gov',
    //         area_id: val.animal_area_pkid,
    //         kind: val.animal_kind,
    //         sex: sexConvert(val.animal_sex),
    //         color: val.animal_colour,
    //         age: ageConvert(val.animal_age),
    //         ligation: ternaryConvert(val.animal_sterilization),
    //         rabies: ternaryConvert(val.animal_bacterin),
    //         title: val.animal_place,
    //         status: petStatusConvert(val.animal_status),
    //         remark: val.animal_remark,
    //         address: val.shelter_address,
    //         phone: val.shelter_tel,
    //         image: [val.album_file],
    //         created_at: new Date(val.animal_createtime),
    //       }))
    //     if (error) throw new AppError(error)
    //     console.log(`update: ${result}`)
    //     console.log(result)
    //     rmIndex.push(i)
    //   }
    // })
    // _.pullAt(data, rmIndex)
    // console.log(data.length)
    return data
  }
  /** 儲存寵物的資訊
   * @param  {ShelterData[]} data - From axios
   */
  public async saveData(data: ShelterData[]) {
    const petData: Pet[] = []
    data.forEach((ele) =>
      petData.push({
        ref: <Ref>'gov',
        sub_id: ele.animal_id,
        accept_num: ele.animal_subid,
        area_id: ele.animal_area_pkid,
        kind: ele.animal_kind,
        sex: sexConvert(ele.animal_sex),
        color: ele.animal_colour,
        age: ageConvert(ele.animal_age),
        ligation: ternaryConvert(ele.animal_sterilization),
        rabies: ternaryConvert(ele.animal_bacterin),
        title: ele.animal_place,
        status: petStatusConvert(ele.animal_status),
        remark: ele.animal_remark,
        address: ele.shelter_address,
        phone: ele.shelter_tel,
        image: [ele.album_file],
        created_at: new Date(ele.animal_createtime),
      }))
    const [error, result]: [any, Pet[]] =
      await safeAwait(this.petRepository.saveMany(petData))
    if (error) throw new AppError(error)
    if (result) console.log(chalk.green(`=== Get ${result.length} data ===`))
  }
}

/** Get shelter data*/
export async function getShelterData() {
  const shelter = new Shelter()
  const data: ShelterData[] = await shelter.getData()
  // await shelter.saveData(data)
  await shelter.updateData(data)
}
