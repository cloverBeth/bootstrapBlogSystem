"use strict";
angular.module('ZJSY_WeChat').controller('LoginController',function($scope,$interval){

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
    }

    $scope.phoneReg=/^([0-9]{11})$/;

    $scope.getCheckNum=function(){
        if($scope.telphone!=null && $scope.phoneReg.test($scope.telphone)){
            $scope.captchaDisabled=false;
            console.log( $scope.captchaDisabled);
        }
        else{
            $scope.captchaDisabled=true;
            console.log( $scope.captchaDisabled);
        }
    }

    $(function(){
        $scope.befocus=function(){
            $('#usertel').focus();
        }
        $scope.getfocus=function(){
            $('#usercheck').focus();
        }

    });

});
