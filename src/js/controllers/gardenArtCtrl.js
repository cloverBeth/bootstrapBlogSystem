"use strict";
angular.module('ZJSY_WeChat').controller('GardenArtController', function($rootScope,$scope,$stateParams,$http,$state){
    $scope.title="园艺服务";
    //$scope.garden={
    //    rent:"garden_cut",
    //    compyName:"动次打次",
    //    compyGuy:"曹操",
    //    guyTel:"18990976734",
    //    extraInfo:"宁我负天下人，勿天下人负我！！！"
    //};

    $scope.garden={
        _id:null,
        rent:"garden_cut"
    }

    $scope.phoneReg=/^([0-9]{11})$/;


    $scope.goGardenOrder=function(){
        if(!$scope.garden.rent){
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司名～'});
            return;
        }
        else if (!$scope.garden.compyName) {
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
                    "note":$scope.garden.extraInfo,
                    "title":$scope.garden.rent,
                    "_id" : $scope.garden._id

                })
                    .success(function (data){
                        console.log(data.data);
                        $state.go('serviceSucceed',{from:{fromOrder : true,orderId : data.data[0]._id}});

                    });

            });

        }



    }


})


