const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({

    Title: {

      type: String,
      required: [true, 'Title is required'],
      unique: true

    },

    Author: {

      type: String,
      required: [true, 'Author is required']

    },

    Genre: {

        type: String,
        required: [true, 'Genre is required']
  
    },

    data: Buffer,
    contentType: String,

    Description: {

        type: String,
        required: [true, 'Description is required'],
        unique: true
  
    },

    userName: {

      type: String

    },

    Price: {

      type: Number

    }

}

)

const Book = mongoose.model('Book', BookSchema)
module.exports = Book