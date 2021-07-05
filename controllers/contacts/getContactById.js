const contacts = require('../../model/contacts.json')

const getContactById = (req, res) => {
  const { contactId } = req.params
  const selectContact = contacts.find(({ id }) => id === Number(contactId))

  if (!selectContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
    return
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContact,
    },
  })
}

module.exports = getContactById
