module.exports = function (app) {

    const questionModel = require('../models/question/question.model.server');

    app.post('/api/question', createQuestion);
    app.get('/api/question', findAllQuestions);
    app.get('/api/question/:questionId', findQuestionById);

  function findAllQuestions(req, res) {
      questionModel.findAllQuestions()
          .then(questions => res.send(questions));
  }

  function createQuestion(req, res) {
      questionModel.createQuestion(req.body)
          .then(question => res.send(body));
  }

  function findQuestionById(req, res) {
      questionModel.findQuestionById(req.params.questionId)
          .then(question => res.send(question));
  }
};