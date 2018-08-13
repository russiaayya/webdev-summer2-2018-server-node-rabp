const mongoose = require('mongoose')
const quizSchema = require('./quiz.schema.server');
const quizModel = mongoose.model('QuizModel', quizSchema);

createQuiz = quiz =>
    quizModel.create(quiz)

findAllQuizes = () =>
    quizModel.find()

findQuizById = quizId =>
    quizModel.findById(quizId)

updateQuiz = (quizId, newQuiz) =>
    quizModel.update({_id: quizId}, {
        $set: newQuiz
    })

deleteQuiz = quizId =>
    quizModel.remove({_id: quizId})

module.exports = {
    createQuiz, findAllQuizes, findQuizById,
    updateQuiz, deleteQuiz
}