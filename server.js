var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-summer2-2018');


app.use(function(req, res, next) {
    const allowedOrigins = ["http://localhost:4200", "https://webdev-2018-ysmolyar-angularjs.herokuapp.com/"];
    const origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Origin', origin);
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
const PORT = process.env.PORT || 3000;

app.listen(PORT);