//Angular set up
// Create a module
// Create a controller
// Define functions to handle todos
// Apply to the view (index.html)

//Questions: What are angular modules?

// create module
var todo = angular.module('todo', [])

// create controller
var mainController = function($scope, $http) {
	$scope.formData = {};

// define functions to handle todos
	// get api/todos route and show all data on the page
	$http.get('/api/todos')
	.success(function(data) {
		$scope.todos = data;
		console.log(data);
	})
	.error(function(data) {
		console.log("ERROR: " + data);
	});

	//on submit of new todo form, send text to node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
		.success(function(data) {
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.todos = data;
        console.log(data);
      })
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// delete a todo after it's checked
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};  

}
