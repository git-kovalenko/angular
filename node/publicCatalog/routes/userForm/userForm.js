var c = console;
myAppModule.controller("UserFormController", function($scope, $http, $interval, $q) {
    $scope.user = {};

    


})


myAppModule.directive("matchTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherValue: "=matchTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.matchTo = function(modelValue) {
                return modelValue == scope.otherValue;
            };
            scope.$watch("otherValue", function() {
                ngModel.$validate();
            });
        }
    };
});












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