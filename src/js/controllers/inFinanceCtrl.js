"use strict";
angular.module('ZJSY_WeChat').controller('InFinanceController', function($rootScope,$scope,$stateParams,$http,$state){
    $scope.title="投融资";

    $scope.typeList=[];
    $scope.childType = null;
    $scope.phoneReg=/^(1[0-9]{10})$/;
    var pattern = /^[-'a-z\u4e00-\u9eff]{1,40}$/i;
    var reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|\s)+/;


    $http.post(X_context.api + "services/listServices", {
        "servicesId": 7
    })
        .success(function (data) {
            $scope.childType = data.data[0]._id;
            for (var i in data.data) {
                var radio = {
                    "id": data.data[i]._id,
                    "typeTitle": data.data[i].title,
                };

                $scope.typeList.push(radio)

            }

        });
    $scope.$parent.memberPromise.then(function(data){
        $scope.business={
            guyTel : data.data.data[0].mobile,
            compyGuy : data.data.data[0].nickName
        }
    });

    $scope.goGardenOrder=function(){

        if(!$scope.childType){
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您需要的投融资服务～'});
            return;
        }else if (!reg.test($scope.business.compyName)||!$scope.business.compyName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的公司名～'});
            return;
        }
        else if (!$scope.business.address) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的公司地址～'});
            return;
        }else if(!pattern.test($scope.business.compyGuy)||!$scope.business.compyGuy) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入联系人姓名，只能是中、英文字符～'});
            return;
        }else if(!$scope.business.proName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的项目名～'});
            return;
        }else if(!$scope.phoneReg.test($scope.business.guyTel)||!$scope.business.guyTel) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入正确的11位手机号～'});
            return;

        }else if(!$scope.business.extraInfo){
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的项目介绍～'});
            return;
        }
        //else if(!reg.test($scope.business.extraInfo)){
        //    $rootScope.$broadcast('alerts', {type: 'danger', message: '最后一项请输入中、英文、数字字符～'});
        //    return;
        //}
        else{

            $http.post(X_context.api+"servicesOrder/add", {
                "memberid" : X_context.memberId,
                 "company" : $scope.business.compyName,
               "contactor" : $scope.business.compyGuy,
                  "mobile" : $scope.business.guyTel,
                    "note" : $scope.business.extraInfo,
               "serviceId" : $scope.childType,
                 "project" : $scope.business.proName,
                 "address" : $scope.business.address
            })
                .success(function(data){
                    if(data.code==200){
                        $state.go('serviceSucceed',{serviceOrderId:data.data[0]._id});
                        $scope.orderSure=true;//如何避免重复订单？？？？？
                    }
                    else{
                        $state.go('serviceFailed',{serviceOrderId:data.data[0]._id});
                    }
                })


        }


    }


})


