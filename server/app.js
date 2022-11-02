const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// router
const register = require('./routes/Register');
const login = require('./routes/Login');
const updateProfile = require('./routes/update-profile');
const getUsers = require('./routes/get-users');
const sendMessage = require("./routes/message")

const cors = require('cors')
const app = express();
const mongoose = require('mongoose');

app.use(cors());
mongoose.connect("mongodb://localhost:27017/ChatApp",{ useNewUrlParser: true })

const socket = require("./routes/socket-chat")
const socketServer = new socket()

socketServer.socketEvents()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/Register", register);
app.use('/Login', login);
app.use('/updateProfile', updateProfile);
app.use('/users', getUsers);
app.use('/message', sendMessage);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app
