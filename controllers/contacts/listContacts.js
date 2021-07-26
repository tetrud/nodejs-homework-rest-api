const { contact: service } = require('../../services')

const { HttpCode } = require('../../helpers/constants')

const listContacts = async (req, res, next) => {
  try {
    const result = await service.getAll()
    res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
