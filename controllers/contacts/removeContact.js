const fs = require('fs').promises
const path = require('path')
const contacts = require('../../model/contacts.json')
const contactsPath = path.join(__dirname, '../../model/contacts.json')

const removeContact = (req, res) => {
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

  const newContacts = contacts.filter(({ id }) => id !== Number(contactId))
  fs.writeFile(contactsPath, JSON.stringify(newContacts))

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Сontact deleted',
  })
}

module.exports = removeContact
