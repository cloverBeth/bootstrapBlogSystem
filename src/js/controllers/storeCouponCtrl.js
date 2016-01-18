"use strict";
angular.module('ZJSY_WeChat').controller('StoreCouponController',function($scope,$http){
    "use strict";

    var X_context = {};
    X_context.api = 'http://localhost:8080/zjsy/api/v1/';

    var page = 1;
    var size = 5;

    $scope.couponList = [];

    $scope.blueStatus = ["登录查看", "点击领取", "已领取"];
    $scope.clickStatus = ["登录查看", "点击领取"];

    $http.post(X_context.api + 'coupon/listByStore',{
        storeId : $scope.$parent.storeId,
        page : page,
        size : size
    }).success(function(data){
        $scope.couponList = data.data.coupon;
        console.log($scope.couponList);
    });

    $scope.checkBlue = function(status, background) {
        if(background) {
            return _.includes($scope.blueStatus, status)? 'blue' : 'gray';
        } else {
            return _.includes($scope.blueStatus, status)? 'white' : 'gray';
        }

    };

});