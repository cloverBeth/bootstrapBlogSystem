"use strict";
angular.module('ZJSY_WeChat').controller('CardController',function($scope,$state){
    $scope.card={
        title:'我的一卡通'
        }
    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});