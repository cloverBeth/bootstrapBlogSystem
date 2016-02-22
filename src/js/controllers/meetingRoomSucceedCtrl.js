"use strict";
angular.module("ZJSY_WeChat").controller("MeetingRoomSucceedController",function($scope,$state,$http,$stateParams){

    $scope.orderId = $stateParams.orderId;
    $scope.success = true;
    $scope.cashPay="";


    $scope.$parent.memberPromise.then(function(){
        $http.post(X_context.api+"meeting/listMemberOrder", {
            "memberId" : X_context.memberId,
            "orderId" : $scope.orderId
        }).success(function (data){
            if(!data.data){return;}
            $scope.cashPay=data.data[0].payType;//现金支付
            if($scope.cashPay=="true"){
                $scope.title = "预约成功";
                $scope.cashPay=false;


            }
            else{
                $scope.title = "下单成功";
                $scope.cashPay=true;

            }

            $scope.orderNumber = data.data[0].orderSn;
            $scope.expense = data.data[0].payAmount;
            $scope.payway = data.data[0].payType;

            if($scope.payway == "false" && data.data[0].payStatus == "false"){
                $scope.success = false;
                $scope.title = "下单失败";
            }
        });


        $http.post(X_context.api + "meeting/listRooms", {

        }).success(function(data){
            $scope.telphone = data.data[0].mobile;
        });

    });


    $scope.goToList=function(){
        $state.go('meetingRoomList');
    }

    $scope.goToPay=function(){
        $state.go('cardLogin',{from:{fromMeeting : true,orderId : $scope.orderId}});
    }

})
