"use strict";
angular.module('ZJSY_WeChat').controller('GetOrderByCardController', function($scope,$location,$state,$stateParams){
    $scope.order = $scope.$parent.order;
    console.log('$scope.order',$scope.order);

    $scope.username = "吴彦祖";
    $scope.phone = "14588811009";
    $scope.address = "台湾XX摄影工作室";
    $scope.payWay='一卡通';



    $scope.totalPrice = 0;
    _.forEach($scope.order,function(item,index){
        $scope.totalPrice += item.price * item.buyNum;
    })
});