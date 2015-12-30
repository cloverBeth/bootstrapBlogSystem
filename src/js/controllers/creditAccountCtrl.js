"use strict";
angular.module("ZJSY_WeChat").controller("CreditAccountController",function($scope,$state,$http,$stateParams){
   $scope.credit={
       title:"我的积分",
       //creditall:558,
       orderSn:null,

   };
    $scope.creditdetail = [];

//$scope.creditdetail=[
//        {
//        creditrule:"购买商品",
//        //creditval:34,
//        //credit_date:"2013-10-29 20:40",
//    }
//]

    $scope.$parent.memberPromise.then(function(data){
        console.log('data',data.data);

        $scope.credit.creditall= data.data.data[0].point;

        var creditAddApi=X_context.api+"order/list";
        $http.post(creditAddApi,{
            id:X_context.memberId
        })
            .success(function(data){
                for(var i in data.data) {
                    if(data.data[i].userPoint){
                        $scope.creditdetail.push({
                            creditrule: "购买商品",
                            creditval:"+"+data.data[i].userPoint,
                            credit_date: data.data[i].createDate,
                        });
                    }

                }
            })

     })






});