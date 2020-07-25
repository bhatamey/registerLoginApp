var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var cors = require('cors');
const users = require('./routes/users');
const config = require('./config/database');

mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log('connected to db');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening to port 3000");
});
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(cors());

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

//static file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.send("Hiii!!!");
    
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
    
});

