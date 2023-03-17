var app = angular.module('app', []);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {controller: 'listController', templateUrl: 'list.html'})
    .when('/edit/:name', {controller : 'editController', templateUrl: 'form.html'})
    .when('/new/' , {controller: 'newController', templateUrl:'form.html'})
    .otherwise({redirectTo: '/'});
}]);

app.run(['$rootScope', function($rootScope){
    $rootScope.fruits = ['banana','laranga','maça'];
    console.log('app.run');
}]);

app.controller('listController', function ($scope){
    console.log('listController');
});

app.controller('editController', function ($scope){
    $scope.title = "Editar Fruta";
    $scope.fruit = $routeParams.name;
    
    $scope.fruitIndex = $scope.fruits.indexOf($scope.fruit);

    $scope.save = function(){
        $scope.fruits[$scope.fruitIndex] = $scope.fruit;
        $location.path('/');
    }
});