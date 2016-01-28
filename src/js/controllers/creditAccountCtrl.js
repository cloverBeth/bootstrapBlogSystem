"use strict";
angular.module("ZJSY_WeChat").controller("CreditAccountController",function($scope,$state,$http,$stateParams){
   $scope.credit={
       title:"我的积分",
       orderSn:null,

   };
    $scope.creditdetail = [];

    $http.get(X_context.api + 'member/getCurMem')
        .success(function(data){

            $scope.credit.creditall= data.data[0].point;
            console.log('pointLeft',data.data[0].point);

            $http.post(X_context.api + "order/list",{
                id: X_context.memberId,
                //userPointDone : 1
            }).success(function(data){

                for(var i in data.data) {
                    $scope.creditdetail.push({
                    creditrule:data.data[i].storeName=="积分商城"? "积分抵用" : "购买商品",
                    creditval:data.data[i].storeName=="积分商城"? "-"+data.data[i].point : "+"+data.data[i].userPoint,
                    credit_date: data.data[i].createDate,
                  });

                }

            })

        });

});