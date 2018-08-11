module.exports = function(app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/register', register);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.get('/api/login/loggedin', isLoggedIn);
    app.put('/api/profile', updateUser);

    var userModel = require('../models/user/user.model.server');

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(users => {
                res.send(users);
            });
    }

    function findUserById(req, res) {
        const id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.send(user);
            })
    }

    function isLoggedIn(req, res) {
        const user = req.session['currentUser'];
        if (user === undefined) {
            res.sendStatus(404);
        } else {
            res.sendStatus(202);
        }
    }

    function login(req, res) {
        const credentials = req.body;
        userModel
            .findUserByCredentials(credentials.username, credentials.password)
            .then(function (user) {
                if (user) {
                    req.session['currentUser'] = user;
                    res.send(user);
                }
                else {
                    res.sendStatus(204);
                }
            });
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function currentUser(req, res)  {
        const currentUser = req.session['currentUser'];
        if(currentUser) {
            res.send(currentUser);
            // userModel.findUserByIdExpanded(currentUser._id)
            //     .then(user => res.send(user));
        } else {
            res.sendStatus(403);
        }
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }


    function register(req, res) {
        var user = req.body;
        var username = req.body.username;
        userModel.findUserByUsername(username)
            .then((response) => {
                if(response) {
                    //bad response
                    response.sendStatus(400);
                } else {
                    userModel.register(user)
                        .then(function (user) {
                            req.session['currentUser'] = user;
                            res.send(user);
                        })
                }
            })
    }

    function updateUser(req, res) {
        var user = req.body;

        userModel.updateUser(user)
            .then(function (response) {
                req.session['currentUser'] = response;
                res.send(response);
            })
    }

}