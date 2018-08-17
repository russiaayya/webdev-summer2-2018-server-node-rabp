const mongoose = require('mongoose')
const submissionSchema = require('./submission.schema.server')
const submissionModel = mongoose.model('SubmissionModel', submissionSchema)

createSubmission = submission =>
    submissionModel.create(submission)

findAllSubmissions = () =>
    submissionModel.find()

findAllSubmissionsForStudent = studentId =>
    submissionModel.find({student: studentId})

findAllSubmissionsForQuiz = quizId =>
    submissionModel.find({quiz: quizId})

findSubmissionById = submissionId =>
    submissionModel.findById(submissionId)
        .populate({
            path: 'quiz',
            populate: {path: 'questions'}
        }).exec()

findSubmissionsForStudentForQuiz = (studentId, quizId) =>
    submissionModel.find({student: studentId, quiz: quizId})

module.exports = {
    createSubmission, findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    findSubmissionById,
    findSubmissionsForStudentForQuiz
}