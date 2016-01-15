"use strict";
angular.module('ZJSY_WeChat').controller('ServiceOrderController', function($scope,$http){
    $scope.title="服务订单";

    $scope.currentPage = 2;
    $scope.pageSize = 5;
    $scope.orderList=[];
    $scope.$parent.memberPromise.then(function(){

        $http.post(X_context.api+"servicesOrder/list", {
            "memberid": X_context.memberId,
            page: $scope.currentPage,
            pageSize: $scope.pageSize,

        })
            .success(function (data){
                if(!data.data)return;
                for(var i in data.data.result){

                    var order = {
                        number : data.data.result[i].ordersn,
                           pro : data.data.result[i].services ? data.data.result[i].services.parentTitle : "",
                        doDate : data.data.result[i].createddate,
                       iconImg : data.data.result[i].services ? data.data.result[i].services.image : "",
                         state : data.data.result[i].orderstatus,
                          type : data.data.result[i].services ? data.data.result[i].services.title:"",
                            id : data.data.result[i].services ? data.data.result[i].services._id:"",
                       showSub : false,
                       linkMan : data.data.result[i].contactor,
                       linkTel : data.data.result[i].services ? data.data.result[i].mobile : "",
                      compName : data.data.result[i].company,
                      extraMsg : data.data.result[i].note,
                    };

                    $scope.orderList.push(order);

                }


            })

      })

})