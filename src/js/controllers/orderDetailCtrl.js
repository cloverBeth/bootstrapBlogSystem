"use strict";
angular.module('ZJSY_WeChat').controller('OrderDetailController',function($scope,$stateParams,$http,$state) {
    console.log($stateParams.orderId);

    $scope.title = '我的订单';
    var orderListApi = X_context.api + "order/list";

    $scope.orderpills=[];

    $http.post(orderListApi,{
        id : $stateParams.orderId
    })
        .success(function(data){
            console.log(data.data)
            var datas=data.data;
            if(!datas[0]){return;}
          $scope.orderone = {
                id : datas[0].id,
                orderNum :datas[0].orderSn,
                status : (datas[0].orderStatus == "未处理"
                            && datas[0].paymentMethod == "一卡通"
                            && !datas[0].paidTime) ? "未付款" : datas[0].orderStatus,
                address : datas[0].address,
                guest:datas[0].receiver,
                payway:datas[0].paymentMethod,
                total :datas[0].totalPrice,
                carriage:datas[0].shippingPrice,
                //credits:datas[0].userPoint,
                realpay :datas[0].totalPrice,
                orderpills:[],

            };

            _.forEach(datas[0].orderDetail,function(item){

                $scope.orderone.orderpills.push({
                    quantity : item.quantity,
                    standard:item.unitName,
                    brands:item.productName,
                    weight:item.itemSn,
                    id:item.id,
                    price:item.unitPrice,

                });
            })
            $scope.orderpills.push($scope.orderone);

        })





   $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }

    $scope.payAgain = function(){
        $state.go('cardLogin',{from:{fromOrder : true,orderId : $scope.orderone.id}});
    }

});

