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
    //$scope.user = "";
    //$scope.phone = "";
    //$scope.company = "";
    //$scope.memo = "";

    $scope.$parent.memberPromise.then(function(data){
        $scope.user = data.data.data[0].nickName;
        $scope.phone = data.data.data[0].mobile;
    });

    $scope.goEnsure = function(){
        if(!$scope.user || !$scope.phone || !$scope.company){
            $rootScope.$broadcast('alerts',{type:'danger',message:"请完整填写."});
            return;
        }
        $http.post(X_context.api + 'meeting/rentRoom',
            {
                roomid : $scope.room.id,
                meetingdate : `${$scope.date.getFullYear()}-${$scope.date.getMonth()+1}-${$scope.date.getDate()}`,
                meetingtime : _.pluck($scope.time,'name').join(','),
                memberid : X_context.memberId,
                contact : $scope.user,
                remark : $scope.memo,
                mobile : $scope.phone,
                company : $scope.company,
                paytype : false

            }).success(function(data){
                $state.go('meetingRoomSucceed',{orderId:data.data[0].orderId});

            })
    };

    $scope.goEnsureAndPay = function(){
        if(!$scope.user || !$scope.phone || !$scope.company){
            $rootScope.$broadcast('alerts',{type:'danger',message:"请完整填写."});
            return;
        }
        $http.post(X_context.api + 'meeting/rentRoom',
            {
                roomid : $scope.room.id,
                meetingdate : `${$scope.date.getFullYear()}-${$scope.date.getMonth()+1}-${$scope.date.getDate()}`,
                meetingtime : _.pluck($scope.time,'name').join(','),
                memberid : X_context.memberId,
                contact : $scope.user,
                remark : $scope.memo,
                mobile : $scope.phone,
                company : $scope.company,
                paytype : true
            }).success(function(data){
                $state.go('cardLogin',{from:{fromMeeting : true,orderId : data.data[0].orderId}});
            })
    }
})