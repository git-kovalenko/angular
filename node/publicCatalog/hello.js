var myAppModule = angular.module("myapp",[]);
myAppModule.controller("HelloController", function($scope, $http, $interval) {
    $scope.helloTo = {};
    $scope.helloTo.title = "World, AngularJS";
    $scope.update = function() {
        if ($scope.name) {
            $http.get("http://localhost:3000/greeting",
                {params:
                    {name: $scope.name}
                })
                .success(function(res) {
                    $scope.greeting = res;
                });
        }
    }
    // $interval($scope.update, 500);

    $scope.$watch("name", function() {
        $scope.update();
    });


    $scope.buttons = [['1','2','3'],['4','5','6'],['7','8','9'],['0','.','c']];
    
    $scope.names = ['Antony', 'Black', 'Key', 'Kayuga', 'Jsgerog', 'Rpslafp'];

    $scope.itemFilter = function(value){
        // console.log(arguments);
        var pattern = new RegExp('a');
        return pattern.test(value);
    }

});

myAppModule.filter('withLetter', function(){
    return function(value, letter){
        var pattern = new RegExp(letter);
        // if(pattern.test(value)){
        //     return value;
        // }
        return pattern.test(value);
    }

});

