"use strict";
angular.module('ZJSY_WeChat').controller('StoreController', function($scope,$location){
    $scope.isActive = function (route) {
        if(_.indexOf($location.path().split('/'),route.split('/')[1])>0){
            return true;
        }else{
            return false;
        }
    }

});