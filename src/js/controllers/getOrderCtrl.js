"use strict";
angular.module('ZJSY_WeChat').controller('GetOrderController', function($scope,$location,$state,$stateParams){
    $scope.order = $scope.$parent.order;
    console.log('$scope.order',$scope.order);

    $scope.username = "陈冠希";
    $scope.phone = "13232311009";
    $scope.address = "香港XX摄影工作室";



    $scope.totalPrice = 0;
    _.forEach($scope.order,function(item,index){
        $scope.totalPrice += item.price * item.buyNum;
    })

    $scope.postOrder = function(){
        var orderList = [];
        _.forEach($scope.order,function(item,index){
            orderList.push({
                productId : item.id,
                quantity : item.num
            });
        });

        $state.go('orderSucceed');
    }
});