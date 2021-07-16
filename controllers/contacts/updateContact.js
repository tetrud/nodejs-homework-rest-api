const { Contact } = require('../../model')
const { HttpCode } = require('../../helpers/constants')

const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { ...req.body },
      { new: true }
    )

    res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        result,
      },
    })
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Missing fields',
    })
  }
}

module.exports = updateContact
