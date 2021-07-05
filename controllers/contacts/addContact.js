const fs = require('fs').promises
const path = require('path')
const { v4 } = require('uuid')
const contacts = require('../../model/contacts.json')
const contactsPath = path.join(__dirname, '../../model/contacts.json')

const addContact = (req, res) => {
  const randomId = v4()
  const id = Number(randomId.replace(/[^+\d]/g, ''))
  const newContact = { id, ...req.body }

  const newContacts = contacts ? [...contacts, newContact] : newContact
  fs.writeFile(contactsPath, JSON.stringify(newContacts))

  res.status(201).json({
    status: 'success',
    code: 201,
    date: {
      result: newContact,
    },
  })
}

module.exports = addContact
