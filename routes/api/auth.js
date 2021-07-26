const express = require('express')
const router = express.Router()
// const passport = require('passport')
// require('../../configs/passport')

const { auth: ctrl, users } = require('../../controllers')
const { userValidate } = require('../../validate/schemas')
const { authenticate } = require('../../middlewares')

router.get('/current', authenticate, users.getCurrent)
router.post('/signup', express.json(), userValidate, ctrl.signup)
router.post('/login', express.json(), userValidate, ctrl.login)
router.get('/logout', authenticate, ctrl.logout)

module.exports = router
