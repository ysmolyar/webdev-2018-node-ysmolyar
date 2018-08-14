const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    answers: [{
        answer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AnswerModel'
        }
    }]
}, {collection: 'submission'})