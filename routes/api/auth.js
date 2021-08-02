const express = require('express')
const router = express.Router()

const { auth: ctrl, users } = require('../../controllers')
const { userValidate } = require('../../validate/schemas')
const { authenticate } = require('../../middlewares')
const { rateLimit, upload } = require('../../helpers')

router.get('/current', authenticate, users.getCurrent)
router.patch(
  '/',
  authenticate,
  userValidate.subscription,
  users.updateSubscription
)
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  users.updateAvatar
)

router.post(
  '/signup',
  rateLimit.createAccountLimiter,
  express.json(),
  userValidate.create,
  ctrl.signup
)
router.post('/login', express.json(), userValidate.create, ctrl.login)
router.get('/logout', authenticate, ctrl.logout)

module.exports = router
