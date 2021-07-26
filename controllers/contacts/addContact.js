const { contact: service } = require('../../services')

const { HttpCode } = require('../../helpers')

const addContact = async (req, res, next) => {
  try {
    const result = await service.add(req.user.id, req.body)

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
