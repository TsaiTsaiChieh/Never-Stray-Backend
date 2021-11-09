import dotenv from 'dotenv'
import {scheduleJob} from 'node-schedule'

import {initializerApp} from './initializer'
import {getShelterData} from './jobs/shelter-data'

dotenv.config()

const JOB_PORT: number = parseInt(process.env.JOB_PORT!);
(async () => {
  const {app} = await initializerApp()
  app.listen(JOB_PORT, (): void => {
    console.log(`Crawler listening at http://localhost:${JOB_PORT}`)
    scheduleJob('* * 1 * * *', function() {
      getShelterData()
    })
  })
})()

