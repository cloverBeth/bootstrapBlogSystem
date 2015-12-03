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

        .state('store.detail',{
            url: '/store-detail',
            views:{
                '':{
                    templateUrl:'storeDetail.html',
                    controller:'StoreDetailController'
                }
            }
        })

        .state('accountCenter', {
            url: '/account-center',
            views: {
                '': {
                    templateUrl: 'accountCenter.html',
                    controller: 'AccountCenterController'
                }
            }
        })
        .state('accountAddress',{
            url:'/account-address',
            views:{
                '':{
                templateUrl:'accountAddress.html',
                controller:'AccountAddressController'
                }
            }
        })

        .state('editAddress',{
            url:'/edit-address',
            views:{
                '':{
                    templateUrl:'editAddress.html',
                    controller:'EditAddressController'
                }
            }
        })
        .state('login',{
            url: '/login',
            views: {
                '': {
                    templateUrl: 'login.html',
                    controller: 'LoginController'
                }
            }

        })

        $urlRouterProvider.otherwise('/store');

    });