const { user: service, uploadAvatar } = require('../../services')
const { HttpCode } = require('../../helpers')

const updateAvatar = async (req, res, next) => {
  const { id } = req.user
  const pathFile = req.file.path

  try {
    await uploadAvatar(req.file)
    const { avatarURL } = await service.updateAvatar(id, pathFile)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      date: {
        avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateAvatar
