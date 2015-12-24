"use strict";
angular.module('ZJSY_WeChat').controller('OrderListController',function($scope,$http,$state){
    var orderListApi=X_context.api+"order/listAll";
    //console.log('parent',$scope.$parent);
    $scope.title="我的订单";
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.loading = false;
    $scope.orderlist=[

    ];

    $scope.getOrder = function(){
        if($scope.loading)return;
        $scope.loading = true;
        $http.post(orderListApi,{
            page : $scope.currentPage,
            pageSize : $scope.pageSize
        })
            .success(function(data){
                if(!data.data)return;
                for(var i in data.data){
                    var order ={
                        number : data.data[i].orderSn,
                        states : (data.data[i].orderStatus == "未处理"
                        && data.data[i].paymentMethod == "一卡通"
                        && !data.data[i].paidSn) ? "未付款" : data.data[i].orderStatus,
                        orderDate : data.data[i].createDate,
                        products : [],
                        total : data.data[i].totalPrice,
                        totalNum : data.data[i].orderDetail ? data.data[i].orderDetail.length : 0,
                        id : data.data[i].id
                    };
                    _.forEach(data.data[i].orderDetail,function(item,i){
                        order.products.push({
                            quantity : item.quantity,
                            image : item.productImage,
                            id : item.id
                        });
                    })
                    $scope.orderlist.push(order);
                    $scope.loading = false;
                }

            })
    }

    $scope.getOrder();


    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }

    $(".order_list").on('scroll',function() {

        if( $('.order_list').scrollTop() + $('.order_list').height() > $('.order_all').height() - 50){

            $scope.currentPage++;
            $scope.getOrder();

        }
    });
})