var c = console;
myAppModule.controller("formController", function($scope, $http, $interval, $q) {
    $scope.sList = ['qwerqwer', 'werere', 'eterter'];

    $scope.showUserInfo = function(){
        c.log($scope.user)
    }


})

myAppModule.directive('list', function(){
    var directive = {};
    directive.restrict = "EAC"

    directive.link = function($scope, element, attributes){
        element.css("color", "blue")
        $scope.content = JSON.parse(attributes.content);
    }
    directive.template = "<ul ng-repeat='item in content'> <li>{{item}}</li> </ul>";

    return directive;
});