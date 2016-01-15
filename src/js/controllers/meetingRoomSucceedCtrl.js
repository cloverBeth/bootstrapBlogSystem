"use strict";
angular.module("ZJSY_WeChat").controller("MeetingRoomSucceedController",function($scope,$state,$http,$stateParams){
    $scope.title="下单成功";
    $scope.orderSucceed={
        type:"会议室预订",
        status:"支付成功",
        orderNumber:"201976875613623",
        expense:"300",
        payway:"线下支付",
        telphone:"1796733266"
    }


    $scope.goToMeetingOrder=function(){
        $state.go('meetingRoomList');
    }

})
