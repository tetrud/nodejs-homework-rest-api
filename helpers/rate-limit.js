const rateLimit = require('express-rate-limit')
const { apiLimit, accountLimit } = require('../configs/rate-limit.json')
const { HttpCode } = require('./constants')

const createApiLimit = rateLimit({
  windowMs: apiLimit.windowMs,
  max: apiLimit.max,
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'You ran out of requests in 15 minutes',
    })
  },
})

const createAccountLimiter = rateLimit({
  windowMs: accountLimit.windowMs,
  max: accountLimit.max,
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message:
        'Too many accounts created from this IP, please try again after an hour',
    })
  },
})

module.exports = {
  createApiLimit,
  createAccountLimiter,
}
