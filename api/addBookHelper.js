const axios = require('axios')
const Book = require('./models/Book')
const express = require('express')
const router = express.Router()

// Helper function to fetch and save book data from Open Library
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

    const newBook = new Book({
      title,
      author,
      year,
      description: bookData.description?.value || 'No description available',
      subjects: bookData.subjects || [],
      // isFavorite: false,
      // isRandom: false,
    })
    await newBook.save()

    console.log('Book added to MongoDB:', newBook)
  } catch (error) {
    console.error('Error fetching or saving book:', error)
  }
}

// Route to add a book from Open Library to MongoDB
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

module.exports = router
