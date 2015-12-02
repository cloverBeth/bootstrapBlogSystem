"use strict";
angular.module('ZJSY_WeChat')

.controller('TestController', function($scope){

        $scope.name = "test";
        $scope.title = `Hello ${$scope.name}`;
});