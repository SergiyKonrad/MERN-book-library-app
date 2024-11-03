require('dotenv').config() // Secures variables
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const axios = require('axios')
const router = express.Router()
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
// Set up router with '/api' prefix
app.use('/api', router)

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

// --- Route to get a random book from MongoDB

// the data is no longer stored in booksData. Instead,it’s retrieved dynamically from the MongoDB database with Mongoose.
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

// --- Route to get delayed random book from MongoDB
// CURRENTLY CONNECTED TO THE FRONTEND as Add Random via API
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

// you can add additional routes for fetching books, fetching random books, etc...

// NB.Helper function to fetch and save book data from Open Library

async function addBookToMongoDB(workId) {
  try {
    const response = await axios.get(
      `https://openlibrary.org/works/${workId}.json`,
    )
    const bookData = response.data

    const title = bookData.title || 'Unknown Title'
    const author = bookData.authors?.[0]?.name || 'Unknown'
    const year = bookData.publish_date?.match(/\d{4}/)
      ? parseInt(bookData.publish_date.match(/\d{4}/)[0])
      : new Date(bookData.created?.value).getFullYear() || 'Unknown'

    // console.log('Fetched Book Data:', bookData)

    const newBook = new Book({
      title,
      author,
      year,
      description: bookData.description?.value || 'No description available',
      subjects: bookData.subjects || [],
      isFavorite: false,
      isRandom: false,
    })
    await newBook.save()

    console.log('Book added to MongoDB:', newBook)
  } catch (error) {
    console.error('Error fetching or saving book:', error)
  }
}

// OPTIONAL route to add a book from Open Library (if integration is used)
router.post('/add-book/:workId', async (req, res) => {
  const { workId } = req.params
  try {
    await addBookToMongoDB(workId)
    res
      .status(200)
      .json({ message: `Book with ID ${workId} added to MongoDB.` })
  } catch (error) {
    console.error('Error adding book:', error)
    res.status(500).json({ message: 'Error adding book to MongoDB' })
  }
})

// -----

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
