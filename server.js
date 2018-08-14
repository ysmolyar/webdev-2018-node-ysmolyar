var express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var app = express()

mongoose.connect('mongodb://user:password1@ds029197.mlab.com:29197/webdev-summer2-2018', function(err, db) {
    if(!err) {
        console.log("Connected to database.");
    } else {
        console.log("Error connecting to database.");
    }
});
app.use(function(req, res, next) {
    // const origin = ["http://localhost:4200", "https://webdev-2018-ysmolyar-angularjs.herokuapp.com"];
    res.header('Access-Control-Allow-Origin', 'https://webdev-2018-ysmolyar-angularjs.herokuapp.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);


function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

var userService = require('./services/user.service.server');
userService(app);

var enrollmentService = require('./services/enrollment.service.server');
enrollmentService(app);

var sectionService = require('./services/section.service.server');
sectionService(app);
app.listen(process.env.PORT || 3000);