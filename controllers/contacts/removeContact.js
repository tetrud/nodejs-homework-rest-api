const { Contact } = require('../../model')

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove({ _id: contactId })

    res.status(200).json({
      status: 'success',
      code: 200,
      result,
    })
  } catch (error) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  }
}

module.exports = removeContact
