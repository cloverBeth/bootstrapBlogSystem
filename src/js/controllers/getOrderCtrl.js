"use strict";
angular.module('ZJSY_WeChat').controller('GetOrderController', function($scope,$location,$state,$stateParams,$http){
    $scope.order = $scope.$parent.order;

    $scope.username = "陈冠希";
    $scope.phone = "13232311009";
    $scope.address = "香港XX摄影工作室";

    $scope.payOption = "delivery";


    var posted = false;

    $scope.totalPrice = 0;
    _.forEach($scope.order.product,function(item,index){
        $scope.totalPrice += item.price * item.buyNum;
    })

    $scope.postOrder = function(){
        if(posted == true)return;
        posted = true;
        var orderList = [];
        _.forEach($scope.order.product,function(item,index){
            orderList.push({
                productId : item.id,
                quantity : item.num,
                unitPrice : item.price
            });
        });
        $http.post(X_context.api + 'order/add',{
            "storeId" : $scope.order.storeId,
            "address" : $scope.address,
            "orderStatus" : "未处理",
            "payMethod" : $scope.payOption=="delivery"?"现金":"一卡通",
            "phone" : $scope.phone,
            "receiver" : $scope.username,
            "orderItems" : orderList

        }).success(function(){
                $state.go('orderSucceed');
            });
        }

    $scope.postOrderAndPay = function(){
        var orderList = [];
        _.forEach($scope.order.product,function(item,index){
            orderList.push({
                productId : item.id,
                quantity : item.num
            });
        });
        $state.go('cardLogin',{from:{fromOrder : true, orderId : 1}});
    }


});