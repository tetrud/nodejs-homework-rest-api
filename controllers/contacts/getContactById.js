const { Contact } = require('../../model')

const getContactById = async (req, res) => {
  const { contactId } = req.params

  try {
    const result = await Contact.findById({ _id: contactId })
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Contact Not Found',
    })
  }
}

module.exports = getContactById
