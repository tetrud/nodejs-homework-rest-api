const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers')
const { contactValidate } = require('../../validate/schemas')
const { authenticate } = require('../../middlewares')

router.get('/', authenticate, ctrl.listContacts)
router.get('/:contactId', authenticate, ctrl.getContactById)
router.post(
  '/',
  express.json(),
  authenticate,
  contactValidate.add,
  ctrl.addContact
)
router.delete('/:contactId', authenticate, ctrl.removeContact)
router.put(
  '/:contactId',

  express.json(),
  authenticate,
  contactValidate.update,
  ctrl.updateContact
)
router.patch(
  '/:contactId/favorite',
  express.json(),
  authenticate,
  contactValidate.updateStatus,
  ctrl.updateStatusContact
)

module.exports = router
