"use strict";
angular.module("ZJSY_WeChat").controller("OrderSucceedController",function($scope,$state,$http,$stateParams){
    console.log($stateParams.orderId);
    $scope.title="";
    //$scope.telphone='012-7654987';

    var orderListApi = X_context.api + "order/list";
    var orderPromise = $http.post(orderListApi,{
        orderId : $stateParams.orderId,
    })
        .success(function(data){
            console.log(data.data);
            var datas=data.data;
            if(!datas[0]){return;}
            let num = 0;
            _.forEach(datas[0].orderDetail,function(item,i){
                num += item.quantity
            })

            $scope.orderSucceed = {
                orderNumber :datas[0].orderSn,
                quantity : num,
                payway:datas[0].paymentMethod,
                distribution:datas[0].shippingPrice,
                expense:datas[0].totalPrice,
                point:datas[0].point,
                telphone:datas[0].storePhone,
                status : (datas[0].orderStatus == "未处理"
                        && datas[0].paymentMethod == "一卡通"
                        && !datas[0].paidSn) ? "未付款" : datas[0].orderStatus,
                businessName : datas[0].storeName
            };
            $scope.title = $scope.orderSucceed.status == "未付款" ? "购物未成功" : "购物成功";
            $scope.isBe=false;
            $scope.isFal=false;
            $scope.isPoint = datas[0].storeType == '1';
            $scope.storeId = datas[0].storeId;
            $scope.selfGet = datas[0].flag == "1";
            if($scope.title=="购物未成功"){
                $scope.isBe=false;
                $scope.isFal=true;
            }
            else{
                $scope.isBe=true;
                $scope.isFal=false;
            }
        });

    orderPromise.then(function(){
        $http.post(X_context.api + 'store/findAddress',
            {
                storeId : $scope.storeId
            }).success(function(data){
                $scope.storeAddress = data.data;
            })
    });



    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
    $scope.goToPay=function(){
        $state.go('orderDetail',{orderId:$stateParams.orderId});
    }
})
