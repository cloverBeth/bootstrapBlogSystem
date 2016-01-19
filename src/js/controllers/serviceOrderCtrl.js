"use strict";
angular.module('ZJSY_WeChat').controller('ServiceOrderController', function($scope,$http,$state){
    $scope.title="服务订单";

    $scope.currentPage = 1;
    $scope.pageSize = 100;
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
                    //console.log(data.data.result);
                    if(data.data.result[i].serviceType!="会议服务"){
                        var order = {
                            number : data.data.result[i].ordersn,
                               pro : data.data.result[i].services ? data.data.result[i].services.parentTitle : "",
                            doDate : data.data.result[i].createddate,
                           iconImg : data.data.result[i].services ? data.data.result[i].services.image : "",
                             state : data.data.result[i].orderstatus,
                              type : data.data.result[i].services ? data.data.result[i].services.title:"",
                                id : data.data.result[i].services ? data.data.result[i].services._id:"",
                           showSub : false,
                          showMeet : true,
                           linkMan : data.data.result[i].contactor,
                           linkTel : data.data.result[i].services ? data.data.result[i].mobile : "",
                          compName : data.data.result[i].company,
                          extraMsg : data.data.result[i].note,
                        };
                    }else{
                        var order = {
                            number : data.data.result[i].ordersn,
                               pro : data.data.result[i].serviceType,
                          roomName : data.data.result[i].roomid,
                              type : data.data.result[i].serviceType,
                           expense : data.data.result[i].payamount,
                            doDate : data.data.result[i].createddate,
                             state : data.data.result[i].orderstatus,
                           //linkTel : data.data.result[i].mobile,
                          showRoom : false,
                          showMeet : false,
                                id : data.data.result[i]._id,
                          compName : data.data.result[i].company,
                          timeLine :data.data.result[i].meetingtime,
                          extraMsg : data.data.result[i].remark,


                        }

                        $scope.payAgain = function(){
                            console.log(data.data.result[i]._id);
                            $state.go('cardLogin',{from:{fromOrder : true,orderId : data.data.result[i]._id}});
                        }
                    }

                    $scope.orderList.push(order);

                }



            })


      })




})