"use strict";
angular.module('ZJSY_WeChat').controller('ParkingController', function($rootScope,$http,$scope,$state){
    $scope.title="车位申请";
    //$scope.parking={
    //    rent:"garden_buy",
    //    compyName:"动次打次",
    //    compyGuy:"曹操",
    //    guyTel:"18990976734",
    //    extraInfo:"宁我负天下人，勿天下人负我！！！"
    //};
    $scope.parking= {
        //rent: "garden_buy",
        _id:null
    }
    $scope.typeList=[];
    var posted=false;
    $scope.childType=null;
    $scope.phoneReg=/^(1[0-9]{10})$/;
    var pattern = /^[-'a-z\u4e00-\u9eff]{1,40}$/i;
    var reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|\s)+/;

    $http.post(X_context.api+"services/listServices",{
        "servicesId":3

    })
        .success(function(data){
            for(var i in data.data){
                var radio={
                    "id":data.data[i]._id,
                    "typeTitle":data.data[i].title
                }
                $scope.childType=data.data[0]._id;
                $scope.typeList.push(radio);
            }
        })
    $scope.$parent.memberPromise.then(function(data){
        $scope.parking={
            guyTel : data.data.data[0].mobile,
            compyGuy : data.data.data[0].nickName
        }
    });

    $scope.goGardenOrder=function() {
        if(!$scope.childType){
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您需要的送水服务～'});
            return;
        }else if (!$scope.parking.compyName) {
            $('#compyName').focus();
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请填写公司名称～'});
            return;
        }else if (!$scope.parking.address) {
            $('#address').focus();
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的公司地址～'});
            return;
        }else if(!pattern.test($scope.parking.compyGuy)||!$scope.parking.compyGuy) {
            $('#compyGuy').focus();
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入联系人姓名，只能是中、英文字符～'});
            return;
        }
        else if (!$scope.phoneReg.test($scope.parking.guyTel)||!$scope.parking.guyTel) {
            $('#guyTel').focus();
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入正确的11位手机号～'});
            return;
        }else if(!$scope.parking.carNo){
            $('#carNo').focus();
            $rootScope.$broadcast('alerts', {type: 'danger', message: '请输入您的车牌号～'});
            return;
        }else {
                if(posted == true)return;
                posted = true;
                $scope.$parent.memberPromise.then(function () {
                    $http.post(X_context.api + "servicesOrder/add", {
                        "memberid": X_context.memberId,
                         "company": $scope.parking.compyName,
                       "contactor": $scope.parking.compyGuy,
                          "mobile": $scope.parking.guyTel,
                       "serviceId": $scope.childType,
                            "note": $scope.parking.extraInfo,
                         "address": $scope.parking.address,
                          "prop1" : $scope.parking.carNo
                    })
                        .success(function (data) {
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


});




