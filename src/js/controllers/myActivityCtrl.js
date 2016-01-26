"use strict";
angular.module('ZJSY_WeChat').controller('MyActivityController',function($scope,$state,$http,$stateParams){


    $scope.total = 0;

    $scope.page = 1;

    $scope.activities = [];

    $scope.goDetail = function(id){
        $state.go('activityDetail',{activityId : id})
    }

    $scope.canLoad = true;

    $scope.getOrder = function(){
        $http.post(X_context.api + 'activity/my',
            {
                "page" : $scope.page,
                "pageSize" : 8
            }).success(function(data){
                $scope.total = data.data[0].countTotal;
                _.forEach(data.data,function(order,i){
                    $scope.activities.push({
                        name : order.title,
                        img : X_context.devHost + order.image,
                        content : order.subtitle,
                        bannerImg : X_context.devHost + order.banner,
                        id : order.activityId,
                        expired : order.enddate < Date.now()
                    })
                });
                if($scope.activities.length >= $scope.total)$scope.canLoad = false;
                $scope.page++;
            });
    }
    $scope.getOrder();

    $scope.goAll = function(){
        $state.go('allActivity');
    }

    //$(".actitity-sec").on('scroll',function() {
    //    console.log($('.actitity-sec').scrollTop() + $('.actitity-sec').height(),$('.activityList').height())
    //
    //    if( $('.actitity-sec').scrollTop() + $('.actitity-sec').height() > $('.activityList').height() + 40){
    //        $scope.page++;
    //        if($scope.activities.length >= $scope.total)return;
    //        $scope.getOrder();
    //        $scope.$digest();
    //    }
    //});

})