const fs = require('fs').promises
const path = require('path')
const { v4 } = require('uuid')

const contacts = require('../../model/contacts.json')
const contactSchema = require('../../validate/schemas')
const contactsPath = path.join(__dirname, '../../model/contacts.json')

const addContact = (req, res) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing required name field',
    })
    return
  }

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
