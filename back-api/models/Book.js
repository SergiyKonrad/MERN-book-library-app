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

module.exports = mongoose.model('Book', bookSchema)
