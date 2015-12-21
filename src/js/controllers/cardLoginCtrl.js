"use strict";
angular.module('ZJSY_WeChat').controller('CardLoginController',function($scope,$interval,$http,$stateParams,$state){

    $scope.fromOrder = $stateParams.from && $stateParams.from.fromOrder;
    $scope.orderId = $stateParams.from && $stateParams.from.orderId;


    $scope.showEdit = false;
    $scope.card = {
        title: '一卡通',
        num : "",
        pwd : ""
    };
    $scope.originNo = "";

    $scope.payModal = false;

    var posted = false;
    var payPosted = false;

    $scope.editCard = function($event){
        $event.stopPropagation();
        $scope.showEdit = true;
    }




    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }




    $scope.getEnSure=function(){
        if(!$scope.card.num){alert('请您先绑定卡号～');return};
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

    $scope.pay = function(){
        if(payPosted == true)return;
        payPosted = true;
        if(!$scope.card.pwd || !$scope.card.num || !$scope.orderId)return;
        $http.post(X_context.api + 'pay/consume',{
            "orderId" : $scope.orderId,
            "memberCard" : $scope.card.num,
            "passwd" : $scope.card.pwd
        }).success(function(data){
            $scope.payModal = false;
            $scope.$parent.cart.products = [];
            $scope.showEdit = false;
            payPosted = false;
            $state.go('orderSucceed',{orderId:$scope.orderId});
        }).error(function(data){
            $scope.payModal = false;
            payPosted = false;
            $state.go('orderSucceed',{orderId:$scope.orderId});
        });
    }

    $http.get(X_context.api + 'member/getCurMem').success(function(data){
        $scope.card.num = data.data[0].allincardNo;
        $scope.originNo = data.data[0].allincardNo;
    });
});
