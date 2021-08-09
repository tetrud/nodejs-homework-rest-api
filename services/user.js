const { User } = require('../models')

const getById = async (id) => {
  return await User.findById(id)
}

const getOne = async (filter) => {
  return await User.findOne(filter)
}

const add = async ({ email, password, subscription }) => {
  const newUser = await new User({ email, subscription })
  newUser.setPassword(password)
  return newUser.save()
}

const updateToken = async (id, updateInfo) => {
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
  updateToken,
  updateSubscription,
  updateAvatar,
}
