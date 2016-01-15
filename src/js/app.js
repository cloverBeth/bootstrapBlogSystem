var X_context = {
    guest : "guest",
    api : "http://192.168.6.49/zjsy/api/v1/",
    memberId : null,
    memberPhone : ""
};
X_context.devHost = (location.host == "localhost") ? "http://192.168.6.49" : "";
X_context.authorization = readCookie('authorization') || X_context.authorization;

angular.module('ZJSY_WeChat', [
    //'ngRoute',
    'ui.router',
    //'ui.bootstrap',
    'mobile-angular-ui',
    'ngFileUpload',
    'ui.bootstrap'
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
        url: '/store-product/{productId}',
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
            url:'/address-edit/{addrId}',
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
        .state('card',{
                url:'/card',
                views:{
                    '':{
                        templateUrl:'card.html',
                        //controller:'CardAccountController'
                        controllerProvider:function($state,$stateParams,checkAuth){
                            if(!checkAuth.check()){
                                return $state.go('login');
                            }
                            var ctrlName="CardController";
                            return ctrlName;

                        }
                    }
                }
            })
        .state('cardLogin',{
            url:'/card-login',
            params: {from: null},
            views:{
                '':{
                    templateUrl:'cardLogin.html',
                    //controller:'CardAccountController'
                    controllerProvider:function($state,$stateParams,checkAuth){
                        if(!checkAuth.check()){
                            return $state.go('login');
                        }
                        var ctrlName="CardLoginController";
                        return ctrlName;

                    }
                }
            }
        })

        .state('transactionDetail',{
            url:'/transaction-detail',
            views:{
                '':{
                    templateUrl:'transactionDetail.html',
                    //controller:'CardAccountController'
                    controllerProvider:function($state,$stateParams,checkAuth){
                        if(!checkAuth.check()){
                            return $state.go('login');
                        }
                        var ctrlName="TransactionDetailController";
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
            url:'/order-detail/{orderId}',
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
            url: '/getOrder/{productId}',
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
            url:'/order-succeed/{orderId}',
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
        .state('serviceSucceed',{
            url:'/service-succeed/{serviceOrderId}',
            views:{
                '':{
                    templateUrl:'serviceSucceed.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "ServiceSucceedController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('serviceFailed',{
            url:'/service-failed/{serviceOrderId}',
            views:{
                '':{
                    templateUrl:'serviceFailed.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "ServiceFailedController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('creditAccount',{
            url:'/credit-account/{orderId}',
            views:{
                '':{
                    templateUrl:'creditAccount.html',
                    //controller:'CreditAccountController'
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "CreditAccountController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('allActivity',{
            url:'/all-activity',
            views:{
                '':{
                    templateUrl:'allActivity.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(checkAuth.check()){
                            $stateParams.isAuth = true;
                        }else{
                            $stateParams.isAuth = false;
                        }
                        var ctrlName = "AllActivityController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('activity',{
            url:'/activity',
            views:{
                '':{
                    templateUrl:'activity.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "ActivityController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('activityDetail',{
            url:'/activity-detail/{activityId}',
            views:{
                '':{
                    templateUrl:'activityDetail.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {

                        if(checkAuth.check()){
                            $stateParams.isAuth = true;
                        }else{
                            $stateParams.isAuth = false;
                        }
                        var ctrlName = "ActivityDetailController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('myService',{
            url:'/my-service',
            views:{
                '':{
                    templateUrl:'myService.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "MyServiceController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('serviceDetail',{
            url:'/service-detail',
            views:{
                '':{
                    templateUrl:'serviceDetail.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "ServiceDetailController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('onlineService',{
            url:'/online-service',
            views:{
                '':{
                    templateUrl:'onlineService.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "OnlineServiceController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('serviceOrder',{
            url:'/service-order',
            views:{
                '':{
                    templateUrl:'serviceOrder.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "ServiceOrderController";
                        return ctrlName;
                    }
                }
            }
        })

        .state('businessList', {
            url:'/business-list',
            views: {
                '': {
                    templateUrl:'businessList.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "BusinessListController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('gardenArt',{
            url:'/garden-art',
            views: {
                '': {
                    templateUrl: 'gardenArt.html',
                    controllerProvider: function ($state, $stateParams, checkAuth) {
                        if (!checkAuth.check())return $state.go('login');
                        var ctrlName = "GardenArtController";
                        return ctrlName;
                    }
                }
                }
        })
        .state('meetingRoomList',{
            url:'/meeting-room-list',
            views:{
                '':{
                    templateUrl:'meetingRoomList.html',
                    controller:'MeetingRoomListController'
                }
            }
        })
        .state('meetingRoomOrder',{
            url:'/meeting-room-order/{roomId}',
            views:{
                '':{
                    templateUrl:'meetingRoomOrder.html',
                    controller:'MeetingRoomOrderController'
                }
            }
        })
        .state('meetingRoomSucceed',{
            url:'/meeting-room-succeed',
            views:{
                '':{
                    templateUrl:'meetingRoomSucceed.html',
                    controller:'MeetingRoomSucceedController'
                }
            }
        })
        .state('meetingRoomEnsure',{
            params: {meetingOrder: {}},
            url:'/meeting-room-ensure/{meetingOrderId}',
            views:{
                '':{
                    templateUrl:'meetingRoomEnsure.html',
                    controller:'MeetingRoomEnsureController'
                }
            }
        })
        .state('waterSend',{
            url:'/water-send',
            views:{
                '':{
                    templateUrl:'waterSend.html',
                    controllerProvider:function($state,$stateParams,checkAuth){
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName="WaterSendController";
                        return ctrlName;
                    }
                }
            }
        })

        .state('maintain',{
            url:'/maintain',
            views:{
                '':{
                    templateUrl:'maintain.html',
                    controllerProvider:function($state,$stateParams,checkAuth){
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName="MaintainController";
                        return ctrlName;
                    }
                }
            }
        })
        .state('parking',{
            url:'/parking',
            views:{
                '':{
                    templateUrl:'parking.html',
                    controllerProvider:function($state,$stateParams,checkAuth){
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName="ParkingController";
                        return ctrlName;
                    }
                }
            }
        })


        $urlRouterProvider.otherwise('/store/1/store-product/');


    });