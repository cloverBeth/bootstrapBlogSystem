"use strict";

angular.module('ZJSY_WeChat').controller('MeetingRoomOrderController', function($rootScope,$http,$scope){

    $scope.dt = new Date();

    $scope.datePicker = {
        opened : false
    }

    $scope.openDate = function() {
        $scope.datePicker.opened = true;
    };


    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
})


