"use strict";
angular.module('ZJSY_WeChat').controller('ActivityDetailController',function($scope,$state,$http,$stateParams,$sce,$rootScope){
    $scope.activityId = $stateParams.activityId;
    $scope.showSubmit = $stateParams.showSubmit;

    $scope.title = "";
    $scope.date = "";
    $scope.period = "";
    $scope.location = "";
    $scope.mobile = "";
    $scope.endDate = "";
    $scope.embedHtml = $sce.trustAsHtml('');
    $scope.isAuth = $stateParams.isAuth;

    $scope.user = "";
    $scope.userPhone = null;
    $scope.memo = "";
    $scope.price = "";
    $scope.payType = "";


    $scope.showForm = false;
    var api = $stateParams.showSubmit ? 'activity/getActivityDetail' : 'info/getInfoDetail'

    $http.post(X_context.api + api,
        {
            activityId : $scope.activityId
        }).success(function(data){
            data = data.data[0];

            let createDate = data.createddate ? new Date(data.createddate) : new Date();
            let startDate = data.startdate ? new Date(data.startdate) : new Date();
            let endDate = data.enddate ? new Date(data.enddate) : new Date();

            $scope.endDate = data.enddate;
            $scope.expried = $scope.endDate < Date.now();
            $scope.title = data.title;
            $scope.submitted = $scope.isAuth && data.memberId == X_context.memberId;
            $scope.date = `${createDate.getFullYear()}-${createDate.getMonth()+1}-${createDate.getDate()}`;
            $scope.period = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()} 到 ${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;
            $scope.location = data.location;
            $scope.mobile = data.mobile;
            $scope.embedHtml = $sce.trustAsHtml(data.content);
            $scope.payType = data.paytype;
            $scope.price = $scope.payType==1 ? data.price : data.point;
        });

    $scope.$parent.memberPromise.then(function(data){
        $scope.user = data.data.data[0].nickName;
        $scope.userPhone = data.data.data[0].mobile;
    });

    $scope.goSubmit = function(){
        if(!$scope.isAuth){
            $state.go('login');
        }
        $scope.showForm = true;
    };
    $scope.posted = false;

    $scope.submitActivity = function(){
        if($scope.posted)return;
        $scope.posted = true;

        if(!$scope.user || !$scope.userPhone){
            $rootScope.$broadcast('alerts',{type:'danger',message:"请完整填写。"});
            return;
        }
        $http.post(X_context.api + 'activity/enroll',
            {
                "activityid" : $scope.activityId,
                "username" : $scope.user,
                "mobile" : $scope.userPhone,
                "paytype" : $scope.payType || 0,
                "note" : $scope.memo
            }).success(function(data){
                if($scope.payType == 1){
                    $state.go('cardLogin',{from:{fromActivity : true,orderId : data.data[0].enrollId}});
                }else{
                    $state.go('activityEnrollSucceed',{orderId : data.data[0].enrollId})
                }
            });
    }
})