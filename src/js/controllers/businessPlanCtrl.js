"use strict";
angular.module('ZJSY_WeChat').controller('BusinessPlanController', function($rootScope,$scope,$stateParams,$http,$state){
    $scope.title="商务策划";

    $scope.typeList=[];
    $scope.childType = null;
    $scope.phoneReg=/^(1[0-9]{10})$/;
    var pattern = /^[-'a-z\u4e00-\u9eff]{1,40}$/i;
    var reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/;

    $http.post(X_context.api + "services/listServices", {
        "servicesId": 5
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
            compyGuy : data.data.data[0].nickName,
            guyTel : data.data.data[0].mobile
        }
    });

    $scope.goGardenOrder=function(){

        if(!$scope.childType){
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您需要的商务策划服务～'});
            return;
        }

        else if (!$scope.business.compyName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的公司名～'});
            return;
        }
        else if (!$scope.business.address) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的公司地址～'});
            return;
        }
        else if(!pattern.test($scope.business.compyGuy)||!$scope.business.compyGuy) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入联系人姓名，只能是中、英文字符～'});
            return;
        }
        else if(!$scope.phoneReg.test($scope.business.guyTel)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入正确的以1为开头的11位手机号～'});

            return;

        }
        //else if(!reg.test($scope.business.extraInfo)){
        //    $rootScope.$broadcast('alerts', {type: 'danger', message: '最后一项请输入中、英文字符～'});
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


