"use strict";
angular.module('ZJSY_WeChat').controller('GardenArtController', function($rootScope,$scope,$state){
    $scope.title="园艺服务";
    $scope.garden={
        rent:"garden_cut",
        compyName:"动次打次",
        compyGuy:"曹操",
        guyTel:"18990976734",
        extraInfo:"宁我负天下人，勿天下人负我！！！"
    };



    $scope.phoneReg=/^([0-9]{11})$/;
    $scope.gardenOrder=function() {

        if (!$scope.garden.compyName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司名～'});
            $scope.cancelModal=false;
            return;
        }
        else if(!$scope.garden.compyGuy) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入联系人姓名～'});
            $scope.cancelModal=false;
            return;
        }
        else if(!$scope.phoneReg.test($scope.garden.guyTel)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入正确的11位手机号～'});
            $scope.cancelModal=false;
            return;

        }
        else{
              $scope.cancelModal=true;

        }

    }
    $scope.goGardenOrder=function(){
        $state.transitionTo('serviceSucceed');
    }


})


