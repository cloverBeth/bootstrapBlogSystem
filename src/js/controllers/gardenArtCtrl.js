"use strict";
angular.module('ZJSY_WeChat').controller('GardenArtController', function($rootScope,$scope,$stateParams,$http,$state){
    $scope.title="园艺服务";

    $scope.phoneReg=/^([0-9]{11})$/;
    $scope.typeList=[];
    $scope.childType=null;
    $http.post(X_context.api+'services/listServices',{
        "servicesId":4
    })
        .success(function(data){
            for(var i in data.data){
                var radio={
                    "id":data.data[i]._id,
                    "typeTitle":data.data[i].title
                }
                $scope.typeList.push(radio);
                $scope.childType=data.data[0]._id;

            }
        })

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
                    "note":$scope.garden.extraInfo,
                    //"title":$scope.childType,
                    "serviceId" : $scope.childType

                })
                    .success(function (data){
                        console.log(data.data);
                        $state.go('serviceSucceed',{serviceOrderId : data.data[0]._id});

                    });

            });

        }



    }


})


