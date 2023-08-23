const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({

    alternatives: Array,
    answer:String
})

const questionModel = mongoose.model('questions', questionSchema)

module.exports = questionModel