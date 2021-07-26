const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers')

const logout = async (req, res, next) => {
  const { id } = req.user

  try {
    await service.updateToken(id, { token: null })
    return res.status(HttpCode.NO_CONTENT).json({
      status: 'success',
      code: HttpCode.NO_CONTENT,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = logout
