"use strict";
angular.module('ZJSY_WeChat').controller('CardLoginController',function($scope,$interval,$http){

    $scope.card = {
        title: '一卡通'
    };



    $scope.getEnSure=function(){
        if($scope.cardnum!=null&&$scope.cardpwd!=null){
            window.history.back();
        }
      }
});
