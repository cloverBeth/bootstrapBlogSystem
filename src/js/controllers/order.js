"use strict";
angular.module('ZJSY_WeChat').controller('OrderController',function($scope){
    $scope.total='100';
    $scope.title="我的订单";
    $scope.orderlist=[
        {
            number:'26678908897',
            states:'未处理',
            quantity1:'3',
            quantity2:'2',
            quantity3:'4',
            total:"9",
            orderDate:'2015-11-11 00:00'

        }
    ]
})