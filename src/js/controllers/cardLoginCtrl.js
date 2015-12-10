"use strict";
angular.module('ZJSY_WeChat').controller('CardLoginController',function($scope,$interval,$http,$stateParams,$state){

    $scope.fromOrder = $stateParams.from && $stateParams.from.fromOrder;

    $scope.showEdit = false;
    $scope.card = {
        title: '一卡通',
        num : "11133322313",
        pwd : ""
    };

    var posted = false;

    $scope.editCard = function($event){
        $event.stopPropagation();
        $scope.showEdit = true;
    }



    $scope.goIndex=function(){
        $state.go('store.product');
    }


    $scope.getEnSure=function(){
        if($scope.card.num == null || $scope.card.pwd ==null)return;
        if(posted == true)return;
        posted = true;

        if(!$scope.showEdit && $scope.fromOrder){
            console.log($stateParams.from.orderId);
            $state.go('orderSucceed');
        }else{

        }
        $scope.showEdit = false;
        posted = false;
    }
});
