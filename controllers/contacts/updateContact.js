const fs = require('fs').promises
const path = require('path')
const contacts = require('../../model/contacts.json')
const contactsPath = path.join(__dirname, '../../model/contacts.json')

const updateContact = (req, res) => {
  const { contactId } = req.params
  const indexContact = contacts.findIndex(({ id }) => id === Number(contactId))

  if (indexContact === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
    return
  }

  contacts[indexContact] = { id: Number(contactId), ...req.body }
  fs.writeFile(contactsPath, JSON.stringify(contacts))
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[indexContact],
    },
  })
}

module.exports = updateContact
