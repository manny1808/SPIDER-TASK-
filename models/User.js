const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    userName: {

      type: String,
      required: [true, 'Username is required'],
      unique: true

    },

    password: {

      type: String,
      required: [true, 'Password is required']

    },

    purchasedBooks: [{ type:String, default: []}],

    savedBooks: [{ type:String, default: []}],

    bio: {

      type : String

    },

    data: Buffer,
    contentType: String,

  })

const User = mongoose.model('User', UserSchema)
module.exports = User