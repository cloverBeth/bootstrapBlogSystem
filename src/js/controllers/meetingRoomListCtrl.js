"use strict";

angular.module('ZJSY_WeChat').controller('MeetingRoomListController', function($scope,$http,$state){

    $scope.roomList = [];
    $http.post(X_context.api + 'meeting/listRooms',
        {
            "page":"1",
            "pageSize":"10"
        })
        .success(function(data){
            _.forEach(data.data,function(room,i){
                $scope.roomList.push({
                    name : room.name,
                    info1 : room.subTitle,
                    info2 : room.descr,
                    img : X_context.devHost + room.image || "images/meeting-room-1.png",
                    id : room.id
                });
            })
        });
    //$scope.roomList = [
    //    {
    //        name : "一号会议室",
    //        info1 : "40平米",
    //        info2 : "可容纳10人",
    //        img : "images/meeting-room-1.png",
    //        id : 1
    //    },
    //    {
    //        name : "一号会议室",
    //        info1 : "40平米",
    //        info2 : "可容纳10人",
    //        img : "images/meeting-room-1.png",
    //        id : 2
    //    },
    //    {
    //        name : "一号会议室",
    //        info1 : "40平米",
    //        info2 : "可容纳10人",
    //        img : "images/meeting-room-1.png",
    //        id : 3
    //    }
    //];

    $scope.gotoDetail = function(id){
        $state.go('meetingRoomOrder',{roomId : id});
    }

})


