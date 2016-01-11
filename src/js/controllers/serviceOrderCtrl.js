"use strict";
angular.module('ZJSY_WeChat').controller('ServiceOrderController', function($scope){
    $scope.title="服务订单";

    $scope.orderList=[{
        iconImg:'images/icon_watering.jpg',
        number:'20190982704',
        pro:'送水服务',
        doDate:'2016/01/14',
        state:'未处理',
        type:"园艺购买",
        showSub : false
    }];
    $scope.service={
        type:"园艺租赁",
        linkMan:"曹操",
        compName:"云周率",
        linkTel:"15804689644",
        extraMsg:"巴拉巴拉小魔仙lalallaabalabalabalabalabalabablabalabalabalabalabalabal" +
        "abalabalabalabalalabalabalabala...."
    }

    console.log($scope.service);



})