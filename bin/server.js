const app = require('../app')
const db = require('../db')
const createFolderIsNotExist = require('../helpers/createFolder')
require('dotenv').config()

const { PUBLIC_DIR, AVATAR_DIR, TMP_DIR } = process.env
const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(TMP_DIR)
    await createFolderIsNotExist(PUBLIC_DIR)
    await createFolderIsNotExist(`${PUBLIC_DIR}/${AVATAR_DIR}`)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => {
  console.log(`Server not running: ${error.message}`)
})
