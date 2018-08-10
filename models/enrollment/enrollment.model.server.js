var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function disenrollStudentInSection(enrollment) {
    return enrollmentModel.find(enrollment)
        .remove()
        .exec();
}

function disenrollAllInSection(sectionId) {
    return enrollmentModel.find({section: sectionId})
        .remove()
        .exec();
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    disenrollStudentInSection: disenrollStudentInSection,
    disenrollAllInSection: disenrollAllInSection
};