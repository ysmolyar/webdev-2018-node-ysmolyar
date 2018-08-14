module.exports = function (app) {
    app.post('/api/quiz/:qid/submission', submitQuiz);
    app.get('/api/quiz/:qid/submission', findAllSubmissionsByStudent);
    app.get('/api/quiz/:qid/submission/:submissionId', findSubmissionById);

    const submissionModel = require('../models/submission/submission.model.server');

    function submitQuiz(req, res) {
        res.json(req.body)
    }


    function findAllSubmissionsByStudent(req, res) {
        submissionModel.findAllSubmissions()
            .then(submissions => res.send(submissions));
    }

    function findSubmissionById(req, res) {
        submissionModel.findSubmissionById(req.params.submissionId)
            .then(submissions => res.send(submission));
    }
}