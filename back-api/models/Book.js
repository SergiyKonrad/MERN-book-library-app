const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: Number,
  description: String,
  isFavorite: { type: Boolean, default: false },
  source: String,
  isRandom: { type: Boolean, default: false },
})

// module.exports = mongoose.model('Book', bookSchema)

/* NB.
If you define a model with the name Book (as in mongoose.model('Book', bookSchema)), Mongoose automatically assumes the collection name should be plural and lowercase, so it will look for or create a collection named books.
To override this default behavior, you can specify a third parameter in the mongoose.model function to enforce a specific collection name.
*/

module.exports = mongoose.model('Book', bookSchema, 'Book')
