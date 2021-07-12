const Joi = require('joi')

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
    .max(12)
    .pattern(/^[0-9_%+-]{3,16}$/)
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
    .max(12)
    .pattern(/^[0-9_%+-]{3,16}$/)
    .optional(),
  favorite: Joi.boolean().optional(),
})

const contactUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const addContact = (req, res, next) => {
  const { error } = contactCreateSchema.validate(req.body)
  if (error) {
    return next({
      status: 'error',
      code: 400,
      message: error.message,
    })
  }
}

const updateContact = (req, res, next) => {
  const { error } = contactUpdateSchema.validate(req.body)
  if (error) {
    return next({
      status: 'error',
      code: 400,
      message: error.message,
    })
  }
}

const updateStatusContact = (req, res, next) => {
  const { error } = contactUpdateStatusSchema.validate(req.body)
  if (error) {
    return next({
      status: 'error',
      code: 400,
      message: 'Missing Field Favorite ',
    })
  }
  next()
}
module.exports = {
  addContact,
  updateContact,
  updateStatusContact,
}
