"use strict";

angular.module('ZJSY_WeChat').controller('MeetingRoomOrderController', function($rootScope,$http,$scope,$state,$stateParams){

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
        {
            price : 100,
            name : "100块会议室",
            info1 : "40平米",
            info2 : "可容纳10人",
            img : "images/meeting-room-1.png",
            id : 1
        },
        {
            price : 90,
            name : "90块会议室",
            info1 : "40平米",
            info2 : "可容纳10人",
            img : "images/meeting-room-1.png",
            id : 2
        },
        {
            price : 80,
            name : "80块会议室",
            info1 : "40平米",
            info2 : "可容纳10人",
            img : "images/meeting-room-1.png",
            id : 3
        }
    ];
    $scope.roomId = $stateParams.roomId ||  $scope.roomList[0].id;


    var originList = [
        {
            name : '上午8点',
            occupy : true,
            order : false
        },
        {
            name : '上午9点',
            occupy : true,
            order : false
        },
        {
            name : '上午10点',
            occupy : false,
            order : false
        },
        {
            name : '上午11点',
            occupy : true,
            order : false
        },
        {
            name : '上午12点',
            occupy : false,
            order : false
        }
        ,
        {
            name : '下午1点',
            occupy : false,
            order : false
        },
        {
            name : '下午2点',
            occupy : false,
            order : false
        },{
            name : '下午3点',
            occupy : false,
            order : false
        }
        ,{
            name : '下午4点',
            occupy : true,
            order : false
        }
        ,{
            name : '下午5点',
            occupy : true,
            order : false
        }
        ,{
            name : '下午6点',
            occupy : false,
            order : false
        }
        ,{
            name : '晚上',
            occupy : false,
            order : false
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
            $scope.totalPrice = _.filter(timeList,{order:true}).length * _.find($scope.roomList,{id:parseInt($scope.roomId)}).price
        }else{
            $scope.totalPrice = 0;
        }
    },true);

    $scope.$watch('roomId',function(timeList){
        _.forEach($scope.timeList,function(item,i){
            item.order = false;
        })
    });

    $scope.$watch('dt',function(){
        console.log($scope.dt)
        $scope.timeList = _.cloneDeep(originList);
    },true)
})


