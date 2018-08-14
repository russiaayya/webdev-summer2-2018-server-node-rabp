const mongoose = require('mongoose')
const quizSchema = require('./quiz.schema.server');
const quizModel = mongoose.model('QuizModel', quizSchema);

createQuiz = quiz =>
    quizModel.create(quiz)

findAllQuizes = () =>
    quizModel.find()

findQuizById = quizId =>
    quizModel
        .findById(quizId)
        .populate('questions')
        .exec()

updateQuiz = (quizId, newQuiz) =>
    quizModel.update({_id: quizId}, {
        $set: newQuiz
    })

deleteQuiz = quizId =>
    quizModel.remove({_id: quizId})

addQuestion = (quizId, questionId) =>
    quizModel.update({_id: quizId}, {
        $push: {questions: questionId}
    })

module.exports = {
    createQuiz, findAllQuizes, findQuizById,
    updateQuiz, deleteQuiz, addQuestion
}