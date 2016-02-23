"use strict";
angular.module('ZJSY_WeChat').controller('MaintainForAppController', function($rootScope,$http,$scope,$state){
    $scope.title="维修服务";
    //$scope.maintain={
    //    rent:"garden_fix",
    //    compyName:"动次打次",
    //    compyGuy:"曹操",
    //    guyTel:"18990976734",
    //    extraInfo:"宁我负天下人，勿天下人负我勿天下人负我！！！勿天下人负我！！！344444555555你是否会给哥噶；" +
    //    "给 i 火锅高跟344444555555你是否会给哥噶；给 i 火锅高跟！！！344444555555你是否会给哥噶；给 i 火锅高跟"
    //};
    var posted = false;

    $scope.maintain={
        //rent:"garden_fix",
        _id:null
    }
    $scope.typeList=[];
    $scope.childType = null;
    $scope.phoneReg=/^(1[0-9]{10})$/;
    var pattern = /^[-'a-z\u4e00-\u9eff]{1,40}$/i;
    var reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/;
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

    $scope.$parent.memberPromise.then(function(data){
        $scope.maintain={
            guyTel : data.data.data[0].mobile,
            compyGuy : data.data.data[0].nickName
        }
    });

    $scope.goGardenOrder=function(){


        if(!$scope.childType){
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您需要的维修服务～'});
            return;
        }else if (!$scope.maintain.compyName) {
            $('#compyName').focus();
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请填写公司名称～'});
            return;
        }else if (!$scope.maintain.address) {
            $('#address').focus();
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的公司地址～'});
            return;
        }else if(!pattern.test($scope.maintain.compyGuy)||!$scope.maintain.compyGuy) {
            $('#compyGuy').focus();
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入联系人姓名，只能是中、英文字符～'});
            return;
        }else if(!$scope.phoneReg.test($scope.maintain.guyTel)||!$scope.maintain.guyTel) {
            $('#guyTel').focus();
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入正确的11位手机号～'});
            return;

        }else{
                if(posted == true)return;
                posted = true;
                $scope.$parent.memberPromise.then(function(){
                    $http.post(X_context.api+"servicesOrder/add", {
                        "memberId": X_context.memberId,
                         "company":$scope.maintain.compyName,
                       "contactor":$scope.maintain.compyGuy,
                          "mobile":$scope.maintain.guyTel,
                            "note":$scope.maintain.extraInfo,
                       "serviceId":$scope.childType,
                         "address":$scope.maintain.address


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


