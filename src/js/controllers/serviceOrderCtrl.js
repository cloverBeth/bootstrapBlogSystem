"use strict";
angular.module('ZJSY_WeChat').controller('ServiceOrderController', function($scope,$http){
    $scope.title="服务订单";

    //$scope.orderList=[{
    //    iconImg:'images/icon_watering.jpg',
    //    number:'20190982704',
    //    pro:'送水服务',
    //    doDate:'208910',
    //    state:'未处理',
    //    type:"园艺购买",
    //    showSub : false
    //},{
    //    iconImg:'images/icon_meeting.jpg',
    //    number:'20190982704',
    //    pro:'会议服务',
    //    doDate:'208910',
    //    state:'未处理',
    //    type:"园艺购买",
    //    showSub : false
    //}];
    //$scope.service={
    //    type:"园艺租赁",
    //    linkMan:"曹操",
    //    compName:"云周率",
    //    linkTel:"15804689644",
    //    extraMsg:"巴拉巴拉小魔仙lalallaabalabalabalabalabalabablabalabalabalabalabalabal" +
    //    "abalabalabalabalalabalabalabala...."
    //}

    //console.log($scope.service);

    $scope.orderList=[];
    $scope.$parent.memberPromise.then(function(){

        $http.post(X_context.api+"servicesOrder/list", {
            "memberid": X_context.memberId
        })
            .success(function (data){
                if(!data.data)return;
                for(var i in data.data){

                    var order = {
                        number: data.data[i].ordersn,
                        pro:data.data[i].services ? data.data[i].services.parentTitle : "",
                        doDate:data.data[i].createddate,
                        iconImg:data.data[i].services ? data.data[i].services.image : "",
                        state:data.data[i].orderstatus,
                        type:data.data[i].services ? data.data[i].services.title:"",
                        id:data.data[i].services ? data.data[i].services._id:"",
                        showSub : false,
                        linkMan:data.data[i].contactor,
                        linkTel:data.data[i].services ? data.data[i].services.mobile : "",
                        compName:data.data[i].company,
                        extraMsg:data.data[i].note,
                    };


                    $scope.orderList.push(order);

                }


            })

    })

})