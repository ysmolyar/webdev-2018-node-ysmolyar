var express = require('express')
var app = express()
var session = require('express-session')

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);

function setSession(req, res) {
    var n = req.params['name'];
    var v = req.params['value'];
    req.session[n] = v;
    res.send(req.session)
}

function getSession(req, res) {
    var n = req.params['name'];
    var v = req.session[n];
    res.send(v)
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-summer2-2018');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
}, {collection: 'user'});

var userModel = mongoose.model('UserModel', userSchema);

app.get('/api/user', findAllUsers);

function findAllUsers(req, res) {
    userModel.find()
        .then(users => {
            res.send(users);
        })
}


app.get('/hello', function (req, res) {
    res.send({message: "hello world"})
})

app.listen(3000)