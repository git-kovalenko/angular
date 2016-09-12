
myAppModule.controller("noteController", function($scope, $http, $interval, $q) {
var c = console;    
    $scope.notes = [];
    $scope.order = 0;

    /*var update = function() {
    var params = {params:{section:$scope.activeSection}};
        $http.get("/notes", params)
            .success(function(notes) {
                $scope.notes = notes;
            });
    };*/
    var update = function(){
        var params = {params:{section:$scope.activeSection}};
        // $q.all([
        //     $http.get("/notes", params)
        // ])
        // .then(function(notes) {
        //     $scope.notes = notes[0].data;
        // });

        function asyncGetNotes() {
            return $q(function(resolve, reject) {
                setTimeout(function() {
                    resolve($http.get("/notes", params))
                }, 50);
            });
        }
        var promise = asyncGetNotes();
        promise.then(function(notes) {
            $scope.notes = notes.data;
        }, function(reason) {
          alert('Failed: ' + reason);
        });

    }
    update();

    $scope.add = function() {
        var note = {
            text: $scope.text,
            date: new Date(),
            order: $scope.order ++
        };
        note.section = $scope.activeSection;
        note.tag = $scope.noteTag;
        if (!$scope.text || $scope.text.length==0) return;
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

    var readSections = function() {
        $http.get("/sections")
            .success(function(sections) {
               $scope.sections = sections;
                update();
                if ($scope.activeSection == null && $scope.sections.length>0) {
                    $scope.activeSection = $scope.sections[0].title;
                }
            });
    }
    readSections();
    $scope.showSection = function(section) {
        $scope.activeSection = section.title;
        update();
    }


    $scope.writeSections = function() {
        if ($scope.sections && $scope.sections.length>0) {
            $http.post("/sections/replace", $scope.sections);
        }
    };

    $scope.addSection = function() {
        if ($scope.newSection.length==0) return;
        // check for duplicates
        for (var i=0;i<$scope.sections.length;i++) {
            if ($scope.sections[i].title==$scope.newSection) {
                return;
            }
        }
        var section = {title: $scope.newSection};
        $scope.sections.unshift(section);
        $scope.activeSection = $scope.newSection;
        $scope.newSection = "";
        $scope.writeSections();
        update();
    }



});
