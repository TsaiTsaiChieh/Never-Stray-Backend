import express, {Request, Response, Router} from 'express'
import {createConnection} from 'typeorm'

const router: Router = express.Router()

router.get('/mysql', async (req: Request, res: Response) => {
  try {
    await createConnection({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(<string>process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
    })
    res.send('TypeORM connection successfully')
  } catch (error) {
    console.log(`TypeORM connection error: ${error}`)
    res.json(error)
  }
})

export default router
