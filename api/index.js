require('dotenv').config() // Secures variables
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Book = require('./models/Book')
// const booksData = require('./data/books.json') // Optional if using static data

const MONGODB_URI = process.env.MONGODB_URI || 'your_default_mongodb_uri_here'

console.log('Connecting to MongoDB with URI...')

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err))

const app = express()
app.use(cors())
app.use(express.json())

// Set up main router
const router = express.Router()
app.use('/api', router) // Routes with /api prefix

// -----  Routes to get books from MongoDB -----

// NB. The data is no longer stored in booksData. Instead,it’s retrieved dynamically from the MongoDB database with Mongoose.
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find()
    console.log('Books fetched count:', books.length)
    // res.set('Cache-Control', 'no-store') // Disable caching if needed
    res.json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    res.status(500).json({ message: 'Error fetching books' })
  }
})

// --- Random book route ---
router.get('/random-book', async (req, res) => {
  try {
    const books = await Book.find()
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found' })
    }
    const randomBook = books[Math.floor(Math.random() * books.length)]
    console.log('Books found:', randomBook)
    res.json(randomBook)
  } catch (error) {
    console.error('Error fetching random book:', error)
    res.status(500).json({ message: 'Error fetching random book' })
  }
})

// ---- Delayed random book route ----

//NB. IT CURRENTLY CONNECTED TO THE FRONTEND as Add Random via API
router.get('/random-book-delayed', async (req, res) => {
  setTimeout(async () => {
    try {
      const books = await Book.find()
      const randomBook = books[Math.floor(Math.random() * books.length)]

      console.log('Random Book fetched:', randomBook)
      res.json(randomBook)
    } catch (error) {
      console.error('Error fetching delayed random book:', error)
      res.status(500).json({ message: 'Error fetching random book' })
    }
  }, 2000)
})

// Import the additional addBook route

const addBookHelperRouter = require('./addBookHelper')
app.use('/api', addBookHelperRouter) // Adds the `/add-book/:workId` route from addBookHelper.js and attachs it to /api

// Root route to handle the root URL

app.get('/', (req, res) => {
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

// Start the server

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
