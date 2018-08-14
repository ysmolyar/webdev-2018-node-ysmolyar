const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    fillBlanksAnswers: String,
    multipleChoiceAnswer: Number,
    trueFalseAnswer: Boolean,
    essayAnswer: String,
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionModel'
    }
}, {collection: 'answer'});