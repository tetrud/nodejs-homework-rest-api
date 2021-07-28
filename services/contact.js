const { Contact } = require('../models')

const getAll = async (userId, { page = 1, limit = 20, favorite }) => {
  const filter = favorite ? { favorite: `${favorite}` } : null

  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    {
      ...filter,
      owner: userId,
    },
    {
      page,
      limit,
      populate: {
        path: 'owner',
        select: ' email subscription',
      },
    }
  )

  return { contacts, total, page: Number(page), limit: Number(limit) }
}

const findById = async (userId, id) => {
  return await Contact.findById({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: ' email subscription',
  })
}

const add = async (userId, newContact) => {
  return await Contact.create({ ...newContact, owner: userId })
}

const update = async (userId, id, updateContact) => {
  return await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    updateContact,
    {
      new: true,
    }
  )
}

const remove = async (userId, id) => {
  return await Contact.findByIdAndRemove({ _id: id, owner: userId })
}

module.exports = {
  add,
  findById,
  getAll,
  remove,
  update,
}
