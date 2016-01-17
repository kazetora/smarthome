var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
//var remote = require('./routes/remote');
// var rekamtransaksi = require('./routes/rekamTransaksi');
// var bayarBerapa = require('./routes/bayarBerapa');
// var dashboard = require('./routes/dashboard');
// var partial = require('./routes/partial');

var io = require('socket.io-client');

var socketOptions = {
    "secure": true,
    "transports": [ "websocket" ],
    "try multiple transports": false,
    "reconnect": false,
    "force new connection": true,
    "connect timeout": 10000
};
var socket = io.connect("http://localhost:3000", socketOptions);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    //console.log(req.connection.remoteAddress);
    req.socket = socket;
    next();
});

app.use('/', routes);
app.use('/users', users);
//app.use('/remote', remote);
// app.use('/rekamTransaksi', rekamtransaksi);
// app.use('/bayarBerapa', bayarBerapa);
// app.use('/dashboard', dashboard);
// app.use('/partial', partial);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
