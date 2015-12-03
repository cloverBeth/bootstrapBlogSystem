angular.module('ZJSY_WeChat')

.controller('MainController', function($scope,$location){
        "use strict";
        $scope.storeId = $location.search();
        $scope.cart = {
            products : [],
            min : 30
        };
});