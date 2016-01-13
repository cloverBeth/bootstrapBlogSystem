"use strict";
angular.module('ZJSY_WeChat').controller('ParkingController', function($rootScope,$http,$scope,$state){
    $scope.title="车位申请";
    //$scope.parking={
    //    rent:"garden_buy",
    //    compyName:"动次打次",
    //    compyGuy:"曹操",
    //    guyTel:"18990976734",
    //    extraInfo:"宁我负天下人，勿天下人负我！！！"
    //};

    $scope.phoneReg=/^([0-9]{11})$/;

    $scope.goGardenOrder=function() {

        if (!$scope.parking.compyName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司名～'});
            return;
        }
        else if (!$scope.parking.compyGuy) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入联系人姓名～'});
            return;
        }
        else if (!$scope.phoneReg.test($scope.parking.guyTel)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入正确的11位手机号～'});
            return;

        }
        else {
            $scope.$parent.memberPromise.then(function () {
                $http.post(X_context.api + "servicesOrder/add", {
                    "memberid": X_context.memberId,
                    "company": $scope.parking.compyName,
                    "contactor": $scope.parking.compyGuy,
                    "mobile": $scope.parking.guyTel,
                    "note": $scope.parking.extraInfo
                })
                    .success(function (data) {
                        console.log(data.data);
                        $state.go('serviceSucceed');

                    });

            });

        }

    }


});




