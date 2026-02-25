
import express from 'express'
import { mapOrder } from '~/utils/sorts.js'

const app = express()

const hostname = 'localhost'
const port = 8017

app.get('/', (req, res) => {
})

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello Trung Quan Dev, I am running at ${ hostname }:${ port }/`)
})
