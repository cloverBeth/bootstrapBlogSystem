"use strict";
angular.module('ZJSY_WeChat').controller('WaterSendController', function($rootScope,$scope,$stateParams,$http,$state){
    $scope.title="送水服务";

    $scope.typeList=[];
    $scope.childType = null;
    $scope.phoneReg=/^([0-9]{11})$/;


    $http.post(X_context.api + "services/listServices", {
            "servicesId": 1
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
                //console.log( $scope.childType);

            });
        $scope.$parent.memberPromise.then(function(data){
            $scope.garden={
                compyGuy : data.data.data[0].nickName,
                guyTel : data.data.data[0].mobile
            }
        });

        $scope.goGardenOrder=function(){

            if(!$scope.childType){
                $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您需要的送水服务～'});
                return;
            }

            else if (!$scope.garden.compyName) {
                $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司名～'});
                return;
            }
            else if (!$scope.garden.address) {
                $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入贵公司正确的地址～'});
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
            //else if(!$scope.garden.extraMsg){
            //    $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请不要输入特殊字符哦～'});
            //    return;
            //}
            else{

                    $http.post(X_context.api+"servicesOrder/add", {
                        "memberid" : X_context.memberId,
                         "company" : $scope.garden.compyName,
                       "contactor" : $scope.garden.compyGuy,
                          "mobile" : $scope.garden.guyTel,
                            "note" : $scope.garden.extraInfo,
                       "serviceId" : $scope.childType,
                         "address" : $scope.garden.address
                    })
                        .success(function(data){
                            console.log('123');
                            if(data.code==200){
                                $state.go('serviceSucceed',{serviceOrderId:data.data[0]._id});
                                //console.log(data.data);
                                $scope.orderSure=true;//如何避免重复订单？？？？？
                            }
                            else{
                                $state.go('serviceFailed',{serviceOrderId:data.data[0]._id});
                            }
                        })


            }


        }


})


