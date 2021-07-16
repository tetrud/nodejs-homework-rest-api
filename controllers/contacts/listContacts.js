const { Contact } = require('../../model')
const { HttpCode } = require('../../helpers/constants')

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({})
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
