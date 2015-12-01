"use strict";
angular.module('ZJSY_WeChat.controllers.Main')

.controller('TestController', function($scope){

        $scope.name = "test";
        $scope.title = `Hello ${$scope.name}`;
});