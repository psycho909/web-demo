
angular.module('routingDemoApp', ['ngRoute'])
    .config(function ($routeProvider,$locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                template: '这是首页页面'
            })
            .when('/morning', {
                templateUrl: 'morning.html'
            })
            .when('/afternoon', {
                templateUrl: 'afternoon.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });