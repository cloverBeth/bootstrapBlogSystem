"use strict";
angular.module("ZJSY_WeChat").controller("OrderSucceedController",function($scope,$state){
    $scope.title="购物成功";
    $scope.orderSucceed={
        orderNumber:'58579689560',
        quantity:'4',
        expense:'110',
        distribution:'1.50',
        mode:'货到付款',
        telphone:'410-567589067'

    }


    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
})
