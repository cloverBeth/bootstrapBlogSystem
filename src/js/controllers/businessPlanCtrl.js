"use strict";
angular.module("ZJSY_WeChat").controller('BusinessPlanController',function($scope,$rootScope,$http,$state){
    $scope.title="商务策划";
    $scope.childType = 19;

    $scope.goGardenOrder=function() {

        if (!$scope.childType) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您需要的商务策划服务～'});
            return;
        }

        else if (!$scope.garden.compyName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司名～'});
            return;
        }
        else if (!$scope.garden.compyGuy) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入联系人姓名～'});
            return;
        }
        else if (!$scope.phoneReg.test($scope.garden.guyTel)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入正确的11位手机号～'});
            return;

        }
    }

})