"use strict";
angular.module("ZJSY_WeChat").controller("MeetingRoomSucceedController",function($scope,$state,$http,$stateParams){
    $scope.title="下单成功";
    $scope.orderSucceed={
        //type:"会议室预订",
        //status:"支付成功",
        //orderNumber:"201976875613623",
        //expense:"300",
        //payway:"线下支付",
        //telphone:"1796733266"
    }


    $http.post(X_context.api+"meeting/listMemberOrder", {
        "memberid" : X_context.memberId,
         "orderid" : $stateParams.orderId
    }).success(function (data){

        if(!data.data){return;}
        $scope.orderSucceed.type=data.data[0].roomid;
        $scope.orderSucceed.orderNumber=data.data[0].ordersn;
        $scope.orderSucceed.status=data.data[0].paystatus;
        $scope.orderSucceed.payway=data.data[0].paytype;
        $scope.orderSucceed.expense=data.data[0].payamount;
        $scope.orderSucceed.telphone=data.data[0].mobile;
    });

    $scope.goToMeetingOrder=function(){
        $state.go('meetingRoomList');
    }

})
