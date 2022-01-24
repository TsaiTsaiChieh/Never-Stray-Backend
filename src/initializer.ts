import express, {Application} from 'express'
import {useExpressServer} from 'routing-controllers'
import safeAwait from 'safe-await'
import {Connection} from 'typeorm'

import {connection} from './config/database'
import {AppError} from './utils/app-error'

export const initializerApp = async (): Promise<{
  app: Application
  db: Connection
}> => {
  const app: Application = express()

  const [error, db]: [any, Connection] = await safeAwait(connection())
  if (error) throw new AppError(error)

  useExpressServer(app, {
    controllers: [`${__dirname}/controllers/*.ts`],
  })
  const application = {
    app,
    db,
  }
  return application
}
