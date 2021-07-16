const { Contact } = require('../../model')
const { HttpCode } = require('../../helpers/constants')

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove(contactId)

    res.json({
      status: 'success',
      code: HttpCode.OK,
      result,
    })
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    })
  }
}

module.exports = removeContact
