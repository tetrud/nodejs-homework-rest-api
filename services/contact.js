const { Contact } = require('../models')

const getAll = () => {
  return Contact.find({})
}

const findById = (id) => {
  return Contact.findById(id)
}

const add = (newContact) => {
  return Contact.create(newContact)
}

const update = (id, updateContact) => {
  return Contact.findByIdAndUpdate(id, updateContact, { new: true })
}

const remove = (id) => {
  return Contact.findByIdAndRemove(id)
}

module.exports = {
  add,
  findById,
  getAll,
  remove,
  update,
}
