var app=angular.module('myApp',[]);
app.controller('CommonController',function($scope){
    $scope.commonFn=function(){
        alert("this is Common")
    }
})

app.controller('Controller1',function($scope){
    $scope.greeting={
        text:'Controller1'
    };
    $scope.test1=function(){
        alert('test1')
    }
})

app.controller('Controller2',function($scope){
    $scope.greeting={
        text:'Controller2'
    };
    $scope.test2=function(){
        alert('test2')
    }
})