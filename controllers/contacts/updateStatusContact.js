const { Contact } = require('../../model')

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    })

    return res.json({
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
      message: 'Not Found',
    })
  }
}
module.exports = updateStatusContact
