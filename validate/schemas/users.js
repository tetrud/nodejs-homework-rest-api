const Joi = require('joi')
const { HttpCode } = require('../../helpers/constants')

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru', 'ua'] },
    })
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().optional(),
})

const userValidate = (req, res, next) => {
  const { error } = userSchema.validate(req.body)

  if (error) {
    return next({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: error.message,
    })
  }
  next()
}

module.exports = userValidate
