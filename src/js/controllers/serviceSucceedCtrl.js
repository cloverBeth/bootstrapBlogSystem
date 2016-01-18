"use strict";
angular.module("ZJSY_WeChat").controller("ServiceSucceedController",function($scope,$state,$http,$stateParams){
    $scope.title="下单成功";
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.orderSucceed={
        //telphone:"66666666666"
    }


        console.log("serviceOrderId:"+$stateParams.serviceOrderId);

        $http.post(X_context.api+"servicesOrder/list", {
            "memberid": X_context.memberId,
                 "_id": $stateParams.serviceOrderId,
                  page: $scope.currentPage,
              pageSize: $scope.pageSize,
        }).success(function (data){

                if(!data.data){return;}
                $scope.orderSucceed.type=data.data.result[0].services.parentTitle;
                $scope.orderSucceed.orderNumber=data.data.result[0].ordersn;
                $scope.orderSucceed.status=data.data.result[0].orderstatus;
                $scope.orderSucceed.telphone=data.data.result[0].services.mobile;
                //
                //if(!data.data[0]){return;}
                //$scope.orderSucceed.type=data.data[0].services.parentTitle;
                //$scope.orderSucceed.orderNumber=data.data[0].ordersn;
                //$scope.orderSucceed.status=data.data[0].orderstatus;
            });

    $scope.goToOnline=function(){
        $state.go('onlineService');
    }

})
