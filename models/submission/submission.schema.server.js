const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    username: String,
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    submittedTime: Date,
    answers: [{
        fillBlanksAnswers: Object,
        multipleChoiceAnswer: Number,
        trueFalseAnswer: Boolean,
        essayAnswer: String,
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionModel'
        }
    }]
}, {collection: 'submission'})