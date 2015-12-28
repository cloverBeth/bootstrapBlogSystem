"use strict";
angular.module('ZJSY_WeChat').controller('AddressAccountController',function($scope,$state,$stateParams,$http){

    $scope.title="收货地址";
    $scope.addNewAddr = false;
    $scope.address = {
        id : null
    };

    $scope.$parent.memberPromise.then(function () {
        $http.post(X_context.api + "addr/list", {
            memberId: X_context.memberId,
            addrId:$stateParams.addrId,
        })
            .success(function (data) {
                var datas = data.data;
                if (datas.length == 0) {
                    $scope.addNewAddr = true;
                    return;
                }
                $scope.address.id = datas[0].id;
                $scope.address.user = datas[0].receiver;
                $scope.address.telphone = datas[0].mobile;
                $scope.address.detailArea = datas[0].addressFullname;
            })
    });

    console.log("$stateParams",$stateParams.from && $stateParams.from.fromCart);


    $scope.goToCart = function(){
        if($stateParams.from && $stateParams.from.fromCart){
            $state.go('store.cart',{storeId:X_context.storeId});
        }
    }

    $scope.editAddress = function(){
        $state.go('addressEdit',{from:{fromCart : $stateParams.from && $stateParams.from.fromCart},addrId:$scope.address.id});
    }

    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});