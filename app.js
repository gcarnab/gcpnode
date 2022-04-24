// Copyright 2022 GCARNAB

//**** IMPORT MODULES ****/

//import 'bootstrap';

'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assets',express.static(__dirname + '/assets'));

//for /index page
app.get('/', function(req,res){
  //res.status(200).send('<h1> GC Web App CRUD with nodejs on GCP! </h1>').end();
	res.sendFile('index.html',{root:path.join(__dirname,'./views')});
});

app.get('/buttons', function(request,response){
	response.sendFile('buttons.html',{root:path.join(__dirname,'./views')});
});

app.get('/cards', function(request,response){
	response.sendFile('cards.html',{root:path.join(__dirname,'./views')});
});

 // catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
}); */

// Start the server
const PORT = parseInt(process.env.PORT) || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
});
// [END gae_node_request_example]

module.exports = app
