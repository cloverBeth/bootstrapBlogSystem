var X_context = {
    guest : "guest",
    api : "<replaceSec>" + "/zjsy/api/v1/",
    memberId : null,
    memberPhone : "",
    isPointStore : false
};
//X_context.devHost = (location.host == "localhost") ? "http://192.168.6.49" : "";
//X_context.authorization = readCookie('authorization') || X_context.guest;

angular.module('ZJSY_WeChat', [
    //'ngRoute',
    'ui.router',
    //'ui.bootstrap',
    'mobile-angular-ui',
    'ngFileUpload',
    'ui.bootstrap',
])

    //.config(function($routeProvider) {
    //    $routeProvider.when('/', {
    //        templateUrl:'home.html',
    //        controller : 'HomeController',
    //        reloadOnSearch: false
    //    })
    //        .when('/test', {
    //            templateUrl:'test.html',
    //            controller : 'TestController',
    //            reloadOnSearch: false
    //        });
    //
    //});
    .config(function($stateProvider, $urlRouterProvider,$httpProvider) {
        //$httpProvider.defaults.useXDomain = true;
        $httpProvider.interceptors.push('ajaxInterceptor');
        $httpProvider.defaults.headers.post = {
            "Content-Type" : "application/json;charset=utf-8",
            "Authorization" : X_context.authorization

        };
        $httpProvider.defaults.headers.put = {
            "Content-Type" : "application/json;charset=utf-8",
            "Authorization" : X_context.authorization

        };
        $httpProvider.defaults.headers.get = {
            "Authorization" : X_context.authorization

        };
        $httpProvider.defaults.headers.delete = {
            "Content-Type" : "application/json;charset=utf-8",
            "Authorization" : X_context.authorization

        };

        $stateProvider

        .state('accountCenter',{
            url:'/account-center',
            views:{
                '':{
                    templateUrl:'accountCenter.html',
                    controller:'AccountCenterController'
                }
            }
        })


        $urlRouterProvider.otherwise('/account-center');


    });