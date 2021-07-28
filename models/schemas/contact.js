const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

contactSchema.plugin(mongoosePaginate)

const Contact = model('contact', contactSchema)

module.exports = Contact
