const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const signup = async (req, res, next) => {
  console.log(service)
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
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup
