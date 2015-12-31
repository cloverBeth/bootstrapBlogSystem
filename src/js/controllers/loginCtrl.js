"use strict";
angular.module('ZJSY_WeChat').controller('LoginController',function($scope,$interval,$http,$state){

    $scope.login = {
        title: '验证手机'
    };

    var btnStr = '获取验证码';
    $scope.telphone = '';
    $scope.captcha = '';
    $scope.captchaBtn = btnStr;
    $scope.captchaDisabled = false;

    $scope.setTime=function(){
        if($scope.captchaDisabled==true){
            return;
        }
        $scope.captchaDisabled=true;
        var timer=60;
        var interval =
            $interval(function(){
                $scope.captchaBtn='请您稍后:'+timer;
                timer--;
                if(timer==0){
                    $interval.cancel(interval);
                    $scope.captchaDisabled=false;
                    $scope.captchaBtn=btnStr;
                }
            },1000);
        $http.post(X_context.api + "member/fetchAuthCode",{
            "phoneNum" : $scope.telphone
        })
            .success(function(data){
                $scope.ensureBtn=true;

            });
    }

    $scope.phoneReg=/^([0-9]{11})$/;

    var posted = false;
    $scope.getEnSure=function(){

        if($scope.telphone!=null && $scope.phoneReg.test($scope.telphone)){
            if(posted)return;
            posted = true;
            $scope.captchaDisabled=false;
            console.log( $scope.captchaDisabled);
            $http.post(X_context.api + "member/weixinLogin",{
                phoneNum : $scope.telphone,
                authCode : $scope.captcha
            })
            .success(function(data){
                    posted = false;
                    $scope.captcha = "";
                    console.log('data.data.token',data.data.token)
                if(data.data.token){
                    X_context.authorization = data.data.token;
                    $http.defaults.headers.post['Authorization'] = X_context.authorization;
                    $http.defaults.headers.put['Authorization'] = X_context.authorization;
                    $http.defaults.headers.get['Authorization'] = X_context.authorization;
                    $http.defaults.headers.delete['Authorization'] = X_context.authorization;
                    //$cookies.put('authorization',X_context.authorization);
                    createCookie('authorization',X_context.authorization);

                    $scope.$parent.memberPromise = $http.get(X_context.api + 'member/getCurMem')
                        .success(function(data){
                            if(!data.data[0])return;
                            X_context.memberId = data.data[0]._id;
                            X_context.memberPhone = data.data[0].mobile;

                        });
                }
                $state.go('store.product');
                //window.history.back();

            }).error(function(){
                    $scope.captcha = "";
                    posted = false;
                })
        }

    }


});
