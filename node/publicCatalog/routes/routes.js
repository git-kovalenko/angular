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
	.otherwise({
		redirectTo: '/'
	});
});
