const { Contact } = require('../../model')

const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { ...req.body },
      { new: true }
    )

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing fields',
    })
  }
}

module.exports = updateContact
