const { Contact } = require('../../model')
const { HttpCode } = require('../../helpers/constants')

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body)

    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      date: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
