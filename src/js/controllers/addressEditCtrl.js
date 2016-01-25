"use strict";
angular.module('ZJSY_WeChat').controller('AddressEditController',function($rootScope,$scope,$stateParams,$http,$state){
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



    console.log("$stateParams",$stateParams.from && $stateParams.from.fromCart);
    $scope.goBack = function() {
        if ($stateParams.from && $stateParams.from.fromCart) {
            return $state.go('store.cart');
        } else {
            window.history.back();
        }

    }

    var pattern = /^[-'a-z0-9\u4e00-\u9eff]{2,40}$/i;
    $scope.phoneReg=/^(1[0-9]{10})$/;
    $scope.update=function(){

        if(!$scope.phoneReg.test($scope.telphone)){
            $rootScope.$broadcast('alerts',{type:'danger',message:'亲，请输入正确的以1为开头的11位手机号～'});
            return;

        }else if(!pattern.test($scope.user)){
            $rootScope.$broadcast('alerts',{type:'danger',message:'亲，请输入您的收货人姓名，只能是中、英文字符'});
            return;
        }else if(!$scope.detailArea){
            $rootScope.$broadcast('alerts',{type:'danger',message:'亲，请输入您的收货地址'});
            return;
        }

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



    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});