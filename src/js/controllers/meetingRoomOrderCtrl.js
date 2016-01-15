"use strict";

angular.module('ZJSY_WeChat').controller('MeetingRoomOrderController', function($rootScope,$http,$scope,$state,$stateParams){

    $scope.dateModal = false;

    $scope.dt = new Date();

    $scope.datePicker = {
        opened : false
    }

    $scope.openDate = function() {
        $scope.datePicker.opened = true;
    };

    $scope.totalPrice = 0;


    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.roomList = [

    ];
    var roomPromise = $http.post(X_context.api + 'meeting/listRooms',
        {
            "page":"1",
            "pageSize":"10"
        })
        .success(function(data){
            _.forEach(data.data,function(room,i){
                $scope.roomList.push({
                    name : room.name,
                    info1 : room.subtitle,
                    info2 : room.descr,
                    img : room.img || "images/meeting-room-1.png",
                    id : room.id,
                    price : room.price || 0
                });
            });
            $scope.roomId = $stateParams.roomId ||  $scope.roomList[0].id;
        });




    var originList = [
        {
            name : '上午8点',
            occupy : false,
            order : false,
            id : "8"
        },
        {
            name : '上午9点',
            occupy : false,
            order : false,
            id : "9"
        },
        {
            name : '上午10点',
            occupy : false,
            order : false,
            id : "10"
        },
        {
            name : '上午11点',
            occupy : false,
            order : false,
            id : "11"
        },
        {
            name : '上午12点',
            occupy : false,
            order : false,
            id : "12"
        }
        ,
        {
            name : '下午1点',
            occupy : false,
            order : false,
            id : "13"
        },
        {
            name : '下午2点',
            occupy : false,
            order : false,
            id : "14"
        },{
            name : '下午3点',
            occupy : false,
            order : false,
            id : "15"
        }
        ,{
            name : '下午4点',
            occupy : false,
            order : false,
            id : "16"
        }
        ,{
            name : '下午5点',
            occupy : false,
            order : false,
            id : "17"
        }
        ,{
            name : '下午6点',
            occupy : false,
            order : false,
            id : "18"
        }
        ,{
            name : '晚上',
            occupy : false,
            order : false,
            id : "晚上"
        }
    ];


    $scope.orderTime = function(index){
        if($scope.timeList[index].occupy)return;
        $scope.timeList[index].order = !$scope.timeList[index].order;
    };

    $scope.goEnsure = function(){
        if(!$scope.dt || _.filter($scope.timeList,{order:true}).length == 0){
            $rootScope.$broadcast('alerts',{type:'danger',message:"请选择会议日期和时间."});
            return;
        }
        $state.go('meetingRoomEnsure',{
            meetingOrder : {
                date : $scope.dt,
                time : _.filter($scope.timeList,{order:true}),
                price : $scope.totalPrice,
                room : _.find($scope.roomList,{id:parseInt($scope.roomId)})
            }
        }
        )
    }

    $scope.$watch('timeList',function(timeList){
        if(_.filter(timeList,{order:true}).length && _.find($scope.roomList,{id:parseInt($scope.roomId)})){
            $scope.totalPrice = _.filter(timeList,{order:true}).length * parseInt(_.find($scope.roomList,{id:parseInt($scope.roomId)}).price)
        }else{
            $scope.totalPrice = 0;
        }
    },true);

    $scope.$watch('roomId',function(cur,old){
        if(cur != old && old){
            getOrderList();
        }
    });


    function getOrderList(){
        $scope.timeList = _.cloneDeep(originList);
        $http.post(X_context.api + 'meeting/listTime',
            {
                "meetingdate" : `${$scope.dt.getFullYear()}-${$scope.dt.getMonth()+1}-${$scope.dt.getDate()}`,
                "roomid" : $scope.roomId
            }).success(function(data){
                let orderList = [];
                _.forEach(data.data,function(order,i){
                    orderList = _.union(orderList,order.split(','));
                });
                console.log('orderList',orderList)
                _.forEach(orderList,function(order,i){
                    if(_.find($scope.timeList,{id:order})){
                        _.find($scope.timeList,{id:order}).occupy = true;
                    }
                })
            })
    }

    roomPromise.then(getOrderList);

    $scope.newDate = null;
    $scope.enSured = false;
    $scope.oldDate = null;

    $scope.$watch('dt',function(cur,old){
        if(cur != old && $scope.oldDate != cur){
            $scope.dateModal = true;
            $scope.oldDate = old;
        }
    },true)

    $scope.ensureDate = function(){
        getOrderList();
        $scope.dateModal = false;
    }

    $scope.cancelDate = function(){
        if($scope.oldDate){
            $scope.dt = $scope.oldDate;
        }
        $scope.dateModal = false;
    }


})


