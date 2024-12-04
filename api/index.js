require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const addBookHelperRouter = require('./addBookHelper')
const welcomeRoute = require('./routes/welcomeRoute')
const Book = require('./models/Book')
// const booksData = require('./data/books.json') // Optional if using static data

const MONGODB_URI = process.env.MONGODB_URI || 'your_default_mongodb_uri_here'

// Connect to MongoDB
console.log('Connecting to MongoDB with URI...')
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Initialize Express
const app = express()

// Apply Helmet for security
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for development
    crossOriginEmbedderPolicy: false, // Disable COEP for compatibility
  }),
)

// Apply CORS for cross-origin requests
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://https://mern-book-library-app.vercel.app',
    ], // Frontend on Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)

// Middleware for parsing JSON
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
      if (books.length === 0) {
        return res.status(404).json({ message: 'No books found for delay' })
      }
      const randomBook = books[Math.floor(Math.random() * books.length)]
      console.log('Random Book fetched:', randomBook)
      res.json(randomBook)
    } catch (error) {
      console.error('Error fetching delayed random book:', error)
      res.status(500).json({ message: 'Error fetching random book' })
    }
  }, 2000)
})

// Attach additional routes from addBookHelper.js or other routes
app.use('/api', addBookHelperRouter)

// Root route for API welcome message
app.use('/', welcomeRoute)

// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
