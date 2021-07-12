const { Contact } = require('../../model')

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body)

    res.status(201).json({
      status: 'success',
      code: 201,
      date: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
