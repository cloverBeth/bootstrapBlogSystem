"use strict";
angular.module("ZJSY_WeChat").controller("CreditAccountController",function($scope,$state,$http,$stateParams){
   $scope.credit={
       title:"我的积分",
       //creditall:558,
       orderSn:null,

   }

//$scope.creditdetail=[
//        {
//        creditrule:"购买商品",
//        //creditval:34,
//        //credit_date:"2013-10-29 20:40",
//    }
//]
 var creditListApi=X_context.api+"member/list";
    $http.post(creditListApi,{
        id:X_context.memberId
    })
        .success(function(data){
            if(!data.data)return;
              $scope.credit.creditall= data.data[0].point;
            var creditAddApi=X_context.api+"order/list";
            $http.post(creditAddApi,{
                id:X_context.memberId
            })
                .success(function(data){
                    for(var i in data.data) {
                        _.forEach(data.data[i].orderSn, function () {
                            $scope.creditdetail= [{
                                    creditrule: "购买商品",
                                    creditval:"+"+data.data[i].userPoint,
                                    credit_date: data.data[i].createDate,
                                }]
                        })
                    }
                })
        })



});