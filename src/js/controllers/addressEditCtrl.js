"use strict";
angular.module('ZJSY_WeChat').controller('AddressEditController',function($scope,$stateParams,$http,$state){
    $scope.title='编辑地址';

    //$scope.user='sunny';
    //$scope.telphone="12345667";
    //$scope.addressdetail="大不列颠帝国英国伦敦";
    //console.log('哈哈哈');

    var addressAccountApi = X_context.api + "addr/list";
    $http.post(addressAccountApi,{
        id : 2,
    })
        .success(function(data){
            console.log(data.data);
            var datas=data.data;
            if(!datas[0])return;

            $scope.user = datas[0].receiver;
            $scope.telphone = datas[0].mobile;
            $scope.detailArea = datas[0].addressFullname;


        })



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