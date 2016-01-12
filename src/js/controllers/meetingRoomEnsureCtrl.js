"use strict";

angular.module('ZJSY_WeChat').controller('MeetingRoomEnsureController', function($rootScope,$http,$scope,$state,$stateParams){
    if(!$stateParams.meetingOrder ||
        !$stateParams.meetingOrder.date ||
        !$stateParams.meetingOrder.time ||
        !$stateParams.meetingOrder.room ||
        !$stateParams.meetingOrder.price){
        $state.go('meetingRoomOrder');
    }
    $scope.date = $stateParams.meetingOrder.date;
    $scope.time = $stateParams.meetingOrder.time;
    $scope.price = $stateParams.meetingOrder.price;
    $scope.room = $stateParams.meetingOrder.room;
    $scope._ = _;
    $scope.payMethod = 'cash';
    $scope.user = "";
    $scope.phone = "";
    $scope.company = "";
    $scope.memo = "";

    $scope.$parent.memberPromise.then(function(data){
            $scope.user = data.data.data[0].nickName;
            $scope.phone = data.data.data[0].mobile;
        });

    $scope.goEnsure = function(){
        $state.go('meetingRoomSucceed');
    }


})


