const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers')

const verify = async (req, res, next) => {
  const { verifyToken } = req.params
  try {
    const user = await service.getOne(verifyToken)
    if (user) {
      await service.updateById(user.id, { verify: true, verifyToken: null })
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification successful',
        },
      })
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      data: {
        message: 'User not found',
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verify
