"use strict";
angular.module("ZJSY_WeChat").controller("ActivityEnrollSucceedController",function($scope,$state,$http,$stateParams){

    $scope.orderId = $stateParams.orderId;

    let enrollPromise = $http.post(X_context.api + 'activity/listMyEnroll',{
        "page":1,
        "pageSize":5,
        "enrollId" : $scope.orderId
    }).success(function(data){
        data = data.data[0];
        $scope.activityid = data.activityid;

        $scope.success = true;
        $scope.cost = false;

        if(data.paytype == 1 || data.paytype == 3){
            $scope.cost = true;
        }

        if((data.paytype == 1 || data.paytype == 3)
            && data.enrollstatus == 0){
            $scope.success = false;
        }
        $scope.orderSucceed={
            orderNumber : data.enrollId,
            expense : data.payamount,
            payway : data.paytype==1 ? "一卡通" : (data.paytype==3 ? "积分" : "无")
        }
        if($scope.success){
            $scope.title="活动预订成功";
        }else{
            $scope.title="活动预订失败";
        }

    });

    enrollPromise.then(function(){
        $http.post(X_context.api + 'activity/listAll',{
            "page" : 1,
            "pageSize" : 5,
            "activityId" : $scope.activityid
        }).success(function(data){
            $scope.orderSucceed.telphone = data.data[0].mobile;
        })
    });

    $scope.goToList=function(){
        $state.go('allActivity');
    }

    $scope.goToPay = function(){
        if(!$scope.success && $scope.orderSucceed.payway == '一卡通'){
            $state.go('cardLogin',{from:{fromActivity : true,orderId : $scope.orderId}});
        }
    }

});
