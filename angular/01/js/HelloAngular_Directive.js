var app=angular.module('myApp',[]);
app.directive('hello',function(){
    return {
        restrict:'E',
        template:'<div>Hello Template</div>',
        replace:true
    }
})