"use strict";
angular.module('ZJSY_WeChat.controllers.Main').controller('HomeController', function($scope){
        console.log('asd');
        $scope.name = "rick";
        $scope.title = `Hello ${$scope.name}`;

});