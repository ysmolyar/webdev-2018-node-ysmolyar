module.exports = function (app) {
    app.post('/api/student/:sectionId/section', enrollStudentInSection);
    app.delete('/api/student/:sectionId/section', unEnrollStudent);
    app.get('/api/student/section', findSectionsForStudent);

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');


    function findSectionsForStudent(req, res) {
        var currentUser = req.session.currentUser;
        if (currentUser != null) {
            var studentId = currentUser._id;
            enrollmentModel
                .findSectionsForStudent(studentId)
                .then(function (enrollments) {
                    res.json(enrollments);
                });
        }
    }

    function enrollStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };

        var success;
        var section;
        enrollmentModel.findEnrollmentByPair(enrollment)
            .then(function (response) {
                success = response === null;
            })
            .then(function () {
                return sectionModel.findSectionById(sectionId)
                    .then(function (response) {
                        section = response;
                    })
            })
            .then(function () {
                if (section.seats <= 0) {
                    res.sendStatus(403);
                } else if (success) {
                    sectionModel
                        .decrementSectionSeats(sectionId)
                        .then(function () {
                            return enrollmentModel
                                .enrollStudentInSection(enrollment)
                        })
                        .then(function (enrollment) {
                            res.json(enrollment);
                        })
                } else {
                    res.sendStatus(404)
                }
            })
    }

    function unEnrollStudent(req, res) {
        var enrollmentId = req.params.sectionId;
        var enrollment;
        enrollmentModel.findEnrollmentById(enrollmentId)
            .then(function (response) {
                enrollment = response;
            })
            .then(function () {
                sectionModel
                    .incrementSectionSeats(enrollment.section)
                    .then(function () {
                        return enrollmentModel
                            .unEnrollStudent(enrollmentId)
                    })
                    .then(function (enrollment) {
                        res.json(enrollment);
                    })

            })
    }
};