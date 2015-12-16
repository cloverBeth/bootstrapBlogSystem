"use strict";
angular.module('ZJSY_WeChat').controller('AddressEditController',function($scope,$stateParams,$http,$state){
    $scope.title='编辑地址';


    var addressAccountListApi = X_context.api + "addr/list";
    console.log('$stateParams.addrId',$stateParams.addrId);

    if($stateParams.addrId){
        $http.post(addressAccountListApi,{
            addrId : $stateParams.addrId
        })
            .success(function(data){
                var datas=data.data;
                $scope.user = datas[0].receiver;
                $scope.telphone = datas[0].mobile;
                $scope.detailArea = datas[0].addressFullname;

            })
    };



    $scope.update=function(){
        if(!$stateParams.addrId){
            $http.post(X_context.api + "addr/add",{
                "member" : X_context.memberId,
                "receiver" : $scope.user,
                "addressFullname" : $scope.detailArea,
                "mobile" : $scope.telphone,
            })
                .success(function(data){
                    console.log(data.data);
                    $scope.goBack();
                })
        }else{
            $http.post(X_context.api + "addr/update",{
                "addrId" :  $stateParams.addrId,
                "receiver" : $scope.user,
                "addressFullname" : $scope.detailArea,
                "mobile" : $scope.telphone,
            })
                .success(function(data){
                    console.log(data);
                    $scope.goBack();
                })
        }

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