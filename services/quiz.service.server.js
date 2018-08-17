module.exports = app => {

    const quizModel = require('../models/quizzes/quiz.model.server');
    const submissionModel = require('../models/submission/submission.model.server');

    createQuiz = (req, res) => {
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz))
    }

    findAllQuizzes = (req, res) => {
        quizModel.findAllQuizes()
            .then(quizzes => res.send(quizzes))
    }

    findQuizById = (req, res) => {
        quizModel.findQuizById(req.params.qid)
            .then(quiz => res.send(quiz))
    }

    updateQuiz = (req, res) => {
        quizModel.updateQuiz(req.params.qid, req.body)
            .then(status => res.send(status))
    }

    deleteQuiz = (req, res) => {
        quizModel.deleteQuiz(req.params.qid)
            .then(status => res.send(status))
    }

    addQuestion = (req, res) => {
        quizModel
            .addQuestion(req.params.qid, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    }

    submitQuiz = (req, res) => {
        let quiz = req.body;
        let answers = submitAnswers(quiz.questions);
        let user = req.session.currentUser;
        console.log('user' + user);
        let submission = {
            student: user._id,
            username: user.username,
            quiz: req.params.qid,
            submittedTime: new Date(),
            answers: answers
        }
        submissionModel.createSubmission(submission)
            .then(status => res.send(status),
                error => res.send(error))
    }

    submitAnswers = questions => {
        let answers = [];
        questions.map(question => {
            switch (question.questionType) {
                case 'FILL_BLANKS':
                    answers.push({fillBlanksAnswers: question.fillBlanksAnswers});
                    break;
                case 'TRUE_FALSE':
                    answers.push({trueFalseAnswer: question.trueFalseAnswer});
                    break;
                case 'CHOICE':
                    answers.push({multipleChoiceAnswer: question.multipleChoiceAnswer});
                    break;
                case 'ESSAY':
                    answers.push({essayAnswer: question.essayAnswer});
                    break;
                default: return answers;
            }
        })
        return answers;
    }

    findAllSubmissionsForQuiz = (req, res) => {
        submissionModel.findAllSubmissionsForQuiz(req.params.qid)
            .then(submissions => res.send(submissions))
    }

    findSubmissionById = (req, res) => {
        submissionModel.findSubmissionById(req.params.submissionId)
            .then(submission => res.send(submission))
    }

    findSubmissionsForStudentForQuiz = (req, res) => {
        submissionModel.findSubmissionsForStudentForQuiz(req.session.currentUser._id, req.params.qid)
            .then(submissions => res.send(submissions))
    }

    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
    app.put('/api/quiz/:qid/question/:questionId', addQuestion);
    app.post('/api/quiz/:qid/submission', submitQuiz);
    app.get('/api/quiz/:qid/submissions', findAllSubmissionsForQuiz);
    app.get('/api/quiz/:qid/submission', findSubmissionsForStudentForQuiz);
    app.get('/api/quiz/:qid/submission/:submissionId', findSubmissionById);
}