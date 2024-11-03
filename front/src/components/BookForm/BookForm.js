import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa'
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from '../../redux/slices/booksSlice'
import { setError } from '../../redux/slices/errorSlice'
import createBookWithID from '../../utils/createBookWithID'
import booksData from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI)
  const dispatch = useDispatch()

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]
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
      dispatch(setError('Please fill in both the title and author fields.'))
    }
  }

  // Connects to the API route for fetching a delayed random book from MongoDB
  const handleAddRandomBookViaAPI = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/random-book-delayed`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch random book') // Triggers catch if API response has a problem
      }
      const data = await response.json()
      dispatch(fetchBook(data))
    } catch (error) {
      dispatch(setError(error.message)) // Displays error in the UI via
    }
  }

  // const handleAddRandomBookViaAPI = () => {
  //   dispatch(fetchBook(`${process.env.REACT_APP_API_URL}/random-book-delayed`))
  // }

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

        <button type="submit">Add New Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Recommended
        </button>

        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI}
          aria-busy={isLoadingViaAPI}
          aria-live="polite">
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            ' Add Random via API'
          )}
        </button>
      </form>
    </div>
  )
}

export default BookForm
