"use strict";
angular.module('ZJSY_WeChat').controller('StoreCartController',function($scope){
    $scope.$parent.title = "购物车";

    $scope.cart = $scope.$parent.$parent.cart;



    $scope.username = "陈冠希";
    $scope.phone = "13232311009";
    $scope.address = "香港XX摄影工作室";

    $scope.mainHeight = $('body').css('height').split('px')[0] -
        $('header').css('height').split('px')[0];
});