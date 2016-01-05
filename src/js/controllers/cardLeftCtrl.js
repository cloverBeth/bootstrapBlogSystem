"use strict";
angular.module('ZJSY_WeChat').controller('CardLeftController',function($scope,$stateParams,$state){

    $scope.left = $stateParams.left || 0;

});
