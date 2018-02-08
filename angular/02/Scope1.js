var app=angular.module('myApp',[]);
app.controller('GreetCtrl',function($scope,$rootScope){
    $scope.name="Chen";
    $rootScope.department="Angular";
})

app.controller('ListCtrl',function($scope){
    $scope.names=["Jame",'Wade','Anthody'];
})