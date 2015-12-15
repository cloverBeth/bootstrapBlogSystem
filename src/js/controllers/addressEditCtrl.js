"use strict";
angular.module('ZJSY_WeChat').controller('AddressEditController',function($scope,$stateParams,$http,$state){
    $scope.title='编辑地址';


    var addressAccountApi = X_context.api + "addr/list";

    $http.post(addressAccountApi,{
        id :  $stateParams.id,
    })
        .success(function(data){
            var datas=data.data;
            //if(!datas[0])return;

            $scope.user = datas[0].receiver;
            $scope.telphone = datas[0].mobile;
            $scope.detailArea = datas[0].addressFullname;

        })

    $scope.update=function(){
        var addressAccountApi = X_context.api + "addr/update";
        $http.post(addressAccountApi,{
            "id" :  $stateParams.id,
            "receiver" : $scope.user,
            "addressFullname" : $scope.detailArea,
            "mobile" : $scope.telphone,
        })
            .success(function(){
                console.log($scope.detailArea)
            })
    }

    








    console.log("$stateParams",$stateParams.from && $stateParams.from.fromCart);
    $scope.goBack = function() {
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