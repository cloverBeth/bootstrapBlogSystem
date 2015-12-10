"use strict";
angular.module('ZJSY_WeChat').controller('AddressAccountController',function($scope,$stateParams,$state){
    $scope.address={
        title:'收货地址',
        user:'张三丰',
        telphhone:'13890876674',
        city:'苏州市',
        district:'吴中区',
        garden:'青溪花园',
        house:'72#',
        room:'101室'
    }
    console.log("$stateParams",$stateParams.from && $stateParams.from.fromCart);

    $scope.goToCart = function(){
        console.log('click');
        if($stateParams.from && $stateParams.from.fromCart){
            $state.go('store.cart');
        }
    }


    $scope.editAddress = function(){
        $state.go('addressEdit',{from:{fromCart : $stateParams.from && $stateParams.from.fromCart}});
    }

    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});