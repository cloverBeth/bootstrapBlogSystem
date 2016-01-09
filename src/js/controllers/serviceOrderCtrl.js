"use strict";
angular.module('ZJSY_WeChat').controller('ServiceOrderController', function($scope){
    $scope.title="服务订单";
    $scope.service={
        compName:"云周率",
        type:" 园艺购买",
        linkMan:"曹操",
        linkTel:"15804689644",
        extraMsg:"寡人穿越至今，竟然看不到一片绿色！！！"
        };
    $(".proState span").click(function(){
       $(this).parent().next().slideToggle();
        $(this).toggleClass("togcss");
    })


})