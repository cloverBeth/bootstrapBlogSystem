"use strict";
angular.module("ZJSY_WeChat").controller("ServiceSucceedController",function($scope,$state,$http,$stateParams){
    $scope.title="下单成功";
    $scope.orderSucceed={
        telphone:"66666666666"
    }


        console.log("serviceOrderId:"+$stateParams.serviceOrderId);

        $http.post(X_context.api+"servicesOrder/list", {
            "memberid": X_context.memberId,
            "_id": $stateParams.serviceOrderId,
        }).success(function (data){

<<<<<<< HEAD
                if(!data.data.result[0]){return;}
                $scope.orderSucceed.type=data.data.result[0].services.parentTitle;
                $scope.orderSucceed.orderNumber=data.data.result[0].ordersn;
                $scope.orderSucceed.status=data.data.result[0].orderstatus;

=======
                if(!data.data[0]){return;}
                $scope.orderSucceed.type=data.data[0].services.parentTitle;
                $scope.orderSucceed.orderNumber=data.data[0].ordersn;
                $scope.orderSucceed.status=data.data[0].orderstatus;
>>>>>>> c903489bce01f9e65423b5d670cf5a58240d7d12
            });

    $scope.goToOnline=function(){
        $state.go('onlineService');
    }

})
