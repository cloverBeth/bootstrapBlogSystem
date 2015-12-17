"use strict";
angular.module('ZJSY_WeChat').controller('OrderListController',function($scope,$http,$state){
    var orderListApi=X_context.api+"order/list";
    //console.log('parent',$scope.$parent);
    $scope.title="我的订单";
    $scope.orderlist=[

    ];

    $http.post(orderListApi,{})
        .success(function(data){
            if(!data.data)return;
            for(var i in data.data){
                var order ={
                    number : data.data[i].id,
                    states : data.data[i].orderStatus,
                    orderDate : data.data[i].createDate,
                    products : [],
                    total : data.data[i].totalPrice,
                    totalNum : data.data[i].orderDetail ? data.data[i].orderDetail.length : 0
                };
                _.forEach(data.data[i].orderDetail,function(item,i){
                    order.products.push({
                        quantity : item.quantity,
                        image : item.image,
                        id : item.id
                    });
                })

                $scope.orderlist.push(order);

            }
        })
    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
})