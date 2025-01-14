const passport = require('passport')
require('../configs/passport')

const { HttpCode } = require('../helpers')

const authenticate = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user || !user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      })
    }

    req.user = user
    next()
  })(req, res, next)
}

module.exports = authenticate
