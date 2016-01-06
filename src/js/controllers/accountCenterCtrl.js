"use strict";
angular.module('ZJSY_WeChat').controller('AccountCenterController',function($scope,$state,$http){
    console.log('X_context.memberPhone',X_context.memberPhone);
    if($scope.$parent.memberPromise){
        $scope.$parent.memberPromise.then(function(){
            $scope.account={
                title : '我的中心',
                tel : X_context.memberPhone,
                //contact : '021-12345678',
                payWay : '一卡通'
            };
        })
    }else{
        $scope.account={
            title : '我的中心',
            tel : X_context.memberPhone,
            contact : '021-12345678',
            payWay : '一卡通'
        };
    }


    $scope.upload = function (files) {
        if(!files[0])return;
        var file = files[0];
        Upload.upload({
            url: '/api/'+X_context.ver + '/member/uploadAvatar',
            file: file
        }).progress(function (evt) {

        }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            $rootScope.$broadcast('avatarChange');
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    }


    $scope.signOut = function(){
        console.log('here,logout');
        X_context.authorization = X_context.guest;
        eraseCookie('authorization');
        $state.go('store.product',{storeId:X_context.storeId});
    }
    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }
});