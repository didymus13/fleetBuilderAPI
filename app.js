require('dotenv').config();
const cors = require('cors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var logger = require('morgan');
require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const shipsRouter = require('./routes/ships');
const upgradeRouter = require('./routes/upgrades');
const fleetRouter = require('./routes/fleets');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ships', shipsRouter);
app.use('/upgrades', upgradeRouter);
app.use('/fleets', fleetRouter);

module.exports = app;
