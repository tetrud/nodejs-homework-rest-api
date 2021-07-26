const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers')
const { contactValidate } = require('../../validate/schemas')

router.get('/', ctrl.listContacts)
router.get('/:contactId', ctrl.getContactById)
router.post('/', express.json(), contactValidate.add, ctrl.addContact)
router.delete('/:contactId', ctrl.removeContact)
router.put(
  '/:contactId',

  express.json(),
  contactValidate.update,
  ctrl.updateContact
)
router.patch(
  '/:contactId/favorite',
  express.json(),
  contactValidate.updateStatus,
  ctrl.updateStatusContact
)

module.exports = router
