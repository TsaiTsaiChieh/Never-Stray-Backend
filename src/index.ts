import dotenv from 'dotenv'
import express, {Application} from 'express'

import * as connectionRouter from './routes/connection'

dotenv.config()
const app: Application = express()
const APP_PORT: Number = parseInt(<string>process.env.APP_PORT, 10)

app.use('/connection', connectionRouter.default)

app.listen(APP_PORT, (): void => {
  console.log(`App listening at http://localhost:${APP_PORT}`)
})
