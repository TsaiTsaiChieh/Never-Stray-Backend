import express, {Application} from 'express'
import {useExpressServer} from 'routing-controllers'

import {connection} from './config/database'

export const initializerApp = async () => {
  const app: Application = express()
  const db = await connection()

  useExpressServer(app, {
    controllers: [`${__dirname}/controllers/*.ts`],
  })
  const application = {
    app,
    db,
  }
  return application
}
