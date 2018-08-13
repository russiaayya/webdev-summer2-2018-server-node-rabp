module.exports = app => {

    const quizModel = require('../models/quizzes/quiz.model.server');

    createQuiz = (req, res) => {
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz))
    }

    findAllQuizzes = (req, res) => {
        quizModel.findAllQuizes()
            .then(quizzes => res.send(quizzes))
    }

    findQuizById = (req, res) => {
        quizModel.findQuizById(req.params.quid)
            .then(quiz => res.send(quiz))
    }

    updateQuiz = (req, res) => {
        quizModel.updateQuiz(req.params.quid, req.body)
            .then(status => res.send(status))
    }

    deleteQuiz = (req, res) => {
        quizModel.deleteQuiz(req.params.qid)
            .then(status => res.send(status))
    }

    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
}