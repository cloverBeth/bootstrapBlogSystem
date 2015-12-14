"use strict";
angular.module('ZJSY_WeChat').controller('AddressAccountController',function($scope,$state,$stateParams,$http){
    $scope.title="收货地址";
    //$scope.address={

    //    user:'张三丰',
    //    telphhone:'13890876674',
    //   detailArea:"国际科技园2期302"
    //}
    var addressAccountApi = X_context.api + "addr/list";
    var addressid = "";
    $http.post(addressAccountApi,{
        id : X_context.memberId,
    })
        .success(function(data){
            console.log(data.data);
            var datas=data.data;
            if(!datas[0]){return;}
            $scope.address = {
                user :datas[0].receiver,
                telphhone : datas[0].mobile,
                detailArea:datas[0].addressFullname,
            };
            addressid=datas[0].addressId;

        })



    console.log("$stateParams",$stateParams.from && $stateParams.from.fromCart);

    $scope.goToCart = function(){
        console.log('click');
        if($stateParams.from && $stateParams.from.fromCart){
            $state.go('store.cart');
        }
    }


    $scope.editAddress = function(){
        $state.go('addressEdit',{from:{fromCart : $stateParams.from && $stateParams.from.fromCart},addressId:""});
    }

    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});