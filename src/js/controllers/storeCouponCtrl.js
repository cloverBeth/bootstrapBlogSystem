"use strict";
angular.module('ZJSY_WeChat').controller('StoreCouponController',function($scope,$http, $state){
    "use strict";

    //temp
    var X_context = {};
    X_context.api = 'http://localhost:8080/zjsy/api/v1/';

    $scope.canLoad = true;
    $scope.maxItems = 100;
    $scope.currentPage = 1;
    $scope.pageSize = 8;
    $scope.pageNum = null;

    $scope.couponList = [];

    $scope.blueStatus = ["登录查看", "点击领取", "已领取"];
    $scope.clickStatus = ["登录查看", "点击领取"];


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
        $http.post(X_context.api + 'coupon/listByStore',{
            storeId : $scope.$parent.storeId,
            page : $scope.currentPage,
            size : $scope.pageSize
        }).success(function (data) {
            var res = data.data;
            $scope.couponList = $scope.couponList.concat(res.coupon);
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

    $scope.takeCoupon = function(index) {
        var status = $scope.couponList[index].status;
        if(status == '登录查看') {
            $state.go('login');
        }
    }

});