"use strict";
angular.module("ZJSY_WeChat").controller("OrderSucceedController",function($scope,$state,$http,$stateParams){
    console.log($stateParams.orderId);
    $scope.title="";
    //$scope.telphone='012-7654987';

    var orderListApi = X_context.api + "order/list";
    $http.post(orderListApi,{
        id : $stateParams.orderId,
    })
        .success(function(data){
            console.log(data.data);
            var datas=data.data;
            if(!datas[0]){return;}
            $scope.orderSucceed = {
                orderNumber :datas[0].orderSn,
                quantity : datas[0].orderDetail.length,
                payway:datas[0].paymentMethod,
                distribution:datas[0].shippingPrice,
                expense:datas[0].totalPrice,
                telphone:datas[0].storePhone,
                status : (datas[0].orderStatus == "未处理"
                        && datas[0].paymentMethod == "一卡通"
                        && !datas[0].paidSn) ? "未付款" : datas[0].orderStatus,
            };
            $scope.title = $scope.orderSucceed.status == "未付款" ? "购物未成功" : "购物成功"

        })



    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
})
