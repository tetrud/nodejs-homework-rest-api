const { User } = require('../models')

const getById = (id) => {
  return User.findById(id)
}

const getOne = (filter) => {
  return User.findOne(filter)
}

const add = ({ email, password, subscription }) => {
  const newUser = new User({ email, subscription })
  newUser.setPassword(password)
  return newUser.save()
}

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo)
}
module.exports = {
  getOne,
  add,
  getById,
  updateById,
}
