const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    title: String,
    points: Number,
    description: String,
    choices: [{
        text: String,
        value: String,
        correct: Boolean
    }],
    questionType: {
        type: String,
        enum: [
            'ESSAY',
            'FILL_BLANKS',
            'TRUE_FALSE',
            'MULTIPLE_CHOICE'
        ]
    },
    blanks: [String],
    fillBlanksAnswers: [String],
    trueFalseAnswer: Boolean,
    multipleChoiceAnswer: String,
    essayAnswer: String
}, {collection: 'question'});