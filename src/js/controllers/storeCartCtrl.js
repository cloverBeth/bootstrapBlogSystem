"use strict";
angular.module('ZJSY_WeChat').controller('StoreCartController',function($scope,$http,$stateParams,$state){


    $scope.cart = $scope.$parent.$parent.cart;
    $scope.storecart={

    }

    $scope.$parent.memberPromise.then(function () {
        $http.post(X_context.api + "addr/list", {
            memberId: X_context.memberId,
            addrId:$stateParams.addrId,
        })
            .success(function (data) {
                var datas = data.data;
                if(!datas[0])return;
                $scope.storecart.id=datas[0].id;
                $scope.storecart.username = datas[0].receiver;
                $scope.storecart.phone = datas[0].mobile;
                $scope.storecart.address = datas[0].addressFullname;
                $scope.$emit('addressGet',{
                    username : $scope.storecart.username,
                    phone : $scope.storecart.phone,
                    address : $scope.storecart.address
                });
                $scope.$parent.title = "购物车";
            })
    });

    $scope.mainHeight = $('body').css('height').split('px')[0] -
        $('header').css('height').split('px')[0];


    $scope.selectAddress = function(){
        $state.go('addressAccount',{from:{fromCart : true}});
    }
});