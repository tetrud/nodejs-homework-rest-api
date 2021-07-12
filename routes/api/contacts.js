const express = require('express')
const router = express.Router()

const contacts = require('../../controllers/contacts')
const { validate } = require('../../validate/schemas')

router.get('/', contacts.listContacts)
router.get('/:contactId', contacts.getContactById)
router.post('/', validate.addContact, contacts.addContact)
router.delete('/:contactId', contacts.removeContact)
router.put('/:contactId', validate.updateContact, contacts.updateContact)
router.patch(
  '/:contactId/favorite',
  validate.updateStatusContact,
  contacts.updateStatusContact
)

module.exports = router
