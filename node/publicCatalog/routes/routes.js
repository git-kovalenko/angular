var myAppModule = angular.module("myapp", ['dndLists', 'ngRoute']);

myAppModule.config(function($routeProvider) {
	$routeProvider.
	when('/notes', {
		templateUrl: 'routes/notes/notes_task8.html',
		controller: 'noteController'
	})
	.when('/validation', {
		templateUrl: 'routes/validation/validation.html',
		controller: 'formController'
	})
	.when('/register', {
		templateUrl: 'routes/userForm/userForm.html',
		controller: 'UserFormController'
	})
	.otherwise({
		redirectTo: '/'
	});
});
