/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import express from 'express'
import exitHook from 'async-exit-hook'
import { GET_DB, CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'
import cors from 'cors'
import { corsOptions } from './config/cors'
import cookieParser from 'cookie-parser'

const START_SERVER = () => {
  const app = express()

  //fix Cache form disk cua expressjs
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  //cau hinh cookie parser
  app.use(cookieParser())

  //xu ly cors
  app.use(cors(corsOptions))

  //bat req.body
  app.use(express.json())

  //use APIs in v1
  app.use('/v1', APIs_V1)

  app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at  http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`)
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
