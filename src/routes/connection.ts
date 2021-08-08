import express, {Request, Response, Router} from 'express'
import {createConnection} from 'typeorm'

const router: Router = express.Router()

router.get('/mysql', async (req: Request, res: Response) => {
  try {
    await createConnection()
    res.send('TypeORM connection successfully')
  } catch (error) {
    console.log(`TypeORM connection error: ${error}`)
    res.json(error)
  }
})

export default router
