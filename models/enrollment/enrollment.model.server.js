var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

function unEnrollStudent(enrollmentId) {
    return enrollmentModel.remove({_id: enrollmentId});
}

function findEnrollmentByPair(pair) {
    var response = enrollmentModel.findOne(pair);
    return response;
}

function findEnrollmentById(enrollmentId) {
    return enrollmentModel.findById(enrollmentId);
}

module.exports = {
    findSectionsForStudent: findSectionsForStudent,
    unEnrollStudent: unEnrollStudent,
    enrollStudentInSection: enrollStudentInSection,
    findEnrollmentById: findEnrollmentById,
    findEnrollmentByPair: findEnrollmentByPair
};