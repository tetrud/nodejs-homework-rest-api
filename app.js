const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes/api')
const { jsonLimit } = require('./configs/rate-limit.json')
const { HttpCode, rateLimit } = require('./helpers')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: jsonLimit }))

app.use('/api/', rateLimit.createApiLimit)
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
