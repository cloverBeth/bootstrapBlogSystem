"use strict";
angular.module("ZJSY_WeChat").controller("OrderSucceedController",function($scope,$state,$http,$stateParams){
    console.log($stateParams.orderId);
    $scope.title="购物成功";
    $scope.orderSucceed={
        //orderNumber:'58579689560',
        //quantity:'4',
        //expense:'110',
        //distribution:'1.50',
        //mode:'货到付款',
        //telphone:'410-567589067'

    }

    var orderListApi = X_context.api + "order/list";
    $http.post(orderListApi,{
        id : $stateParams.orderId
    })
        .success(function(data){
            console.log(data.data)
            console.log(data.data[0].buyNum)
            var datas=data.data;
            if(!datas[0]){return;}
            $scope.orderSucceed = {
                orderNumber :datas[0].orderSn,
                quantity : datas[0].orderDetail.length,
        //        address : datas[0].address,
        //        guest:datas[0].receiver,
        //        payway:datas[0].paymentMethod,
        //        total :datas[0].totalPrice,
                distribution:datas[0].shippingPrice,
        //        //credits:datas[0].userPoint,
                expense:datas[0].totalPrice+datas[0].shippingPrice,
        //        orderpills:[],
        //
            };
        //
        //    _.forEach(datas[0].orderDetail,function(item){
        //
        //        $scope.orderone.orderpills.push({
        //            quantity : item.quantity,
        //            standard:item.unitName,
        //            brands:item.productName,
        //            weight:item.itemSn,
        //            id:item.id,
        //            price:item.unitPrice,
        //
        //        });
        //    })
        //    $scope.orderpills.push($scope.orderone);
        //
        })



    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
})
