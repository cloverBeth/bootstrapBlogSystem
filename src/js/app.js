angular.module('ZJSY_WeChat', [
    //'ngRoute',
    'ui.router',
    //'ui.bootstrap',
    'mobile-angular-ui'
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
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('store', {
                url: '/store',
                views: {
                    '': {
                        templateUrl: 'store.html',
                        controller: 'StoreController'
                    }
                }
            })
            .state('store.product', {
                url: '/store-product',
                views: {
                    '': {
                        templateUrl: 'storeProduct.html',
                        controller: 'StoreProductController'
                    }
                }
            })
            .state('test', {
                url: '/test',
                views: {
                    '': {
                        templateUrl: 'test.html',
                        controller: 'TestController'
                    }
                }
            })

        $urlRouterProvider.otherwise('/store');

    });