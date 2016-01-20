"use strict";
angular.module('ZJSY_WeChat').controller('ServiceOrderController', function($scope,$http,$state,$stateParams){
    $scope.title="服务订单";

    $scope.currentPage = 1;
    $scope.pageSize = 1;
    $scope.orderList=[];
    $scope.displayZero=function(n) {//六位数字，当分钟或秒钟或时钟小于10时，加0，否则空格补救
        if (n < 10) {
            return '0' + n;
        }else if(n==10){
            return 10;
        }
        else {
            return n;
        }
    }
    $scope.$parent.memberPromise.then(function(){

        $http.post(X_context.api+"servicesOrder/list", {
            "memberid": X_context.memberId,
             page: $scope.currentPage,
             pageSize: $scope.pageSize,

        })
            .success(function (data){

                console.log($scope.displayZero(new Date(data.data.result[1].createddate).getMinutes()))
                if(!data.data)return;

                for(var i in data.data.result){
                    var results=data.data.result[i]
                    //console.log(data.data.result);
                    if(data.data.result[i].serviceType!="会议服务"){
                        var order = {
                            number : results.ordersn,
                               pro : results.services ? results.services.parentTitle : "",
                            doDate : results.createddate,
                           iconImg : results.services ? results.services.image : "",
                             state : results.orderstatus==0?"未处理":results.orderstatus==1?"已处理":"已取消",
                              type : results.services ? results.services.title:"",
                                id : results.services ? results.services._id:"",
                           showSub : false,
                          showMeet : true,
                           linkMan : results.contactor,
                           linkTel : results.mobile,
                          compName : results.company,
                          extraMsg : results.note,
                        };
                    }else{

                        var order = {
                            number : results.ordersn,
                               pro : results.serviceType,
                          roomName : results.roomName,
                              type : results.serviceType,
                           expense : results.payamount,
                            doDate :(new Date(results.createddate).getFullYear()==new Date().getFullYear()&&
                                     new Date(results.createddate).getMonth()==new Date().getMonth()&&
                                     new Date(results.createddate).getDate()==new Date().getDate())
                                    ?new Date(results.createddate).getHours()+':'+
                                     new Date(results.createddate).getMinutes() :
                                     new Date(results.createddate).getFullYear()+'/'+
                                    ($scope.displayZero(new Date(results.createddate).getMonth()+1))+'/'+
                                     new Date(results.createddate).getDate()+'\n'+
                                     new Date(results.createddate).getHours()+':'+
                                    ($scope.displayZero(new Date(results.createddate).getMinutes())),
                             state : results.orderstatus==0?"未处理":results.orderstatus==1?"已处理":"已取消",
                           //linkTel : data.data.result[i].mobile,
                          showRoom : false,
                          showMeet : false,
                         //paystatus : results.paystatus=="0"?"未处理":"已处理",
                                id : results._id,
                          compName : results.company,
                          timeLine : results.meetingtime,
                          extraMsg : results.remark,
                           linkMan : results.contact,
                           linkTel : results.mobile,
                         payMethod : results.paytype,
                               _id : results._id,
                          payState : results.paystatus==false?"已支付":"未支付",


                        }


                    }

                    $scope.orderList.push(order);

                }



            })


      })


    $scope.payAgain = function(id){

        $state.go('cardLogin',{from:{fromMeeting : true,orderId : id}});
        //一卡通订单立即支付如何区分是哪儿的
    }

})