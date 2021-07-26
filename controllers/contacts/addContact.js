const { contact: service } = require('../../services')

const { HttpCode } = require('../../helpers/constants')

const addContact = async (req, res, next) => {
  try {
    const result = await service.add(req.body)

    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
