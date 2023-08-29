const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    
    title: String,
    alternatives: Array,
    answer: String
})

const questionModel = mongoose.model('questions', questionSchema)

module.exports = questionModel