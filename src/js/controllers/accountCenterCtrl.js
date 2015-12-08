"use strict";
angular.module('ZJSY_WeChat').controller('AccountCenterController',function($scope,$state){
    $scope.account={
        title:'我的中心',
        tel:'13578923456',
        contact:'021-12345678',
        payWay:'一卡通'
    }
    console.log('hahah');
    $scope.signOut = function(){
        X_context.authorization = X_context.guest;
        $state.go('store.product');
    }
});