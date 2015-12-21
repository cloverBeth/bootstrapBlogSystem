"use strict";
angular.module('ZJSY_WeChat').controller('StoreCartController',function($scope,$http,$stateParams,$state){
    $scope.$parent.title = "购物车";

    $scope.cart = $scope.$parent.$parent.cart;
    $scope.storecart={

    }


    //$scope.username = "陈冠希";
    //$scope.phone = "13232311009";
    //$scope.address = "香港XX摄影工作室";
    $scope.$parent.memberPromise.then(function () {
        $http.post(X_context.api + "addr/list", {
            memberId: X_context.memberId,
            addrId:$stateParams.addrId,
        })
            .success(function (data) {
                var datas = data.data;
                $scope.storecart.id=datas[0].id;
                $scope.storecart.username = datas[0].receiver;
                $scope.storecart.phone = datas[0].mobile;
                $scope.storecart.address = datas[0].addressFullname;
            })
    });

    $scope.mainHeight = $('body').css('height').split('px')[0] -
        $('header').css('height').split('px')[0];


    $scope.selectAddress = function(){
        $state.go('addressAccount',{from:{fromCart : true}});
    }
});