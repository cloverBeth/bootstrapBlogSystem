"use strict";
angular.module('ZJSY_WeChat').controller('MyCouponController',function($scope,$http, $state){
    "use strict";

    $scope.title = '我的优惠券';

    $scope.canLoad = true;
    $scope.maxItems = 100;
    $scope.currentPage = 1;
    $scope.pageSize = 8;
    $scope.pageNum = null;

    $scope.couponList = [];

    $scope.noCoupon = false;

    $scope.blueStatus = ["未使用"];


    $scope.init = function() {
        $scope.listCoupon();
    };

    $scope.addItems = function () {
        $scope.currentPage++;
        if($scope.currentPage > $scope.pageNum || !$scope.canLoad) {
            $scope.canLoad = false;
        } else {
            $scope.listCoupon();
        }
    };

    $scope.listCoupon = function() {
        $http.post(X_context.api + 'coupon/mine',{
            storeId : $scope.$parent.storeId,
            page : $scope.currentPage,
            size : $scope.pageSize
        }).success(function (resp) {
            var res = resp.data;
            $scope.couponList = $scope.couponList.concat(res.coupon);
            if($scope.couponList.length == 0) {
                $scope.noCoupon = true;
            } else {
                $scope.noCoupon = false;
            }
            $scope.maxItems = res.page.total;
            $scope.pageNum = ($scope.maxItems && $scope.couponList.length >= 1)
                ? Math.ceil($scope.maxItems / $scope.pageSize)
                : 1;
        });
    };

    $scope.checkBlue = function(status, background) {
        if(background) {
            return _.includes($scope.blueStatus, status)? 'blue' : 'gray';
        } else {
            return _.includes($scope.blueStatus, status)? 'white' : 'gray';
        }

    };

    $scope.jumpToStore = function(index) {
        $state.go('store.product',{storeId : $scope.couponList[index].storeId});
    }


});