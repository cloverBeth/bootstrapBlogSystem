"use strict";
angular.module("ZJSY_WeChat").controller("MeetingRoomSucceedController",function($scope,$state,$http,$stateParams){
    $scope.title="下单成功";
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.orderSucceed={
        //type:"会议室预订",
        //status:"支付成功",
        //orderNumber:"201976875613623",
        //expense:"300",
        //payway:"线下支付",
        //telphone:"1796733266"
    }


    $http.post(X_context.api+"servicesOrder/list", {
        "memberid": X_context.memberId,
             "_id": $stateParams.orderId,
             page : $scope.currentPage,
          pageSize: $scope.pageSize,
    }).success(function (data){

        if(!data.data){return;}
        $scope.orderSucceed.type=data.data.result[0].services.parentTitle;
        $scope.orderSucceed.orderNumber=data.data.result[0].ordersn;
        $scope.orderSucceed.status=data.data.result[0].paystatus;
        $scope.orderSucceed.payway=data.data.result[0].paytype;
        $scope.orderSucceed.telphone=data.data.result[0].services.mobile;

        //
        //if(!data.data[0]){return;}
        //$scope.orderSucceed.type=data.data[0].services.parentTitle;
        //$scope.orderSucceed.orderNumber=data.data[0].ordersn;
        //$scope.orderSucceed.status=data.data[0].orderstatus;
    });

    $scope.goToMeetingOrder=function(){
        $state.go('meetingRoomList');
    }

})
