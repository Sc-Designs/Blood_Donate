var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSessions = require("express-session")
const flash = require('connect-flash')


require("dotenv").config()

var adminRouter = require("./routes/adminRouter");
var bloodRouter = require("./routes/bloodRouter");
var donarRouter = require("./routes/donarRouter");
var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/userRouter');

const db = require("./config/mongoose-connection")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSessions({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/reciver', bloodRouter);
app.use('/donar', donarRouter);

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

module.exports = app;