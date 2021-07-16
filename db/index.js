const mongoose = require('mongoose')
require('dotenv').config()

const { DB_HOST } = process.env

const db = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (error) => {
  console.log(error.message)
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    process.exit(1)
  })
})

module.exports = db
