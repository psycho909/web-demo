var app=angular.module('UserInfoModule',['ngAnimate']);
app.controller('UserInfoCtrl',function($scope){
    $scope.userInfo={
        email:"sadas@gmail.com",
        password:'123456',
        autoLogin:true
    }
    $scope.getFormData=function(){
        console.log($scope.userInfo)
    }
    $scope.setFormData=function(){
        $scope.userInfo={
            email:'saas1231312dsad@gmail.com',
            password:'sadasdsa',
            autoLogin:false
        }
    }
    $scope.resultForm=function(){
        $scope.userInfo={
            email:'',
            password:'',
            autoLogin:false
        }
        $scope.isRed=true;
        $scope.isGreen=false;
    }
    $scope.setGreen=function(){
        $scope.isGreen=true;
        $scope.isRed=false;
    }
    $scope.menuState={show:false}
    $scope.toggleMenu=function(){
        $scope.menuState.show=!$scope.menuState.show;
    }
})