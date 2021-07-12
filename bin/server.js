const app = require('../app')
const db = require('../db')

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => {
  console.log(`Server not running ----- ${error.message}`)
})
