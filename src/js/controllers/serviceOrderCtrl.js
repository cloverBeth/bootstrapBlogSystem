"use strict";
angular.module('ZJSY_WeChat').controller('ServiceOrderController', function($scope,$http,$state,$stateParams){
    $scope.title="服务订单";

    $scope.currentPage = 1;
    $scope.pageSize = 8;
    $scope.orderList=[];
    $scope.canload = true;
    $scope.displayZero=function(n) {//六位数字，当分钟或秒钟或时钟小于10时，加0，否则空格补救
        if (n < 10) {
            return '0' + n;
        }else {
            return n;
        }
    };

    $scope.getOrder = function(){
        $http.post(X_context.api+"servicesOrder/list", {
            "memberId": X_context.memberId,
            page: $scope.currentPage,
            pageSize: $scope.pageSize,

        })
            .success(function (data){
                //console.log(data.data);
                //console.log($scope.displayZero(new Date(data.data.result[1].createdDate).getMinutes()))
                $scope.orderLength=data.data.length==0?true:false;
                if(!data.data)return;
                if($scope.orderList.length >= data.data.result[0].count){
                   $scope.canload = false;
                }
                if($scope.canload == false)return;


                for(var i in data.data.result){
                    var results=data.data.result[i];
                    //console.log(data.data.result);
                    if(data.data.result[i].serviceType!="会议服务"){
                        var order = {
                            number : results.orderSn,
                            pro : results.services ? results.services.parentTitle : "",
                            doDate : (new Date(results.createdDate).getFullYear()==new Date().getFullYear()&&
                            new Date(results.createdDate).getMonth()==new Date().getMonth()&&
                            new Date(results.createdDate).getDate()==new Date().getDate())
                                ? new Date(results.createdDate).getHours()+':'+
                            ($scope.displayZero(new Date(results.createdDate).getMinutes()))
                                : new Date(results.createdDate).getFullYear()+'/'+
                            ($scope.displayZero(new Date(results.createdDate).getMonth()+1))+'/'+
                            new Date(results.createdDate).getDate(),
                            iconImg : X_context.devHost + results.services.image,
                            state : results.orderStatus==0?"未处理":results.orderStatus==1?"已处理":"已取消",
                            type : results.services ? results.services.title:"",
                            id : results.services ? results.services._id:"",
                            showSub : false,
                            showMeet : true,
                            linkMan : results.contactor,
                            linkTel : results.mobile,
                            compName : results.company,
                            extraMsg : results.note,
                            address : results.address,
                            proName : results.project,
                            carNum : results.prop1,
                            showCarNum : results.services.parentTitle=="车位服务"?true:false,
                            showFina : results.services.parentTitle=="投融资"?true:false

                        };
                    }else{

                        var order = {
                            number : results.orderSn,
                            pro : results.serviceType,
                            roomName : results.roomName,
                            type : results.serviceType,
                            expense : results.payAmount,
                            doDate :(new Date(results.createdDate).getFullYear()==new Date().getFullYear()&&
                            new Date(results.createdDate).getMonth()==new Date().getMonth()&&
                            new Date(results.createdDate).getDate()==new Date().getDate())
                                ? new Date(results.createdDate).getHours()+':'+
                            ($scope.displayZero(new Date(results.createdDate).getMinutes()))
                                : new Date(results.createdDate).getFullYear()+'/'+($scope.displayZero(new Date(results.createdDate).getMonth()+1))+'/'+new Date(results.createdDate).getDate(),
                            state : results.orderStatus==0?"未处理":results.orderStatus==1?"已处理":"已取消",
                            //linkTel : data.data.result[i].mobile,
                            showRoom : false,
                            showMeet : false,
                            //paystatus : results.paystatus=="0"?"未处理":"已处理",
                            id : results._id,
                            compName : results.company,
                            timeLine : results.meetingTime,
                            meetingDate : results.meetingDate,
                            extraMsg : results.remark,
                            linkMan : results.contact,
                            linkTel : results.mobile,
                            payMethod : results.payType,
                            _id : results._id,
                            payState : results.payStatus=="true"?"已支付":"未支付",
                            showMeetIcon : results.serviceType=="会议服务" ? true:false
                        }
                    }
                    $scope.orderList.push(order);
                }
                $scope.currentPage++;

            })
    };

    $scope.$parent.memberPromise.then(function(){
        $scope.getOrder();
    })


    $scope.payAgain = function(id){

        $state.go('cardLogin',{from:{fromMeeting : true,orderId : id}});
        //一卡通订单立即支付如何区分是哪儿的
    }

})