import dotenv from 'dotenv'
import _ from 'lodash'
import safeAwait from 'safe-await'
import {Connection} from 'typeorm'

import {Area} from '../entity/area.entity'
import {initializerApp} from '../initializer'
import areas from '../JSON/areas.json'
import {AreaRepository} from '../repositories/area.repository'
import {AppError} from '../utils/app-error'
import {greenLog, yellowLog} from '../utils/chalk-logger'
import {cityConvert, regionConvert} from '../utils/value-convert'

type AreaData = {
  region: string
  city: number
  name: string
}

/** Class representing an area initial data*/
class AreaInitData {
  private _: Connection
  private areas: AreaData[] = areas
  private areaRepository: AreaRepository

  /** Constructor */
  constructor() {
    dotenv.config()
  }

  /** Builder */
  async build() {
    this._ = (await initializerApp()).db
    this.areaRepository = new AreaRepository()
  }

  /** Destructor */
  async destroy() {
    this._.close()
  }

  /**
   * 搜尋 area table 初始資料，回傳未在 area table 出現的資料 index
   *
   * @return {Promise<number[]>} Promise<number[]>
   */
  async findData(): Promise<number[]> {
    // Get all areas ids from json data
    const areaIdx: number[] = this.areas.map((_, i) => i)

    for (let i = 0; i < this.areas.length; i++) {
      const [error, result]: [any, Area | undefined] =
      await safeAwait(this.areaRepository.findOne(
        {city: cityConvert(areas[i].city)},
      ))
      if (error) throw new AppError(error)
      // Filter out the index which already existed in the DB
      if (result) {
        yellowLog(`=== ${result.name} already in areas table ===`)
        areaIdx.splice(areaIdx.indexOf(i), 1)
      }
    }
    return areaIdx
  }

  /**
   * 儲存區域的初始資料
   *
   * @param  {number[]} areaIdx Indexes which should be saved
   * @return {Promise<void>} Promise<void>
   */
  async saveData(areaIdx: number[]): Promise<void> {
    const areaData: Area[] = []
    this.areas = this.areas.filter((_, i) => areaIdx.includes(i))

    for (const ele of this.areas) {
      areaData.push({
          region: regionConvert(ele.region),
          city: cityConvert(ele.city),
          name: ele.name,
      })
    }

    const [error, result]:[any, Area[]] =
     await safeAwait(this.areaRepository.saveMany(areaData))
     if (error) throw new AppError(error)
     if (result) greenLog(`=== Saved ${JSON.stringify(result)} ===`)
  }
}

/** Initial area data*/
async function initArea(): Promise<void> {
  const areaInitData = new AreaInitData()
  await areaInitData.build()
  const areaIdx: number[] = await areaInitData.findData()
  await areaInitData.saveData(areaIdx)
  areaInitData.destroy()
  return
}

initArea()
