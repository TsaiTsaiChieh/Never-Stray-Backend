import {createConnection} from 'typeorm'

export const connection = async () => {
  return createConnection({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: parseInt(<string>process.env.TYPEORM_PORT, 10),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ['**/src/entity/*{.ts,.js}'],
  })
}
