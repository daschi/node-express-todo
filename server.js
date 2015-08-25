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

// DEFINE DB MODEL
var Todo = mongoose.model('Todo', {
	text: String
})

// routes
// HTTP VERB | URL 				  | DESC
// GET 			 | api/todos    | Get all todos
// POST 		 | api/todos    | Create new todo
// DELETE    | api/todos/:id| Delete a todo

// find, create, remove are mongoose functions

// get all todos
app.get('/api/todos', function(req, res) {
	// Uses mongoose to get all todos in the db
	Todo.find(function(err, todos) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(todos); // return all todos in JSON
		}
	});
});

// create a new todo and redirect to all todos
app.post('/api/todos', function(req, res) {
	// Request comes from Angular AJAX request
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo) {
		if (err) {
			res.send(err);
		}
		else {
			// get and return all todos after you create new
			Todo.find(function(err, todos) {
				if (err){
					res.send(err);
				}
				else {
					res.json(todos);
				}
			});
		}
	})
})

// delete a todo
app.delete('/api/todos/:id', function(req, res) {
	Todo.remove({
		_id: req.params.id
	}, function(err, todo) {
		if (err) {
			res.send(err);
		}
		else {
			// get and return all todos after you delete one
			Todo.find(function(err, todos) {
				if (err){
					res.send(err);
				}
				else {
					res.json(todos);
				}
			});
		}
	})
})

// Front-end application route that's separate from API
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
	//load the single view file since angular will handle changes on the front end
})


// START APP WITH NODE SERVER
app.listen(8080);
console.log("Listening on port 8080");

