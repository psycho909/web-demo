var app=angular.module('myApp',[]);

app.controller('EventController',function($scope){
    $scope.count=0;
    $scope.$on('MyEvent',function(){
        $scope.count++;
    })
})