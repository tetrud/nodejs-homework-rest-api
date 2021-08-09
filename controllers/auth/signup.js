const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers')

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body
  try {
    const result = await service.getOne({ email })

    if (result) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      })
    }

    const newUser = await service.add({ email, password, subscription })

    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarUrl: newUser.avatarUrl,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup
