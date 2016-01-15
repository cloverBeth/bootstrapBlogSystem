"use strict";
angular.module('ZJSY_WeChat').controller('ServiceOrderController', function($scope,$http){
    $scope.title="服务订单";

    $scope.orderList=[];
    $scope.$parent.memberPromise.then(function(){

        $http.post(X_context.api+"servicesOrder/list", {
            "memberid": X_context.memberId
        })
            .success(function (data){
                if(!data.data)return;
                for(var i in data.data){

                    var order = {
                        number : data.data[i].ordersn,
                           pro : data.data[i].services ? data.data[i].services.parentTitle : "",
                        doDate : data.data[i].createddate,
                       iconImg : data.data[i].services ? data.data[i].services.image : "",
                         state : data.data[i].orderstatus,
                          type : data.data[i].services ? data.data[i].services.title:"",
                            id : data.data[i].services ? data.data[i].services._id:"",
                       showSub : false,
                       linkMan : data.data[i].contactor,
                       linkTel : data.data[i].services ? data.data[i].services.mobile : "",
                      compName : data.data[i].company,
                      extraMsg : data.data[i].note,
                    };

                    $scope.orderList.push(order);

                }


            })

      })

})