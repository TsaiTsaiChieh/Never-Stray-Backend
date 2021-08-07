import dotenv from 'dotenv'
import express, {Application, Request, Response} from 'express'

dotenv.config()
const app: Application = express()

const APP_PORT: Number = parseInt(<string>process.env.APP_PORT, 10)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// 印出 env 的檔案 for bug
app.get('/env', (req: Request, res: Response) => {
  res.json(process.env)
})

app.listen(APP_PORT, (): void => {
  console.log(`App listening at http://localhost:${APP_PORT}`)
})
