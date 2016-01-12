"use strict";
angular.module('ZJSY_WeChat').controller('WaterSendController', function($rootScope,$scope,$stateParams,$http,$state){
    $scope.title="送水服务";
    //$scope.garden={
    //    rent:"garden_order",
    //    compyName:"西游记",
    //    compyGuy:"南天门",
    //    guyTel:"18750976734",
    //    extraInfo:"大师兄，师傅被妖怪抓走了！！！"
    //};

    $scope.phoneReg=/^([0-9]{11})$/;

    $scope.goGardenOrder=function(){

        if (!$scope.garden.compyName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司名～'});
            return;
        }
        else if(!$scope.garden.compyGuy) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入联系人姓名～'});
            return;
        }
        else if(!$scope.phoneReg.test($scope.garden.guyTel)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入正确的11位手机号～'});
            return;

        }
        else{
            $scope.$parent.memberPromise.then(function(){
                $http.post(X_context.api+"servicesOrder/add", {
                    "memberid": X_context.memberId,
                    "company":$scope.garden.compyName,
                    "contactor":$scope.garden.compyGuy,
                    "mobile":$scope.garden.guyTel,
                    "note":$scope.garden.extraInfo
                })
                    .success(function (data){
                        console.log(data.data);
                        $state.go('serviceSucceed');

                    });

            });

        }



    }








})


