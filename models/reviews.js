const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({

    userName: {

        type: String
    },

    Title: {

        type: String
    },

    Review: {

        type: String
    },

    likes: {

        type:  [{ type:String, default: []}]
    },
    
    dislikes: {

        type:  [{ type:String, default: []}]
 
    }
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review