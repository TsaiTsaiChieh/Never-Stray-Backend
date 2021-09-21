import dotenv from 'dotenv'
import _ from 'lodash'

import {Area, City, Region} from '../entity/Area'
import {initializerApp} from '../initializer'
import areas from '../JSON/areas.json'

dotenv.config();

(async (
  areas: {
    region: string | Region,
    city: string | City,
    name: string,
  }[],
) => {
  const {db} = await initializerApp()
  try {
    const data: {
      region: Region,
      city: City,
      name: string,
    }[] = []
    _.forEach(areas, async (val) => {
      //  type assertion
      data.push({
        region: <Region>val.region,
        city: <City>val.city,
        name: val.name,
      })
    })
    await db.createQueryBuilder()
      .insert()
      .into(Area)
      .values(data).execute()
  } catch (error) {
    console.log(error)
  } finally {
    await db.close()
  }
})(areas)
