// Steps to set up a simple MEAN app
// Configure the application
// Connect to the database
// Create routes for RESTful API
// Define routes for Angular application
// Set the app to listen on a port

// SET UP APP VARIABLES
var express = require ('express');
var app = express();  
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// CONFIGURE APP
mongoose.connect('mongodb://localhost:27017/todo')

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}))
// parse application/json
app.use(bodyParser.json());
app.use(methodOverride());

// START APP WITH NODE SERVER
app.listen(8080);
console.log("Listening on port 8080");

