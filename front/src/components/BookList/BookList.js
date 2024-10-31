import { useSelector, useDispatch } from 'react-redux'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs'
import {
  deleteBook,
  toggleFavorite,
  selectBooks,
} from '../../redux/slices/booksSlice'
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice'
import './BookList.css'

const BookList = () => {
  const books = useSelector(selectBooks)
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
    // console.log(dispatch(deleteBook(id)))
  }

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id))
  }

  const trimmedTitleFilter = titleFilter.trim()
  const trimmedAuthorFilter = authorFilter.trim()

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(trimmedTitleFilter.toLowerCase())
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(trimmedAuthorFilter.toLowerCase())

    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
    return matchesTitle && matchesAuthor && matchesFavorite
  })

  const highlightMatch = (text, filter) => {
    if (!filter) return text

    const regex = new RegExp(`(${filter})`, 'gi')
    // console.log(text.split(regex))
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        )
      }
      return substring
    })
  }

  return (
    <div className="app-block book-list">
      <h2> Book List </h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {highlightMatch(book.title, titleFilter)}{' '}
                {book.isRandom ? `(${book.year})` : book.year} by{' '}
                <strong>{highlightMatch(book.author, authorFilter)}</strong>{' '}
                <span className="source-info">({book.source})</span>
                <p>{book.description}</p>
              </div>

              <div className="book-actions">
                <span
                  onClick={() => handleToggleFavorite(book.id)}
                  aria-label={
                    book.isFavorite
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>

                <button
                  onClick={() => handleDeleteBook(book.id)}
                  aria-label="Delete book">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
