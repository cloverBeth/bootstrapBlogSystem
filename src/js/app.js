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
        .state('store', {//将sotreid放在此路由
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
        .state('store.sale', {
            url: '/store-sale',
            views: {
                '': {
                    templateUrl: 'storeSale.html',
                    controller: 'StoreSaleController'
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
        .state('store.cart',{
            url: '/store-cart',
            views:{
                '':{
                    templateUrl:'storeCart.html',
                    controller:'StoreCartController'
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
        .state('addressAccount',{
            url:'/address-account',
            views:{
                '':{
                templateUrl:'addressAccount.html',
                controller:'AddressAccountController'
                }
            }
        })

        .state('addressEdit',{
            url:'/address-edit',
            views:{
                '':{
                    templateUrl:'addressEdit.html',
                    controller:'AddressEditController'
                }
            }
        })
        .state('orderList',{
            url:'/order-list',
            views:{
                '':{
                    templateUrl:'orderList.html',
                    controller:'OrderListController'
                }
            }
        })
        .state('orderDetail',{
            url:'/order-detail',
            views:{
                '':{
                    templateUrl:'orderDetail.html',
                    controller:'OrderDetailController'
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
        .state('getOrder',{
            url: '/getOrder',
            views: {
                '': {
                    templateUrl: 'getOrder.html',
                    controller: 'GetOrderController'
                }
            }

        })
        .state('orderSucceed',{
            url:'/order-succeed',
            views:{
                '':{
                    templateUrl:'orderSucceed.html',
                    controller:'OrderSucceedController'
                }
            }
        })


        $urlRouterProvider.otherwise('/store/store-product');

    });