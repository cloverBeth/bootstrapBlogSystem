"use strict";
angular.module("ZJSY_WeChat").controller("ServiceSucceedController",function($scope,$state,$http,$stateParams){
    console.log($stateParams.orderId);
    $scope.title="下单成功";
    //$scope.telphone='012-7654987';
    $scope.goOnline=function(){
        $state.go('gardenArt');
    }

})
