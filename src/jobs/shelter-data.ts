/* eslint-disable camelcase */
import axios, {AxiosResponse} from 'axios'
import safeAwait from 'safe-await'
import {UpdateResult} from 'typeorm'

import {Pet, Ref, Status} from '../entity/pet.entity'
import {PetRepository} from '../repositories/pet.repository'
import {AppError} from '../utils/app-error'
import {greenLog, yellowLog} from '../utils/chalk-logger'
import {
  ageConvert,
  cityConvert,
  petColorConvert,
  petKindConvert,
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
  private batch: number = 100
  private petRepository: PetRepository
  /** Create a shelter */
  constructor() {
    this.petRepository = new PetRepository()
  }
  /**
   * 更新屬於政府收容所且狀態未知的寵物資訊
   *
   */
  public async updateUnknownStatus(): Promise<void> {
    const [error, result]: [any, Pet[]] = await safeAwait(
      this.petRepository.findByFilters({status: Status.UNKNOWN, ref: Ref.GOV}),
    )
    let unknown_count = result.length
    yellowLog(`There are ${unknown_count} data, which status is unknown`)

    if (error) throw new AppError(error)
    for (const ele of result) {
      const [error, response]: [any, AxiosResponse<ShelterData[]>] =
        await safeAwait(axios.get(`${this.url}&animal_id=${ele.sub_id}`))
      if (error) throw new AppError(error)
      const data: ShelterData[] = response.data
      if (data.length) {
        const [error, _]: [any, UpdateResult] = await safeAwait(
          this.petRepository.update(
            {
              sub_id: ele.sub_id,
              accept_num: ele.accept_num,
            },
            {
              city_id: cityConvert(data[0].animal_area_pkid),
              kind: petKindConvert(data[0].animal_kind),
              sex: sexConvert(data[0].animal_sex),
              color: petColorConvert(data[0].animal_colour),
              age: ageConvert(data[0].animal_age),
              ligation: ternaryConvert(data[0].animal_sterilization),
              rabies: ternaryConvert(data[0].animal_bacterin),
              title: data[0].animal_place,
              status: petStatusConvert(data[0].animal_status),
              remark: data[0].animal_remark,
              phone: data[0].shelter_tel,
              image: [data[0].album_file],
              created_at: data[0].animal_createtime ?
                new Date(data[0].animal_createtime) :
                new Date(),
            },
          ),
        )
        if (error) throw new AppError(error)
        unknown_count -= 1
        yellowLog(
          `=== Update [${ele.sub_id}, ${ele.accept_num}] 
          which status is unknown ===`,
        )
      }
    }
    yellowLog(`There are still ${unknown_count} unknown status`)
  }

  /**
   * 取得狀態為待認養的動物資料
   *
   * @return {Promise<ShelterData[]>}
   */
  public async getData(): Promise<ShelterData[]> {
    const allData: ShelterData[] = []
    let loopFlag: boolean = true
    for (let page = 0; loopFlag; page++) {
      const [error, response]: [any, AxiosResponse<ShelterData[]>] =
        await safeAwait(
          axios.get(
            `${this.url}&$top=${this.batch}&$skip=${
              this.batch * page
            }&animal_status=OPEN`,
          ),
        )
      if (error) throw new AppError(error)

      const data: ShelterData[] = response.data
      if (data.length === 0) loopFlag = false
      data.forEach((ele) => {
        // Because shelters need the values of
        // animal_id and animal_subid to be linked
        if (ele.animal_id && ele.animal_subid) {
          allData.push(ele)
        }
      })
    }
    greenLog(`=== Get ${allData.length} data ===`)
    return allData
  }

  /**
   * 更新動物的資料
   *
   * 搜尋屬於政府收容所的寵物資料，若未在狀態為待認領的 API 裡，則狀態改為未知，
   * 反之，更新資料，並回傳需要新增的資料
   *
   * @param  {ShelterData[]} data From API
   * @return {ShelterData[]} data Data which should be saved
   */
  public async updatePetInfo(data: ShelterData[]): Promise<ShelterData[]> {
    // Get all animal ids from API
    const ids: number[] = data.map((val) => val.animal_id)
    // Record IDs which been updated
    const updated_ids: number[] = []
    // Get the pet data from shelter that are open from DB
    const [error, result]: [any, Pet[]] = await safeAwait(
      this.petRepository.findByFilters({status: Status.OPEN, ref: Ref.GOV}),
    )
    if (error) throw new AppError(error)

    for (const ele of result) {
      const in_data_index = ids.indexOf(Number(ele.sub_id))

      if (in_data_index < 0) {
        const [error, _]: [any, UpdateResult] = await safeAwait(
          this.petRepository.update(
            {
              id: ele.id,
            },
            {
              status: Status.UNKNOWN,
            },
          ),
        )
        if (error) throw new AppError(error)
      } else {
        const [error, _]: [any, UpdateResult] = await safeAwait(
          this.petRepository.update(
            {
              sub_id: ele.sub_id,
              accept_num: ele.accept_num,
            },
            {
              city_id: cityConvert(data[in_data_index].animal_area_pkid),
              kind: petKindConvert(data[in_data_index].animal_kind),
              sex: sexConvert(data[in_data_index].animal_sex),
              color: petColorConvert(data[in_data_index].animal_colour),
              age: ageConvert(data[in_data_index].animal_age),
              ligation: ternaryConvert(
                data[in_data_index].animal_sterilization,
              ),
              rabies: ternaryConvert(data[in_data_index].animal_bacterin),
              title: data[in_data_index].animal_place,
              status: petStatusConvert(data[in_data_index].animal_status),
              remark: data[in_data_index].animal_remark,
              phone: data[in_data_index].shelter_tel,
              image: [data[in_data_index].album_file],
              created_at: data[in_data_index].animal_createtime ?
                new Date(data[in_data_index].animal_createtime) :
                new Date(),
            },
          ),
        )
        if (error) throw new AppError(error)
        updated_ids.push(ele.sub_id)
      }
    }
    greenLog(`=== Update ${updated_ids.length} data`)
    // Filter out the ID which already been updated
    data = data.filter((val) => !updated_ids.includes(val.animal_id))
    greenLog(`=== ${data.length} data should be stored ===`)
    return data
  }

  /**
   * 儲存寵物的資訊
   *
   * @param  {ShelterData[]} data Which should be stored
   */
  public async saveData(data: ShelterData[]): Promise<void> {
    const petData: Pet[] = []

    data.forEach((ele) =>
      petData.push({
        ref: <Ref>'gov',
        sub_id: ele.animal_id,
        accept_num: ele.animal_subid,
        city_id: cityConvert(ele.animal_area_pkid),
        kind: petKindConvert(ele.animal_kind),
        sex: sexConvert(ele.animal_sex),
        color: petColorConvert(ele.animal_colour),
        age: ageConvert(ele.animal_age),
        ligation: ternaryConvert(ele.animal_sterilization),
        rabies: ternaryConvert(ele.animal_bacterin),
        title: ele.animal_place,
        status: petStatusConvert(ele.animal_status),
        remark: ele.animal_remark,
        phone: ele.shelter_tel,
        image: [ele.album_file],
        created_at: ele.animal_createtime ?
          new Date(ele.animal_createtime) :
          new Date(),
      }),
    )
    const [error, result]: [any, Pet[]] = await safeAwait(
      this.petRepository.saveMany(petData),
    )
    if (error) throw new AppError(error)
    if (result) greenLog(`=== Saved ${result.length} data ===`)
  }
}

/** Get shelter data*/
export async function getShelterData(): Promise<void> {
  const shelter = new Shelter()
  await shelter.updateUnknownStatus()
  const data: ShelterData[] = await shelter.getData()
  const data_should_stored: ShelterData[] = await shelter.updatePetInfo(data)
  await shelter.saveData(data_should_stored)
  return
}
