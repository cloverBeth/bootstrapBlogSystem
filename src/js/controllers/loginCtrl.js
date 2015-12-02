"use strict";
angular.module('ZJSY_WeChat').controller('LoginController',function($scope,$interval){

    $scope.login = {
        title: '验证手机'
    };

    var btnStr = '获取验证码';
    $scope.telphone = '';
    $scope.captcha = '';
    $scope.captchaBtn = btnStr;
    $scope.captchaDisabled=false;
    $scope.setTime=function(){
        $scope.captchaDisabled=true;
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

    }
});
