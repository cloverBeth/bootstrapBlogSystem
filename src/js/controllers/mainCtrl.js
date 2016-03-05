
angular.module('ZJSY_WeChat')
.controller('MainController', function($scope,$location,$http,$rootScope){
        "use strict";
        X_context.bodyHeight = $('body').css('height').split('px')[0];
        $scope.memberPromise = null;
        $scope.showLoading = false;
        $scope.cart = {};
        //$scope.cart = {
        //    43:{
        //    products : [
        //        {
        //            id: 32,
        //            name: '米饭',
        //            num: 99969,
        //            img: 'http://192.168.6.49/products/43_333_1.png',
        //            detail:"",
        //            cateId: 9,
        //            price: 33,
        //            point: 20,
        //            buyNum: 1,
        //        }
        //    ],
        //    min : 30,
        //    freightFee : 5
        //}};
        $scope.order = {
            //storeId : 43,
            product : [
                {
                    //id: 32,
                    //name: '米饭',
                    //num: 99969,
                    //img: 'http://192.168.6.49/products/43_333_1.png',
                    //detail:"",
                    //cateId: 9,
                    //price: 0,
                    //point: 20,
                    //buyNum: 1,
                }
            ]
        };
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $('#zjsy_modal').empty();
        });

        $rootScope.$on('showLoading',function(){
            $scope.showLoading = true;
        });

        $rootScope.$on('hideLoading',function(){
            $scope.showLoading = false;

        });

        if(X_context.authorization && X_context.authorization!=X_context.guest){
            $scope.memberPromise = $http.get(X_context.api + 'member/getCurMem')
                .success(function(data){
                    if(!data.data[0])return;
                    X_context.memberId = data.data[0]._id;
                    X_context.memberPhone = data.data[0].mobile;
                });
        }
        $scope.isActive = function (route) {
            if(_.indexOf($location.path().split('/'),route.split('/')[1])>0){
                return true;
            }else{
                return false;
            }
        }



});