import {Connection, createConnection} from 'typeorm'

import {Area} from '../entity/area.entity'
import {Pet} from '../entity/pet.entity'

export const connection = async (): Promise<Connection> => {
  return createConnection({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: parseInt(<string>process.env.TYPEORM_PORT, 10),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [Area, Pet],
    logging: false,
  })
}
