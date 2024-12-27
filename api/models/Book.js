const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        year: Number,
        // year: { type: Number, min: 1000, max: new Date().getFullYear() }, // Optional: Ensure valid year range
        description: { type: String, default: 'No description available' },
        isFavorite: { type: Boolean, default: false },
        source: String,
        isRandom: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        // Automatically adds `createdAt` and `updatedAt` fields
    },
)

// Adds an index on `title` and `author` to optimize queries
bookSchema.index({ title: 1, author: 1 })

module.exports = mongoose.model('Book', bookSchema, 'Book')

// module.exports = mongoose.model('Book', bookSchema)

/* NB.
If you define a model with the name Book (as in mongoose.model('Book', bookSchema)), Mongoose automatically assumes the collection name should be plural and lowercase, so it will look for or create a collection named books.
To override this default behavior, you can specify a third parameter in the mongoose.model function to enforce a specific collection name.
*/
