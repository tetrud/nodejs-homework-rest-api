const Joi = require('joi')
const { HttpCode } = require('../../helpers/constants')

const contactCreateSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru', 'ua'] },
    })
    .optional(),
  phone: Joi.string()
    .min(5)
    .max(16)
    .pattern(/^[0-9_%()+-]{5,16}$/)
    .required(),
  favorite: Joi.boolean().optional(),
})

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(20).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru', 'ua'] },
    })
    .optional(),
  phone: Joi.string()
    .min(5)
    .max(16)
    .pattern(/^[0-9_%()+-]{5,16}$/)
    .optional(),
  favorite: Joi.boolean().optional(),
})

const contactUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
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

const add = (req, res, next) => {
  return validate(contactCreateSchema, req.body, next)
}
const update = (req, res, next) => {
  return validate(contactUpdateSchema, req.body, next)
}

const updateStatus = (req, res, next) => {
  const { error } = contactUpdateStatusSchema.validate(req.body)
  if (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Missing Field Favorite ',
    })
  }
  next()
}

module.exports = {
  add,
  update,
  updateStatus,
}
