const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

require('dotenv').config()

const { EMAIL, EMAIL_PASSWORD } = process.env

const createTemplate = (verifyToken, email) => {
  const userName = email.split('@')[0]

  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Phonebook',
      link: 'https://localhost:3000/',
    },
  })
  const emailOption = {
    body: {
      name: userName,
      intro: "Welcome to Phonebook! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Phonebook!, please click here:',
        button: {
          color: '#7819fc',
          text: 'Confirm your account',
          link: `https://localhost:3000/api/users/verify/${verifyToken}`,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }

  return mailGenerator.generate(emailOption)
}

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(config)

const sendEmail = async (verifyToken, email) => {
  const emailBody = await createTemplate(verifyToken, email)

  const emailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Verify your account',
    html: emailBody,
  }

  await transporter.sendMail(emailOptions)
}

module.exports = sendEmail
