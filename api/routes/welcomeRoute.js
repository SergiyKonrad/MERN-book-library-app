const express = require('express')
const router = express.Router()

// Define the root route
router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Welcome to the MERN Book Library API</title>
    </head>
    <body>
        <h1>Welcome to the MERN Book Library API!</h1>
        <p>
          Use <strong><code>/api</code></strong> like 
          <strong>http://localhost:5000/api/random-book</strong> to access the endpoints.
        </p>
    </body>
    </html>
  `)
})

module.exports = router
