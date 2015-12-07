var X_context = {};
X_context.authorization = "guest";
X_context.api = "http://192.168.6.43/zjsy/api/v1/";

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
        .state('store', {//将sotreid放在此路由
            url: '/store/{storeId}',
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
                    //controller:'StoreCartController'
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "StoreCartController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('accountCenter', {
            url: '/account-center',
            views: {
                '': {
                    templateUrl: 'accountCenter.html',
                    //controller: 'AccountCenterController'
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "AccountCenterController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('addressAccount',{
            url:'/address-account',
            params: {from: null},
            views:{
                '':{
                    templateUrl:'addressAccount.html',
                    //controller:'AddressAccountController'
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "AddressAccountController";
                        return ctrlName;
                    }
                }
            }
        })

        .state('addressEdit',{
            url:'/address-edit',
            params: {from: null},
            views:{
                '':{
                    templateUrl:'addressEdit.html',
                    //controller:'AddressEditController'
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "AddressEditController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('orderList',{
            url:'/order-list',
            views:{
                '':{
                    templateUrl:'orderList.html',
                    //controller:'OrderListController'
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "OrderListController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('orderDetail',{
            url:'/order-detail',
            views:{
                '':{
                    templateUrl:'orderDetail.html',
                    //controller:'OrderDetailController',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "OrderDetailController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('login',{
            url: '/login',
            views: {
                '': {
                    templateUrl: 'login.html',
                    //controller: 'LoginController'
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(checkAuth.check())return $state.go('accountCenter');
                        var ctrlName = "LoginController";
                        return ctrlName;
                    }
                }
            }

        })
        .state('getOrder',{
            url: '/getOrder',
            views: {
                '': {
                    templateUrl: 'getOrder.html',
                    //controller: 'GetOrderController'
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "GetOrderController";
                        return ctrlName;
                    }
                }
            }

        })
        .state('orderSucceed',{
            url:'/order-succeed',
            views:{
                '':{
                    templateUrl:'orderSucceed.html',
                    //controller:'OrderSucceedController'
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "OrderSucceedController";
                        return ctrlName;
                    }
                }
            }
        })


        $urlRouterProvider.otherwise('/store/1/store-product');


    });