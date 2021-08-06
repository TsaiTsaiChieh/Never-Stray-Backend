import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

const app = express()

const {APP_PORT} = process.env

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 印出 env 的檔案 for bug
app.get('/env', (req, res) => {
  res.json(process.env)
})

app.listen(APP_PORT, () => {
  console.log(`App listening at http://localhost:${APP_PORT}`)
})
