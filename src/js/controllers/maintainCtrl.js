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
        //rent:"garden_fix",
        _id:null
    }
    $scope.typeList=[];
    $scope.childType = null;
    $scope.phoneReg=/^([0-9]{11})$/;

    $http.post(X_context.api+"services/listServices", {
        "servicesId":2
    })
        .success(function (data){
            for(var i in data.data){
                var radio={
                    "id":data.data[i]._id,
                    "typeTitle":data.data[i].title,
                };
                $scope.childType=data.data[0]._id;
                $scope.typeList.push(radio);
            }
            console.log( $scope.typeList)
        });

    $scope.goGardenOrder=function(){

        if(!$scope.childType){
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
                        "note":$scope.maintain.extraInfo,
                  "serviceId" : $scope.childType,


                })
                    .success(function (data){
                        if(data.code==200){
                            $state.go('serviceSucceed',{serviceOrderId:data.data[0]._id});
                            //console.log(data.data);
                        }
                        else{
                            $state.go('serviceFailed',{serviceOrderId:data.data[0]._id});
                        }

                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                        $state.go('serviceFailed',{serviceOrderId:data.data[0]._id});

                    });

              });

        }



    }


})


