import { v4 as uuidv4 } from 'uuid'

const createBookWithID = (book, isRandom = false, source = 'manual') => {
  return {
    ...book,
    source,
    isFavorite: false,
    id: uuidv4(),
    isRandom,
  }
}

export default createBookWithID
