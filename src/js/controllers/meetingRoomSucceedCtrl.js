"use strict";
angular.module("ZJSY_WeChat").controller("MeetingRoomSucceedController",function($scope,$state,$http,$stateParams){

    $scope.orderId = $stateParams.orderId;
    $scope.success = true;
    $scope.cashPay="";


    $scope.$parent.memberPromise.then(function(){
        $http.post(X_context.api+"meeting/listMemberOrder", {
            "memberid" : X_context.memberId,
            "orderid" : $scope.orderId
        }).success(function (data){
            if(!data.data){return;}
            $scope.cashPay=data.data[0].paytype;//现金支付
            if($scope.cashPay=="true"){
                $scope.title = "预约成功";
                $scope.cashPay=false;


            }
            else{
                $scope.title = "下单成功";
                $scope.cashPay=true;

            }
            $scope.orderNumber = data.data[0].ordersn;
            $scope.expense = data.data[0].payamount;
            $scope.payway = data.data[0].paytype;

            if($scope.payway == "false" && data.data[0].paystatus == "false"){
                $scope.success = false;
                $scope.title = "下单失败";
            }
        });

        setTimeout(function(){
            $http.post(X_context.api + "meeting/listRooms",
                {
                    "page" : "1",
                    "pageSize" : "1",
                }).success(function(data){
                    $scope.telphone = data.data[0].mobile;
                });
        },1000)

    });




    $scope.goToList=function(){
        $state.go('meetingRoomList');
    }

    $scope.goToPay=function(){
        $state.go('cardLogin',{from:{fromMeeting : true,orderId : $scope.orderId}});
    }

})
