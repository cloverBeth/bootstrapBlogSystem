"use strict";
angular.module('ZJSY_WeChat').controller('AddressAccountController',function($scope,$state,$stateParams,$http){
    $scope.title="收货地址";
    //$scope.address={

    //    user:'张三丰',
    //    telphhone:'13890876674',
    //   detailArea:"国际科技园2期302"
    //}
    var addrId = "";
    $scope.addNewAddr='true';

    //if( $stateParams.addrId==""){
    //        var addressAccountApi= X_context.api + "addr/add";
    //        $http.post(addressAccountApi,{
    //
    //            id : $stateParams.addrId,
    //        })
    //            .success(function(data){
    //                var datas=data.data;
    //                //if(!datas[0])return;
    //
    //                $scope.user = datas[0].receiver;
    //                $scope.telphone = datas[0].mobile;
    //                $scope.detailArea = datas[0].addressFullname;
    //                addrId = datas[0].addrId;
    //
    //            })
    //}else{
            //var addressAccountApi = X_context.api + "addr/list";
            //$http.post(addressAccountApi,{
            //    id : $stateParams.addrId,
            //})
            //    .success(function(data){
            //        var datas=data.data;
            //        //if(!datas[0])return;
            //
            //        $scope.user = datas[0].receiver;
            //        $scope.telphone = datas[0].mobile;
            //        $scope.detailArea = datas[0].addressFullname;
            //        addrId = datas[0].addrId;
            //
            //    })

           var addressAccountApi= X_context.api + "addr/update";
            $http.post(addressAccountApi,{
               id: $stateParams.addrId,
            })
                .success(function(data){
                    //console.log(data.data);
                    var datas=data.data;
                    if(!datas[0])return;

                    $scope.user = datas[0].receiver;
                    $scope.telphone = datas[0].mobile;
                    $scope.detailArea = datas[0].addressFullname;
                    addrId = datas[0].addrId;


                })

    //}


    console.log("$stateParams",$stateParams.from && $stateParams.from.fromCart);

    $scope.goToCart = function(){
        console.log('click');
        if($stateParams.from && $stateParams.from.fromCart){
            $state.go('store.cart');
        }
    }


    $scope.editAddress = function(){
        $state.go('addressEdit',{from:{fromCart : $stateParams.from && $stateParams.from.fromCart},addrId:$stateParams.addrId});
    }

    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});