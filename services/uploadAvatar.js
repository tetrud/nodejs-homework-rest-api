const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')
require('dotenv').config()

const { PUBLIC_DIR, AVATAR_DIR, TMP_DIR } = process.env
const UPLOAD_DIR = path.join(process.cwd(), PUBLIC_DIR, AVATAR_DIR)

const uploadAvatar = async (file) => {
  try {
    const img = await jimp.read(file.path)
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path)

    await fs.rename(
      file.path,
      path.join(UPLOAD_DIR, `${Date.now()}-${file.originalname}`)
    )
  } catch (error) {
    await fs.unlink(TMP_DIR)
  }
}

module.exports = uploadAvatar
