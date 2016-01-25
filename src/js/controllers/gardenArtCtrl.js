"use strict";
angular.module('ZJSY_WeChat').controller('GardenArtController', function($rootScope,$scope,$stateParams,$http,$state){
    $scope.title="园艺服务";

    $scope.phoneReg=/^(1[0-9]{10})$/;
    var pattern = /^[-'a-z0-9\u4e00-\u9eff]{2,40}$/i;

    $scope.typeList=[];
    $scope.childType=null;
    $http.post(X_context.api+'services/listServices',{
        "servicesId":4
    })
        .success(function(data){
            $scope.childType=data.data[0]._id;
            for(var i in data.data){
                var radio={
                      "id":data.data[i]._id,
               "typeTitle":data.data[i].title
                }
                $scope.typeList.push(radio);

            }
        })

    $scope.$parent.memberPromise.then(function(data){
        $scope.garden={
            guyTel : data.data.data[0].mobile
        }
    });

    $scope.goGardenOrder=function(){
        if(!$scope.childType){
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您需要的园艺服务～'});
            return;
        }
        else if (!$scope.garden.compyName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司名～'});
            return;
        }else if (!$scope.garden.address) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司地址～'});
            return;
        }else if(!pattern.test($scope.garden.compyGuy)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入联系人姓名，只能是中、英文字符～'});
            return;
        }
        else if(!$scope.phoneReg.test($scope.garden.guyTel)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入正确的11位手机号～'});

            return;

        }else if(!pattern.test($scope.garden.extraInfo)){
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，最后一项请输入中、英文字符～'});
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
                   "serviceId":$scope.childType,
                     "address":$scope.garden.address

                })
                    .success(function (data){
                        if(data.code==200){
                            $state.go('serviceSucceed',{serviceOrderId:data.data[0]._id});
                            //console.log(data.data);
                        }
                        else{
                            $state.go('serviceFailed',{serviceOrderId:data.data[0]._id});
                        }

                    })

            });

        }



    }


})


