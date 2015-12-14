"use strict";
angular.module("ZJSY_WeChat").controller("OrderSucceedController",function($scope,$state,$http,$stateParams){
    console.log($stateParams.orderId);
    $scope.title="购物成功";
    //$scope.telphone='012-7654987';

    var orderListApi = X_context.api + "order/list";
    $http.post(orderListApi,{
        id : $stateParams.orderId
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
                expense:datas[0].totalPrice+datas[0].shippingPrice,
                //telphone:datas[0].telephone

            };

        })



    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
})
