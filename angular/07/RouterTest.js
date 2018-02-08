var myApp = angular.module("myApp", ["ui.router"]);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise("/index");
    //如果没有路由引擎能匹配当前的导航状态，默认将路径路由至 PageTab.html, 那它就像switch case语句中的default选项.就是一个默认的视图选项
    $stateProvider
        .state('index',{
            url:'/index',
            views:{
                '':{
                    templateUrl:'tpls/index.html'
                },
                'topbar@index':{
                    templateUrl:'tpls/topbar.html'
                },
                'main@index':{
                    templateUrl:'tpls/main.html'
                }
            }
        })
        //这一行定义了会在main.html页面第一个显示出来的状态（就是进入页面先加载的html），作为页面被加载好以后第一个被使用的路由.
        .state("PageTab", {//导航用的名字 
            url: "/PageTab",//#+标识符，这里就是url地址栏上面的标识符，通过标识符，进入不同的html页面
            templateUrl: "PageTab.html"//这里是html的路径，这是跟标识符相对应的html页面
        })
        .state("PageTab.Page1", {//引号里面代表Page1是PageTab的子页面，用.隔开
            url:"/Page1",
            templateUrl: "Page-1.html"
        })
        .state("PageTab.Page2", {//需要跳转页面的时候，就是用这双引号里面的地址
            url:"/Page2",
            templateUrl: "Page-2.html"
        })
});