module.exports = function (app) {

    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);


    function findQuizById(req, res) {
        var quiz = quizzes.filter(function (q) {
            return q._id === req.params.qid });
        res.json(quiz[0]);
    }

    function findAllQuizzes(req, res) {
        res.json(quizzes);
    }
}