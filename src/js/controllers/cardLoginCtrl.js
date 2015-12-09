"use strict";
angular.module('ZJSY_WeChat').controller('CardLoginController',function($scope,$state,$interval,$http){

    $scope.card = {
        title: '一卡通'
    };
    $scope.cardnum='******08086';
    $scope.cardpwd='123456';

    $scope.goIndex=function(){
        $state.go('store.product');
    }

    $scope.getEnSure=function(){
        if($scope.cardnum!=null&&$scope.cardpwd!=null){
            window.history.back();
        }
      }
});
