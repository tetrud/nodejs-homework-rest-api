const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
