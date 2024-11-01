require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Book = require('./models/Book')
// const booksData = require('./data/books.json')

const MONGODB_URI = process.env.MONGODB_URI || 'your_default_mongodb_uri_here'

console.log('Connecting to MongoDB with URI...')

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err))

const app = express()
app.use(cors())
app.use(express.json())

// Route to get all books from books.json where the data is stored in booksData
/*
function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * booksData.length)
  const randomBook = booksData[randomIndex]
  return randomBook
} */
/*
app.get('/books', (req, res) => {
  res.json(booksData)
})    etc. */

// --- Route to get all books from MongoDB
app.get('/books', async (req, res) => {
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

// --- Route to get a random book from MongoDB
// the data is no longer stored in booksData. Instead,it’s retrieved dynamically from the MongoDB database with Mongoose.
app.get('/random-book', async (req, res) => {
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

// --- Optional delayed random book route from MongoDB
app.get('/random-book-delayed', async (req, res) => {
  setTimeout(async () => {
    try {
      const books = await Book.find()

      const randomBook = books[Math.floor(Math.random() * books.length)]
      console.log('Books found:', randomBook)
      res.json(randomBook)
    } catch (error) {
      console.error('Error fetching delayed random book:', error)
      res.status(500).json({ message: 'Error fetching random book' })
    }
  }, 2000)
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
