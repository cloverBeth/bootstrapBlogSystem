"use strict";
angular.module('ZJSY_WeChat').controller('TransactionDetailController',function($scope,$state){
    $scope.title='交易明细';
    $scope.transaction=[{
        number:'20151208092590',
        order:'666666',
        cost:'25',
        order_date:'2015-12-08 00:00:20'
    }];
    $scope.goIndex=function(){
        $state.go('store.product');
    }
});