import dotenv from 'dotenv'

import {initializerApp} from './initializer'

dotenv.config()

const APP_PORT: Number = parseInt(<string>process.env.APP_PORT, 10);

(async () => {
  const {app} = await initializerApp()
  app.listen(process.env.APP_PORT, (): void => {
    console.log(`App listening at http://localhost:${APP_PORT}`)
  })
})()

