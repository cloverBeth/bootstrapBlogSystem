"use strict";
angular.module('ZJSY_WeChat').controller('ServiceOrderController', function($scope){
    $scope.title="服务订单";
    $(".proState span").click(function(){
       $(this).parent().next().slideToggle();
    })


})