"use strict";
angular.module('ZJSY_WeChat').controller('CardLoginController',function($scope,$interval,$http,$stateParams,$state,$rootScope){

    $scope.fromOrder = $stateParams.from && $stateParams.from.fromOrder;
    $scope.orderId = $stateParams.from && $stateParams.from.orderId;

    $scope.fromGetLeft = $stateParams.from && $stateParams.from.getLeft;

    $scope.getModal = false;
    $scope.getErrorModal = false;

    $scope.showEdit = false;
    $scope.showLeftSec = false;

    $scope.card = {
        title: '一卡通',
        num : "",
        pwd : null,
        getPwd : null
    };
    $scope.originNo = "";

    $scope.payModal = false;

    var posted = false;
    $scope.payPosted = false;
    $scope.getPosted = false;

    $scope.editCard = function($event){
        $event.stopPropagation();
        $scope.showEdit = true;
    }

    $scope.cancelModal = false;




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
                setTimeout(function(){$('#pay_input').focus();},100);
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

    $scope.cancelBind = function(){
        if($scope.fromOrder)return;
        $http.post(X_context.api + "member/updateCard",{
            memberId : X_context.memberId,
            cardNo : " "
        }).success(function(data){
            $state.go($state.current, $stateParams, {reload: true, inherit: false});
        })
    }

    $scope.pay = function(){
        if($scope.payPosted == true)return;
        if(!$scope.card.pwd || !$scope.card.num || !$scope.orderId)return;
        $scope.payPosted = true;
        $("#paying").html("支付中...");
        $http.post(X_context.api + 'pay/consume',{
            "orderId" : $scope.orderId,
            "memberCard" : $scope.card.num,
            "passwd" : $scope.card.pwd
        }).success(function(data){
            $scope.payModal = false;
            $scope.$parent.cart.products = [];
            $scope.showEdit = false;
            $scope.payPosted = false;
            $state.go('orderSucceed',{orderId:$scope.orderId});
        });
    }

    $scope.getLeft = function(){
        if($scope.getPosted == true)return;
        if(!$scope.card.getPwd || !$scope.card.num)return;
        $scope.getPosted = true;
        $("#card_geting").html("查询中...");
        $http.post(X_context.api + 'pay/balance',{
            "memberCard" : $scope.card.num,
            "passwd" : $scope.card.pwd
        }).success(function(data){
            console.log(data)
            $scope.getModal = false;
            $scope.showEdit = false;
            $scope.getPosted = false;
            $scope.card.getPwd = null;
            if(data.data && data.data.payAmount != undefined){
                $rootScope.$broadcast('hideAlerts');
                $scope.showLeftSec = true;
                $scope.left = data.data.payAmount;
            }else{
                $rootScope.$broadcast('hideAlerts');
                $scope.getErrorModal = true;

            }
        });
    };

    $scope.goBack = function(){
        location.href="javascript:window.history.back();";
    }

    $http.get(X_context.api + 'member/getCurMem').success(function(data){
        $scope.card.num = data.data[0].allincardNo;
        $scope.originNo = data.data[0].allincardNo;
    });
});
