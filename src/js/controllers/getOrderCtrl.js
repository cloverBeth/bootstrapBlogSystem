"use strict";
angular.module('ZJSY_WeChat').controller('GetOrderController', function($scope,$location,$state,$stateParams,$http){
    $scope.order = $scope.$parent.order;
    $scope.cart = $scope.$parent.cart;

    //$scope.username = "陈冠希";
    //$scope.phone = "13232311009";
    //$scope.address = "香港XX摄影工作室";

    $scope.payOption = "delivery";


    var posted = false;
    $scope.totalPrice = 0;
    _.forEach($scope.order.product, function (item, index) {
            $scope.totalPrice += item.price * item.buyNum;


    })
    if( $scope.totalPrice<$scope.$parent.cart.min)
    {
        $scope.totalPrice=$scope.totalPrice+$scope.$parent.cart.freightFee;
    }
    $scope.postOrder = function(){
        if(posted == true)return;
        posted = true;
        var orderList = [];
        _.forEach($scope.order.product,function(item,index){
            orderList.push({
                productId : item.id,
                quantity : item.buyNum,
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

        }).success(function(data){
                $scope.cart.products = [];
                $state.go('orderSucceed',{orderId:data.data[0]._id});
            });
        }




    $scope.$parent.memberPromise.then(function () {
        $http.post(X_context.api + "addr/list", {
            memberId: X_context.memberId,
            addrId:$stateParams.addrId,
        })
            .success(function (data) {
                var datas = data.data;
                $scope.username = datas[0].receiver;
                $scope.phone = datas[0].mobile;
                $scope.address = datas[0].addressFullname;
            })
    });

    $scope.postOrderAndPay = function(){

        if(posted == true)return;
        posted = true;
        var orderList = [];
        _.forEach($scope.order.product,function(item,index){
            orderList.push({
                productId : item.id,
                quantity : item.buyNum,
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

        }).success(function(data){
            $state.go('cardLogin',{from:{fromOrder : true,orderId : data.data[0]._id}});
        });



    }


});