"use strict";
angular.module('ZJSY_WeChat').controller('MaintainController', function($rootScope,$http,$scope,$state){
    $scope.title="维修服务";
    //$scope.maintain={
    //    rent:"garden_fix",
    //    compyName:"动次打次",
    //    compyGuy:"曹操",
    //    guyTel:"18990976734",
    //    extraInfo:"宁我负天下人，勿天下人负我勿天下人负我！！！勿天下人负我！！！344444555555你是否会给哥噶；" +
    //    "给 i 火锅高跟344444555555你是否会给哥噶；给 i 火锅高跟！！！344444555555你是否会给哥噶；给 i 火锅高跟"
    //};


    $scope.maintain={
        rent:"garden_fix",
        _id:null
    }
    $scope.phoneReg=/^([0-9]{11})$/;

    $scope.goGardenOrder=function(){

        if(!$scope.maintain.rent){
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您需要的维修服务～'});
            return;
        }
        else if (!$scope.maintain.compyName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司名～'});
            return;
        }
        else if(!$scope.maintain.compyGuy) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入联系人姓名～'});
            return;
        }
        else if(!$scope.phoneReg.test($scope.maintain.guyTel)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入正确的11位手机号～'});
            return;

        }
        else{
            $scope.$parent.memberPromise.then(function(){
                $http.post(X_context.api+"servicesOrder/add", {
                    "memberid": X_context.memberId,
                    "company":$scope.maintain.compyName,
                    "contactor":$scope.maintain.compyGuy,
                    "mobile":$scope.maintain.guyTel,
                    "title":$scope.maintain.rent,
                    "note":$scope.maintain.extraInfo,
                    "_id" : $scope.maintain._id,

                })
                    .success(function (data){
                        console.log(data.data);
                        $state.go('serviceSucceed',{from:{fromOrder : true,orderId : data.data[0]._id}});

                    });

            });

        }



    }


})


