"use strict";
angular.module('ZJSY_WeChat').controller('AdviceAndComplainController', function($rootScope,$scope,$stateParams,$http,$state){
    $scope.title="留言&建议";

    $scope.typeList=[];
    $scope.childType = null;
    $scope.phoneReg=/^(1[0-9]{10})$/;
    var pattern = /^[-'a-z0-9\u4e00-\u9eff]{2,40}$/i;
    var reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/;

    $http.post(X_context.api + "services/listServices", {
        "servicesId": 6
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
        $scope.advice={
            guyTel : data.data.data[0].mobile
        }
    });

    $scope.goGardenOrder=function(){

        if (!$scope.advice.compyName) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您的公司名～'});
            return;
        }
        else if(!($scope.advice.compyGuy)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入联系人姓名～'});
            return;
        }
        else if(!$scope.phoneReg.test($scope.advice.guyTel)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入正确的11位手机号～'});
            return;

        }else if(!reg.test($scope.advice.extraInfo)) {
            $rootScope.$broadcast('alerts', {type: 'danger', message: '亲，请输入您宝贵的评价与建议,只能是中文、英文～'});
            return;

        }
        else{

            $http.post(X_context.api+"servicesOrder/add", {
                "memberid" : X_context.memberId,
                 "company" : $scope.advice.compyName,
               "contactor" : $scope.advice.compyGuy,
                  "mobile" : $scope.advice.guyTel,
                    "note" : $scope.advice.extraInfo,
               "serviceId" : $scope.childType,
            })
                .success(function(data){
                    if(data.code==200){
                        $rootScope.$broadcast('alerts', {type: 'danger', message: '留言成功！感谢您的评价和建议，我们将做得更好'});
                        $scope.advice.extraInfo=null;
                        $scope.advice.compyName=null;
                        $scope.advice.compyGuy=null;

                    }

                })


        }


    }


})


