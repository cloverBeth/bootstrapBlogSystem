"use strict";
angular.module("ZJSY_WeChat").controller("ServiceSucceedForAppController",function($scope,$state,$http,$stateParams){
    $scope.title="下单成功";
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.orderSucceed={};

        console.log("serviceOrderId:"+$stateParams.serviceOrderId);

        $http.post(X_context.api+"servicesOrder/list", {
            "memberId": X_context.memberId,
                 "_id": $stateParams.serviceOrderId,
                  page: $scope.currentPage,
              pageSize: $scope.pageSize,
        }).success(function (data){

                if(!data.data){return;}
                var result=data.data.result[0];
                $scope.orderSucceed.type=result.services.parentTitle;
                $scope.orderSucceed.orderNumber=result.orderSn;
                $scope.orderSucceed.status=result.orderStatus;
                $scope.orderSucceed.telphone=result.services.mobile;
                $scope.orderSucceed.address=result.address;
                //if(!data.data[0]){return;}
                //$scope.orderSucceed.type=data.data[0].services.parentTitle;
                //$scope.orderSucceed.orderNumber=data.data[0].ordersn;
                //$scope.orderSucceed.status=data.data[0].orderstatus;
                if($scope.orderSucceed.type=="商务策划"||$scope.orderSucceed.type=="投融资"){
                    $scope.showBusiness=true;
                }
            });

    $scope.goToOnline=function(){
        $state.go('onlineServiceForApp');
    }
    $scope.goBusiness=function(){
        window.history.back();
    }

})
