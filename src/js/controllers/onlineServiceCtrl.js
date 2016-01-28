"use strict";
angular.module('ZJSY_WeChat').controller('OnlineServiceController', function($rootScope,$scope,$http,$state) {
    $scope.title = "线上物业";


    $scope.$parent.memberPromise.then(function() {

        $http.post(X_context.api + "services/list", {
            "memberid": X_context.memberId,
            "servicesId": 1

        }).success(function(data){
            $scope.onlineTel=data.data[0].mobile;
        })
    })

})