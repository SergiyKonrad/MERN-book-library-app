const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const booksData = require('./data/books.json')

const MONGODB_URI =
  'mongodb+srv://SergiyKonrad:<db_password>@booklibrarycluster.uekm0.mongodb.net/?retryWrites=true&w=majority&appName=BookLibraryCluster'

mongoose
// .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose
  .connect(MONGODB_URI)

  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err))

const app = express()

app.use(cors())

function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * booksData.length)
  const randomBook = booksData[randomIndex]
  return randomBook
}

// app.get('/books', (req, res) => {
//   res.json(booksData)
// })

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' })
  }
})

// app.get('/random-book', (req, res) => {
//   res.json(getRandomBook())
// })

app.get('/random-book', async (req, res) => {
  try {
    const books = await Book.find()
    const randomBook = books[Math.floor(Math.random() * books.length)]
    res.json(randomBook)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random book' })
  }
})

// app.get('/random-book-delayed', (req, res) => {
//   setTimeout(() => {
//     res.json(getRandomBook())
//   }, 2000)
// })

app.get('/random-book-delayed', async (req, res) => {
  setTimeout(async () => {
    try {
      const books = await Book.find()
      const randomBook = books[Math.floor(Math.random() * books.length)]
      res.json(randomBook)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching random book' })
    }
  }, 2000)
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
