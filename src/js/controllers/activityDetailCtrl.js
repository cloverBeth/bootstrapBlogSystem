"use strict";
angular.module('ZJSY_WeChat').controller('ActivityDetailController',function($scope,$state,$http,$stateParams,$sce){
    $scope.activityId = $stateParams.activityId;

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
    $scope.payMethod = "";


    $scope.showForm = false;

    $http.post(X_context.api + 'activity/getActivityDetail',
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
        });

    $scope.goSubmit = function(){
        console.log($scope.isAuth)
        if(!$scope.isAuth){
            $state.go('login');
        }
        $scope.showForm = true;
    }
})