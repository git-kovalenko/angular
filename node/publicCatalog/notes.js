var myAppModule = angular.module("myapp",[]);
myAppModule.controller("noteController", function($scope, $http, $interval) {
var c = console;    
    $scope.notes = [];
    $scope.order = 0;
    var update = function() {
        $http.get("/notes")
            .success(function(notes) {
                $scope.notes = notes;
            });
    };
    update();

    $scope.add = function() {
        var note = {
            text: $scope.text,
            date: new Date(),
            order: $scope.order ++
        };
        $http.post("/notes", note)
            .success(function() {
                $scope.text = "";
                update();
            });
    };

    $scope.remove = function(id){
        $http.delete("/notes", {params: {id:id}})
        .success(function () {
            update();
        });
    }

    var toTop = function(id){
        $http.get("/minimalOrder")
        .success(function(notes){
            return notes;
        });
    }

});
