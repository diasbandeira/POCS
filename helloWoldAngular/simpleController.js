var app = angular.module('app' , []);

app.controller('simpleController', function ($scope) {
    $scope.user = {name: "Daniel"}
});

app.controller('countController', function ($scope) {
    $scope.counter = 0;
    $scope.addOne = function(){
        $scope.counter++;
    }
});

app.controller('loopController', function($scope){
    $scope.fruits = ['banana', 'laranja', 'maça'];
});
        
