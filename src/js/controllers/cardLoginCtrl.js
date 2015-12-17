"use strict";
angular.module('ZJSY_WeChat').controller('CardLoginController',function($scope,$interval,$http,$stateParams,$state){

    $scope.fromOrder = $stateParams.from && $stateParams.from.fromOrder;

    $scope.showEdit = false;
    $scope.card = {
        title: '一卡通',
        num : "",
        pwd : ""
    };
    $scope.originNo = "";

    $scope.payModal = false;

    var posted = false;

    $scope.editCard = function($event){
        $event.stopPropagation();
        $scope.showEdit = true;
    }




    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }


    $scope.getEnSure=function(){
        if($scope.card.num == null || $scope.card.pwd ==null)return;
        if(posted == true)return;
        posted = true;

        if(!$scope.showEdit ){
            if($scope.fromOrder){
                console.log($stateParams.from.orderId);
                $scope.payModal = true;
                //$state.go('orderSucceed');
                $scope.showEdit = false;
                posted = false;
            }else{
                $scope.showEdit = false;
                posted = false;
            }
        }else{
            if($scope.card.num != $scope.originNo){
                $http.post(X_context.api + "member/updateCard",{
                    memberId : X_context.memberId,
                    cardNo : $scope.card.num
                }).success(function(data){
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});
                    $scope.showEdit = false;
                    posted = false;
                })
            }
            $scope.showEdit = false;
            posted = false;
        }
    }

    $scope.$parent.memberPromise.then(function(data){
        $scope.card.num = data.data.data[0].allincardNo;
        $scope.originNo = data.data.data[0].allincardNo;
    });
});
