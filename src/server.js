/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import express from 'express'
import exitHook from 'async-exit-hook'
import { GET_DB, CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'
import cors from 'cors'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())

  //xu ly cors
  app.use(cors(corsOptions))

  //use APIs in v1
  app.use('/v1', APIs_V1)

  app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
    console.log(`Hello Trung Quan Dev, I am running at ${env.LOCAL_DEV_APP_PORT}:${env.LOCAL_DEV_APP_HOST}/`)
  })
  exitHook(() => {
    console.log('Exitting')
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => console.log('connect mongoDb success'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })
