"use strict";
angular.module('ZJSY_WeChat').controller('AddressEditController',function($scope,$stateParams,$state){
    $scope.editAddress={
        title:'编辑地址'
    }
    $scope.user='sunny';
    $scope.telphone="12345667";
    $scope.addressdetail="大不列颠帝国英国伦敦";
    console.log('哈哈哈');

    console.log("$stateParams",$stateParams.from && $stateParams.from.fromCart);

    $scope.goBack = function() {
        console.log('click123');
        if ($stateParams.from && $stateParams.from.fromCart) {
            return $state.go('store.cart');
        } else {
            window.history.back();
        }
    }

    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});