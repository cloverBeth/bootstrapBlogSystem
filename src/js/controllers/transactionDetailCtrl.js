"use strict";
angular.module('ZJSY_WeChat').controller('TransactionDetailController',function($scope,$state,$http){
    $scope.title='交易明细';
    $scope.isOrder=false;
    $scope.transaction=[

    ];
    var orderListApi=X_context.api+"order/list";
    $http.post(orderListApi,{})
        .success(function(data){
            if(!data.data)return;
            for(var i in data.data) {
                if(data.data[i].paidSn){
                    $scope.transaction.push({
                        number: data.data[i].paidSn,
                        order: data.data[i].orderSn,
                        order_date: data.data[i].createDate,
                        cost: data.data[i].totalPrice
                    });
                }
            }
            if(data.data.length==0){$scope.isOrder=true;}
})

    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});