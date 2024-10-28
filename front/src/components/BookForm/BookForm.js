import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBook, fetchBook } from '../../redux/slices/booksSlice'
import createBookWithID from '../../utils/createBookWithID'
import booksData from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const dispatch = useDispatch()

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]
    // const randomBookWithId = createBookWithID({ ...randomBook, isRandom: true })
    const randomBookWithId = createBookWithID(randomBook, true, 'random')
    dispatch(addBook(randomBookWithId))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()

    if (trimmedTitle && trimmedAuthor) {
      dispatch(addBook(createBookWithID({ title, author })))
      setTitle('')
      setAuthor('')
    } else {
      alert('Please fill in both the title and author fields.')
    }
  }

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook())
  }

  return (
    <div className="app-block book-form">
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button type="button" onClick={handleAddRandomBookViaAPI}>
          Add Random via API
        </button>
      </form>
    </div>
  )
}

export default BookForm
