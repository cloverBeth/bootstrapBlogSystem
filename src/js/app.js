var X_context = {
    guest : "guest",
    api : "http://192.168.6.49/zjsy/api/v1/",
    memberId : null,
    memberPhone : "",
    isPointStore : false
};
X_context.devHost = (location.host == "localhost") ? "http://192.168.6.49" : "";
X_context.authorization = readCookie('authorization') || X_context.guest;

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
        .state('store.coupon', {
            url: '/store-coupon',
            views: {
                '': {
                    templateUrl: 'storeCoupon.html',
                    controller: 'StoreCouponController'
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
                        if(!checkAuth.check()){
                            return $state.go('login');
                        }
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
                        if(!checkAuth.check()){
                            window.history.pushState({}, "addHisory", "#/account-center");
                            return $state.go('login');
                        }
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
        .state('myActivity',{
            url:'/my-activity',
            views:{
                '':{
                    templateUrl:'myActivity.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName = "MyActivityController";
                        return ctrlName;
                    }
                }
            }
        })

        .state('activityDetail',{
            url:'/activity-detail/{activityId}',
            params: {showSubmit: true},
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
        .state('activityEnrollSucceed',{
            url:'/activity-enroll-succeed/{orderId}',
            views:{
                '':{
                    templateUrl:'activityEnrollSucceed.html',
                    controller:'ActivityEnrollSucceedController'
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
                    controller: 'OnlineServiceController'
                }
            }
        })
        .state('serviceOrder',{
            url:'/service-order/{serviceOrderId}',
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
        .state('businessPlan', {
            url:'/business-plan',
            views:{
                '':{
                    templateUrl:'businessPlan.html',
                    controllerProvider: function($state,$stateParams,checkAuth){
                        if(!checkAuth.check()){
                            window.history.pushState({}, "addHisory", "#/business-plan");
                            return $state.go('login');
                        }
                        var ctrlName = "BusinessPlanController";
                        return ctrlName;

                    }
                }
            }
        })
        .state('inFinance', {
            url:'/in-finance',
            views:{
                '':{
                    templateUrl:'inFinance.html',
                    controllerProvider: function($state,$stateParams,checkAuth){
                        if(!checkAuth.check()){
                            window.history.pushState({}, "addHisory", "#/in-finance");
                            return $state.go('login');
                        }
                        var ctrlName = "InFinanceController";
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
                        if (!checkAuth.check()){
                            window.history.pushState({}, "addHisory", "#/garden-art");
                            return $state.go('login');
                        }
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
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(!checkAuth.check()){
                            window.history.pushState({}, "addHisory", "#/meeting-room-list");
                            return $state.go('login');
                        }
                        var ctrlName = "MeetingRoomListController";
                        return ctrlName;
                    }
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
            url:'/meeting-room-succeed/{orderId}',
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
                        if(!checkAuth.check()){
                            //window.history.pushState({}, "addHisory", "#/water-send");
                            return $state.go('login');
                        }
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
                        if(!checkAuth.check()){
                            //window.history.pushState({}, "addHisory", "#/maintain");
                            return $state.go('login');
                        }
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
        .state('adviceAndComplain',{
            url:'/advice-and-complain',
            views:{
                '':{
                    templateUrl:'adviceAndComplain.html',
                    controllerProvider:function($state,$stateParams,checkAuth){
                        if(!checkAuth.check())return $state.go('login');
                        var ctrlName="AdviceAndComplainController";
                        return ctrlName;
                    }
                }
            }
        })

        .state('companyShow',{
            url:'/company-show',
            views:{
                '':{
                    templateUrl:'companyShow.html',
                    controllerProvider: function($state,$stateParams,checkAuth) {
                        if(checkAuth.check()){
                            $stateParams.isAuth = true;
                        }else{
                            $stateParams.isAuth = false;
                        }
                        var ctrlName = "CompanyShowController";
                        return ctrlName;
                    }
                }
            }
        }).state('parkInfo', {
                url: '/park-info',
                views: {
                    '': {
                        templateUrl: 'parkInfo.html',
                        controllerProvider: function ($state, $stateParams, checkAuth) {
                            if (checkAuth.check()) {
                                $stateParams.isAuth = true;
                            } else {
                                $stateParams.isAuth = false;
                            }
                            var ctrlName = "ParkInfoController";
                            return ctrlName;
                        }
                    }
                }
            })
        .state('myCoupon',{
            url:'/myCoupon',
            views:{
                '':{
                        templateUrl:'myCoupon.html',
                        controllerProvider: function($state,$stateParams,checkAuth) {
                            if(!checkAuth.check())return $state.go('login');
                            var ctrlName = "MyCouponController";
                            return ctrlName;
                        }
                    }
                }
        })
        .state('mark', {//将sotreid放在此路由
            url: '/mark',
            views: {
                '': {
                    templateUrl: 'mark.html',
                    controller: 'MarkController'
                }
            }
        })
        .state('mark.valid', {
            url: '/mark-valid',
            views: {
                '': {
                    templateUrl: 'markValid.html',
                    controller: 'MarkValidController'
                }
            }
        })
        .state('mark.invalid', {
            url: '/mark-invalid',
            params: {invalid: true},
            views: {
                '': {
                    templateUrl: 'markValid.html',
                    controller: 'MarkValidController'
                }
            }
        });

        $urlRouterProvider.otherwise('/store/1/store-product/');


    });