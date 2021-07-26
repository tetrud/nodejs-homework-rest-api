const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
require('dotenv').config()

const { user: service } = require('../services')
const { SECRET_KEY } = process.env

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
}

passport.use(
  'jwt',
  new Strategy(settings, async (payload, done) => {
    try {
      const user = await service.getById(payload.id)

      if (!user) {
        throw new Error('Not found')
      }
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
)
