"use strict";
angular.module("ZJSY_WeChat").controller("ServiceSucceedController",function($scope,$state,$http,$stateParams){
    console.log($stateParams.orderId);
    $scope.title="下单成功";
    $scope.orderSucceed={
        //type:"园艺购买",
        //status:"支付成功",
        //orderNumber:"201976875613623",
        //expense:"300",
        //payway:"线下支付",
        telphone:"1796733266"
    }



        $http.post(X_context.api+"servicesOrder/list", {
            memberid: X_context.memberId,
            _id: $stateParams.orderId,
        })
            .success(function (data){
                $scope.orderSucceed.status=data.data[0].orderstatus;
                $scope.orderSucceed.orderNumber=data.data[0].ordersn;

                console.log(data.data);


            });



    $scope.goToOnline=function(){
        $state.go('onlineService');
    }

})
