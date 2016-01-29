"use strict";
angular.module('ZJSY_WeChat').controller('AccountCenterController',function($scope,$state,$http,Upload){
    console.log('X_context.memberPhone',X_context.memberPhone);

    $scope.account={
        title : '我的中心',
        tel : "",
        nick : "",
        contact : '021-12345678',
        payWay : '一卡通',
        portrait : ""
    };

    $http.get(X_context.api + 'member/getCurMem')
        .success(function(data){
            if(!data.data[0])return;
            if(data.data[0].nickName.toString()){
                //$("#editNick").attr("href","javascript:void(0);");
                $scope.account.tel = data.data[0].nickName;
            }
            else{
                $scope.account.tel = data.data[0].mobile;
            }
            $scope.account.portrait = X_context.devHost+data.data[0].portrait;
            $scope.account.nick = data.data[0].nickName;

            $scope.getNick=function(){
                $("#editNick").css("display","none");
                $("#changeNick").css("display","inline-block").focus();//获得焦点
                $("#changeNick").bind("blur",function(){
                    $http.post(X_context.api + 'member/update',{
                        "MemberId" : X_context.memberId,
                        "nickName" : $scope.account.nick,
                    })
                        .success(function(data){
                            console.log(data.data);
                            $state.reload();

                        })

                });

            }

        });
    $scope.upload = function (files) {
        if(!files[0])return;
        var file = files[0];
        Upload.upload({
            url: X_context.api + 'img/addMemberImg',
            file: file,
            fields : {
                memberId : X_context.memberId
            }
        }).progress(function (evt) {

        }).success(function (data) {
            console.log(data);
            $http.post(X_context.api + 'member/update',{
                "MemberId" : X_context.memberId,
                "portrait" : data.data[0]
            }).success(function(){
                console.log(data.data[0]);
                $state.reload();
            })
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    }


    $scope.signOut = function(){
        console.log('here,logout');
        X_context.authorization = X_context.guest;
        eraseCookie('authorization');
        $http.defaults.headers.post['Authorization'] = X_context.guest;
        $http.defaults.headers.put['Authorization'] = X_context.guest;
        $http.defaults.headers.get['Authorization'] = X_context.guest;
        $http.defaults.headers.delete['Authorization'] = X_context.guest;
        $state.go('store.product',{storeId:X_context.storeId});
    }
    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }

    //$scope.test=function(){
    //    $("#editNick").css("display","none");
    //    $("#changeNick").css("display","inline-block").focus();
    //    $("#changeNick").bind("blur",function(){
    //
    //        });
    //
    //}
});