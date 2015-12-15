"use strict";
angular.module('ZJSY_WeChat').controller('AddressAccountController',function($scope,$state,$stateParams,$http){
    $scope.title="收货地址";




   var addressAccountApi= X_context.api + "addr/list";
    var addrId="";
    $http.post(addressAccountApi,{
       id: $stateParams.id,
    })
        .success(function(data){
            var datas=data.data;
            if(!datas[0])return;
        $scope.address={
               user : datas[0].receiver,
               telphone : datas[0].mobile,
               detailArea : datas[0].addressFullname,

        }
           addrId=datas[0].id;
            if(addrId==""){$scope.addNewAddr=true;}
            else{$scope.addNewAddr=false;}

    })





    console.log("$stateParams",$stateParams.from && $stateParams.from.fromCart);

    $scope.goToCart = function(){
        //console.log('click');
        if($stateParams.from && $stateParams.from.fromCart){
            $state.go('store.cart');
        }
    }


    $scope.editAddress = function(){
        $state.go('addressEdit',{from:{fromCart : $stateParams.from && $stateParams.from.fromCart}},{addrId:X_context.addrId});
    }

    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});