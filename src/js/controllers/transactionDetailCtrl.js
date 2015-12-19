"use strict";
angular.module('ZJSY_WeChat').controller('TransactionDetailController',function($scope,$state,$http){
    $scope.title='交易明细';
    $scope.transaction=[
        //number:'20151208092590',
        //order:'666666',
        //cost:'25',
        //order_date:'2015-12-08 00:00:20'
    ];
    var orderListApi=X_context.api+"order/list";
    $http.post(orderListApi,{})
        .success(function(data){
            if(!data.data)return;
            for(var i in data.data){
                $scope.transaction =[{
                    number : data.data[i].paidSn,
                    order : data.data[i].orderSn,

                    order_date : data.data[i].createDate,
                    cost : data.data[i].totalPrice,}
                ];}
})

    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});