const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'ru', 'ua'] },
  }),
  phone: Joi.string()
    .min(5)
    .max(12)
    .pattern(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/)
    .required(),
})

module.exports = contactSchema
