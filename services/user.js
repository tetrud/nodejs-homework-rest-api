const { nanoid } = require('nanoid')
const sendEmail = require('./sendEmail')
const { User } = require('../models')

const getById = async (id) => {
  return await User.findById(id)
}

const getOne = async (field) => {
  return await User.findOne(field)
}

const add = async ({ email, password, subscription }) => {
  const verifyToken = nanoid()

  try {
    await sendEmail(verifyToken, email)
  } catch (error) {
    throw new Error('Service Unavailable')
  }

  const newUser = await new User({ email, subscription, verifyToken })
  newUser.setPassword(password)
  return newUser.save()
}

const updateById = async (id, updateInfo) => {
  return await User.findByIdAndUpdate(id, updateInfo)
}

const updateSubscription = async (id, updateUser) => {
  return await User.findByIdAndUpdate(id, updateUser, {
    new: true,
  })
}
const updateAvatar = async (id, pathFile) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { avatarURL: pathFile },
    {
      new: true,
    }
  )
}

module.exports = {
  getOne,
  add,
  getById,
  updateById,
  updateSubscription,
  updateAvatar,
}
