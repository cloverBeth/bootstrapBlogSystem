"use strict";
angular.module('ZJSY_WeChat').controller('TransactionDetailController',function($scope){
    $scope.title='交易明细';
    $scope.transaction=[{
        number:'20151208092590',
        order:'666666',
        cost:'25',
        order_date:'2015-12-08 00:00:20'
    }];
    console.log('hahah');
});