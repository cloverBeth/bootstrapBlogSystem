"use strict";
angular.module('ZJSY_WeChat').controller('WaterSendController', function($rootScope,$scope,$stateParams,$http,$state){
    $scope.title="送水服务";

    $scope.typeList=[];
    $scope.childType = null;
    $scope.orderSure=false;
    $scope.phoneReg=/^(1[0-9]{10})$/;
    var posted=false;
    var reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/;
    var pattern = /^[-'a-z\u4e00-\u9eff]{1,40}$/i;
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

            });
        $scope.$parent.memberPromise.then(function(data){
            $scope.garden={
                guyTel : data.data.data[0].mobile,
                compyGuy : data.data.data[0].nickName
            }
        });

        $scope.goGardenOrder=function(){
            if(posted == true)return;
            if(!$scope.childType){
                $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您需要的送水服务～'});
                return;
            }

            else if (!$scope.garden.compyName) {
                $('#compyName').focus();
                $rootScope.$broadcast('alerts', {type: 'danger', message: '请填写公司名称～'});
                return;
            }
            else if (!$scope.garden.address) {
                $('#address').focus();
                $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的公司地址～'});
                return;
            }else if(!pattern.test($scope.garden.compyGuy)||!$scope.garden.compyGuy) {
                $('#compyGuy').focus();
                $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入联系人姓名，只能是中、英文字符～'});
                return;
            }
            else if(!$scope.phoneReg.test($scope.garden.guyTel)||!$scope.garden.guyTel) {
                $('#guyTel').focus();
                $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入正确的11位手机号～'});
                return;

            }
            //else if(!reg.test($scope.garden.extraInfo)){
            //    $rootScope.$broadcast('alerts', {type: 'danger', message: '最后一项请输入中、英文字符～'});
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
                            posted = true;
                            if(data.code==200){
                                $state.go('serviceSucceed',{serviceOrderId:data.data[0]._id});
                            }
                            else{
                                $state.go('serviceFailed',{serviceOrderId:data.data[0]._id});
                            }
                        })


            }


        }


})


