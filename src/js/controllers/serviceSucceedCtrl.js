"use strict";
angular.module("ZJSY_WeChat").controller("ServiceSucceedController",function($scope,$state,$http,$stateParams){
    console.log($stateParams.orderId);
    $scope.title="下单成功";
    $scope.orderSucceed={
        type:"园艺购买",
        status:"支付成功",
        orderNumber:"201976875613623",
        expense:"300",
        payway:"线下支付",
        telphone:"1796733266"
    }


    $scope.goToOnline=function(){
        $state.go('onlineService');
    }

})
