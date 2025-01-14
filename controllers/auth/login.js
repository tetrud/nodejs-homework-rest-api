const jwt = require('jsonwebtoken')
require('dotenv').config()
const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers')

const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await service.getOne({ email })
    if (!user || !user.comparePassword(password) || !user.verify) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      })
    }
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    await service.updateById(user._id, { token })

    res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        result: token,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
