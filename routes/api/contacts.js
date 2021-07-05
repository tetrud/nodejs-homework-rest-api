const express = require('express')
const router = express.Router()

const contacts = require('../../controllers/contacts')

router.get('/', contacts.listContacts)
router.get('/:contactId', contacts.getContactById)
router.post('/', express.json(), contacts.addContact)
router.delete('/:contactId', contacts.removeContact)
router.put('/:contactId', express.json(), contacts.updateContact)

module.exports = router
