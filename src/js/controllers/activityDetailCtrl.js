"use strict";
angular.module('ZJSY_WeChat').controller('ActivityDetailController',function($scope,$state,$http,$stateParams,$sce,$rootScope,$q){
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

    $scope.enroll = {};


    $scope.showForm = false;
    var api = $stateParams.showSubmit ? 'activity/getActivityDetail' : 'info/getInfoDetail';

    if($stateParams.showSubmit){
        $scope.pageTitle = "活动详情"
    }

    //let memberPromise = Promise.resolve();
    let memberPromise = $q.resolve();
    if($scope.isAuth){
        $http.get(X_context.api + 'member/getCurMem')
            .success(function(data){
                $scope.user = data.data[0].nickName;
                $scope.userPhone = data.data[0].mobile;
            });
        memberPromise = $scope.$parent.memberPromise;
    }

    memberPromise.then(function(){
        $http.post(X_context.api + api,
            {
                activityId : $scope.activityId
            }).success(function(data){
                data = data.data[0];

                let createDate = data.createddate ? new Date(data.createddate) : new Date();
                let startDate = data.startdate ? new Date(data.startdate) : new Date();
                let endDate = data.enddate ? new Date(data.enddate) : new Date();
                if($stateParams.showSubmit){
                    $scope.pageTitle = "活动详情"
                }else{
                    $scope.pageTitle = data.type == 1 ? '园区资讯' : '企业秀';
                }

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
                if($scope.submitted){
                    $http.post(X_context.api + 'activity/listMyEnroll',
                        {
                            activityid : $scope.activityId
                        }).success(function(data){
                            data = data.data[0];
                            if(!data)return;
                            $scope.enrollId = data.enrollId;
                            $scope.enroll.price = data.paystatus == '1' ? ('￥'+data.payamount) : '未付款';
                            $scope.enroll.payType = parseInt(data.paytype);
                            $scope.enroll.name = data.username;
                            $scope.enroll.payStatus = parseInt(data.paystatus);
                            $scope.enroll.payed = !($scope.enroll.payType == 1 && $scope.enroll.payStatus == 0);
                            $scope.enroll.phone = data.mobile;
                            $scope.enroll.orderId = data.enrollId;
                            $scope.enroll.createDate = data.createddate;
                        });
                }
            });
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

    $scope.payAgain = function(){
        if($scope.posted || !$scope.enrollId)return;
        $scope.posted = true;
        $state.go('cardLogin',{from:{fromActivity : true,orderId : $scope.enrollId}});
    }
})