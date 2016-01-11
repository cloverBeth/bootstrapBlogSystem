"use strict";

angular.module('ZJSY_WeChat').controller('MeetingRoomListController', function($scope,$http,$state){
    $scope.roomList = [
        {
            name : "一号会议室",
            info1 : "40平米",
            info2 : "可容纳10人",
            img : "images/meeting-room-1.png",
            id : 1
        },
        {
            name : "一号会议室",
            info1 : "40平米",
            info2 : "可容纳10人",
            img : "images/meeting-room-1.png",
            id : 2
        },
        {
            name : "一号会议室",
            info1 : "40平米",
            info2 : "可容纳10人",
            img : "images/meeting-room-1.png",
            id : 3
        }
    ];

    $scope.gotoDetail = function(id){
        $state.go('meetingRoomOrder',{roomId : id});
    }

})


