import chalk from 'chalk'
import dotenv from 'dotenv'
import _ from 'lodash'
import {Connection} from 'typeorm'

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
  let db: any | Connection
  try {
    db = (await initializerApp()).db
    const data: {
      region: Region,
      city: City,
      name: string,
    }[] = []
    _.forEach(areas, (val) => {
      //  type assertion
      // data.push({
      //   region: <Region>val.region,
      //   city: <City>val.city,
      //   name: val.name,
      // })
      data.push(val)
    })
    await db.createQueryBuilder()
      .insert()
      .into(Area)
      .values(data).execute()
  } catch (error) {
    console.log(chalk.red(error))
  } finally {
    if (db instanceof Connection) {
      await db.close()
    }
  }
})(areas)
