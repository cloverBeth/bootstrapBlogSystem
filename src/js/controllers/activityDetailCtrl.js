"use strict";
angular.module('ZJSY_WeChat').controller('ActivityDetailController',function($scope,$state,$http,$sce){
    $scope.embedHtml = $sce.trustAsHtml('<div><span style="color: rgb(255, 153, 0);"><span style="background-color: rgb(102, 185, 102);">T</span></span><img src="http://quilljs.com/images/cloud.png" style="color: rgb(255, 153, 0); background-color: rgb(102, 185, 102);"><span style="color: rgb(255, 153, 0);"><span style="background-color: rgb(102, 185, 102);">est1</span></span></div>');
})