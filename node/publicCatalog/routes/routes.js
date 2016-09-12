var myAppModule = angular.module("myapp", ['dndLists', 'ngRoute']);

myAppModule.config(function($routeProvider) {
	$routeProvider.
	when('/notes', {
		templateUrl: 'routes/notes/notes_task8.html',
		controller: 'noteController'
	}).
	otherwise({
		redirectTo: '/'
	});
});
