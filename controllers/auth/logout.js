const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const logout = async (req, res, next) => {
  const { id } = req.user

  try {
    await service.updateById(id, { token: null })
    return res.status(HttpCode.NO_CONTENT).json({
      status: 'success',
      code: HttpCode.NO_CONTENT,
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

module.exports = logout
