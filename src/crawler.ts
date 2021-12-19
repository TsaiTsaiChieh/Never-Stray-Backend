import dotenv from 'dotenv'
import {scheduleJob} from 'node-schedule'
import {greenLog, yellowLog} from './utils/chalk-logger'

import {initializerApp} from './initializer'
import {getShelterData} from './jobs/shelter-data'

dotenv.config()

const JOB_PORT: number = parseInt(process.env.JOB_PORT!)
;(async () => {
  const {app} = await initializerApp()
  app.listen(JOB_PORT, (): void => {
    greenLog(`Crawler listening at http://localhost:${JOB_PORT}`)
    scheduleJob('0 */1 * * * *', function() {
      yellowLog(`Get shelter data start at ${new Date()}`)
      getShelterData()
    })
  })
})()
