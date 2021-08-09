const multer = require('multer')
require('dotenv').config()
const path = require('path')

const TMP_DIR = path.join(process.cwd(), process.env.TMP_DIR)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TMP_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    cb(null, false)
  },
})

module.exports = upload
