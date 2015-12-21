
angular.module('ZJSY_WeChat')
.controller('MainController', function($scope,$location,$http,$rootScope){
        "use strict";
        $scope.memberPromise = null;
        $scope.showLoading = false;
        $scope.cart = {
            products : [
                //{
                //    id: 0,
                //    name: "雀巢麦片",
                //    num: 156,
                //    img: "images/ph_1.jpg",
                //    detail: "营养高，味道好",
                //    cateId: 1,
                //    price: 30,
                //    buyNum: 1
                //}
            ],
            min : 0,
            freightFee : 0
        };
        $scope.order = {
            //storeId : 1,
            product : [
                {
                    //id: 1,
                    //name: "雀巢麦片",
                    //num: 99999,
                    //img: "https://www.baidu.com/img/bd_logo1.png",
                    //detail: "frfr飒飒",
                    //cateId: 29,
                    //price: 30,
                    //buyNum:1
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