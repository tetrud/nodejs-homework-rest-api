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

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body)

  if (error) {
    return next({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: error.message,
    })
  }
  next()
}

const create = (req, res, next) => {
  return validate(userSchema, req.body, next)
}
const subscription = (req, res, next) => {
  return validate(updateSubscriptionSchema, req.body, next)
}

module.exports = {
  create,
  subscription,
}
