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


    $scope.phoneReg=/^([0-9]{11})$/;
    $scope.update=function(){

        if($scope.telphone!=null && $scope.phoneReg.test($scope.telphone)){

        }else if(!$scope.user){$rootScope.$broadcast('alerts',{type:'danger',message:'亲，请输入收货人姓名哦～'});
            return;}
        else if(!$scope.detailArea){$rootScope.$broadcast('alerts',{type:'danger',message:'亲，请输入收货地址～'});
            return;}
        else{
            $rootScope.$broadcast('alerts',{type:'danger',message:'亲，请输入正确的手机号撒～'});
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