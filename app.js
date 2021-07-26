const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('./configs/passport')

const routes = require('./routes/api')
const { HttpCode } = require('./helpers/constants')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', routes.contacts)
app.use('/api/users', routes.auth)

app.use((_, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: 'Not Found',
  })
})

app.use((error, _, res, __) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: error.message,
  })
})

module.exports = app
