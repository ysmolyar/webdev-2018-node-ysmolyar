var express = require('express')
var app = express()
var session = require('express-session')

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

function login(req, res) {
    res.send('login()');
}

app.post('/login', login);

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