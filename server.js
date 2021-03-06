var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const URL = "https://webdev-summer2-2018-angular-ra.herokuapp.com";
const URL = "http://localhost:4200";
mongoose.connect('mongodb://localhost/webdev-summer2-2018');
// mongoose.connect('mongodb://admin123:admin123@ds215822.mlab.com:15822/webdev-node-server');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        URL);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

var session = require('express-session')
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'any string',
    cookie: {
        maxAge: 1800 * 1000
    },
    rolling: true
}));

app.get('/', function(req, res) {
    res.send('Hello World!')
});

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);
// app.get('/api/session/get',
//     getSessionAll);
// app.get('/api/session/reset',
//     resetSession);

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

require('./services/section.service.server')(app);
require('./services/quiz.service.server')(app);
require('./services/question.service.server')(app);

app.listen(process.env.PORT || 4000);