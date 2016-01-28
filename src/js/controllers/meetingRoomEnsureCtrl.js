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

    $scope.$parent.memberPromise.then(function(data){
        $scope.user = data.data.data[0].nickName;
        $scope.phone = data.data.data[0].mobile;
    });


    $scope.phoneReg=/^(1[0-9]{10})$/;
    var pattern = /^[-'a-z\u4e00-\u9eff]{2,40}$/i;
    var reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/;

    $scope.goEnsure = function(){
        if(!$scope.phoneReg.test($scope.phone)||!$scope.phone){
            $rootScope.$broadcast('alerts',{type:'danger',message:"请填写正确格式的11位手机号码."});
            return;
        }else if(!pattern.test($scope.user)||!$scope.user){
            $rootScope.$broadcast('alerts',{type:'danger',message:"请填写正确格式的联系人，只能是中文或者英文."});
            return;
        }else if(!$scope.company){
            $rootScope.$broadcast('alerts',{type:'danger',message:"请填写公司名称."});
            return;
        }
        //else if(!reg.test($scope.memo)){
        //    $rootScope.$broadcast('alerts',{type:'danger',message:"请填写正确格式的备注信息，只能是中文或者英文."});
        //    return;
        //}
        //if(!$scope.user || !$scope.phone || !$scope.company){
        //    $rootScope.$broadcast('alerts',{type:'danger',message:"请完整填写."});
        //    return;
        //}
        $http.post(X_context.api + 'meeting/rentRoom',
            {
                roomid : $scope.room.id,
                meetingdate : `${$scope.date.getFullYear()}-${$scope.date.getMonth()+1}-${$scope.date.getDate()}`,
            meetingtime : _.pluck($scope.time,'id').join(','),
            memberid : X_context.memberId,
            contact : $scope.user,
            remark : $scope.memo,
            mobile : $scope.phone,
            company : $scope.company,
            paytype : true

    }).success(function(data){
        $state.go('meetingRoomSucceed',{orderId:data.data[0].orderId});

    })
};

    $scope.goEnsureAndPay = function(){
        $scope.phoneReg=/^(1[0-9]{10})$/;
        var pattern = /^[-'a-z\u4e00-\u9eff]{1,40}$/i;
        var reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/;
        if(!$scope.phoneReg.test($scope.phone)||!$scope.phone){
            $('#meetingRelate').focus();
            $rootScope.$broadcast('alerts',{type:'danger',message:"请填写正确格式的11位手机号码."});
            return;
        }else if(!pattern.test($scope.user)||!$scope.user){
            $('#meetingMan').focus();
            $rootScope.$broadcast('alerts',{type:'danger',message:"请填写正确格式的联系人，只能是中文或者英文."});
            return;
        }else if(!$scope.company){
            $('#meetingCompy').focus();
            $rootScope.$broadcast('alerts',{type:'danger',message:"请填写公司名称."});
            return;
        }
        //if(!reg.test($scope.memo)){
        //    $rootScope.$broadcast('alerts',{type:'danger',message:"请填写正确格式的备注信息，只能是中文或者英文."});
        //    return;
        //}
        //if(!$scope.user || !$scope.phone || !$scope.company){
        //    $rootScope.$broadcast('alerts',{type:'danger',message:"请完整填写."});
        //    return;
        //}
        $http.post(X_context.api + 'meeting/rentRoom',
            {
                roomid : $scope.room.id,
                meetingdate : `${$scope.date.getFullYear()}-${$scope.date.getMonth()+1}-${$scope.date.getDate()}`,
        meetingtime : _.pluck($scope.time,'id').join(','),
            memberid : X_context.memberId,
            contact : $scope.user,
            remark : $scope.memo,
            mobile : $scope.phone,
            company : $scope.company,
            paytype : false

    }).success(function(data){
        $state.go('cardLogin',{from:{fromMeeting : true,orderId : data.data[0].orderId}});
        })
    }
})