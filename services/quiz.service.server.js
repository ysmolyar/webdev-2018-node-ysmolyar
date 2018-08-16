module.exports = function (app) {

    const quizModel = require('../models/quiz/quiz.model.server');

    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.post('/api/quiz', createQuiz);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
    app.put('/api/quiz/:qid/question/:questionId', addQuestion);
    app.post('/api/quiz/:qid/submission', submitQuiz);

    function findQuizById(req, res) {
        quizModel.findQuizById(req.params.qid)
            .then(quiz => res.send(quiz));
    }

    function findAllQuizzes(req, res) {
        quizModel.findAllQuizzes()
            .then(quizzes => res.send(quizzes));
    }


    function createQuiz(req, res) {
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz))
    }


    function updateQuiz(req, res) {
        quizModel.updateQuiz(req.params.qid, req.body)
            .then(status => res.send(status))
    }

    function deleteQuiz(req, res) {
        quizModel.deleteQuiz(req.params.qid)
            .then(status => res.send(status))
    }

    function addQuestion(req, res) {
        quizModel
            .addQuestion(req.params.qid, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    }

    function submitQuiz(req, res) {
        res.json(req.body)
    }

};