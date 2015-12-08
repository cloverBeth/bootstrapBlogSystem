"use strict";
angular.module('ZJSY_WeChat').controller('LoginController',function($scope,$interval,$http){

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
        $http.post(X_context.api + "member/fetchAuthCode",{
            "phoneNum" : $scope.telphone
        })
            .success(function(data){
                console.log(data);
                $scope.captchaDisabled=true;
                $scope.ensureBtn=true;
                var timer=60;
                var interval=$interval(function(){
                    $scope.captchaBtn='请您稍后：'+timer;
                    timer--;
                    if(timer==0){
                        $interval.cancel(interval);
                        $scope.captchaDisabled=false;
                        $scope.captchaBtn=btnStr;
                    }
                },1000);
            });
    }

    $scope.phoneReg=/^([0-9]{11})$/;

    $scope.getEnSure=function(){
        if($scope.telphone!=null && $scope.phoneReg.test($scope.telphone)){
            $scope.captchaDisabled=false;
            console.log( $scope.captchaDisabled);
            $http.post(X_context.api + "member/weixinLogin",{
                phoneNum : $scope.telphone,
                authCode : $scope.captcha
            })
            .success(function(data){
                    console.log('data.data.token',data.data.token)
                if(data.data[0].token){
                    X_context.authorization = data.data[0].token;
                    //$cookies.put('authorization',X_context.authorization);
                    cookieTool.createCookie('authorization',X_context.authorization)
                }
                window.history.back();
            })
        }
        //else{
        //    $scope.captchaDisabled=true;
        //    console.log( $scope.captchaDisabled);
        //}
    }

    //$(function(){
    //    $scope.befocus=function(){
    //        $('#usertel').focus();
    //    }
    //    $scope.getfocus=function(){
    //        $('#usercheck').focus();
    //    }
    //});



});
