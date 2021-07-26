const { contact: service } = require('../../services')

const { HttpCode } = require('../../helpers')

const listContacts = async (req, res, next) => {
  try {
    const result = await service.getAll(req.user.id, req.query)
    res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        ...result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
