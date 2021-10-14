/* eslint-disable require-jsdoc */
import axios from 'axios'
import {Connection} from 'typeorm'

import {Area} from '../entity/Area'

// dotenv.config()

// class Shelter {
//     constructor() {

//     }
//     public async getData() {
//         const db = (await initializerApp()).db
//         const findArea = await db.getRepository(Area).findOne()
//         console.log(findArea)

//         console.log(process.env.NATIONAL_ANIMAL_SHELTER)
//     }
// }
async function getShelterData(db: Connection) {
  // const findArea = await db.getRepository(Area).findOne()
  // console.log(findArea)
  const url: string = process.env.NATIONAL_ANIMAL_SHELTER!
  // const data = await axios.get(`${url}`)
  console.log(url)
}

export default getShelterData
