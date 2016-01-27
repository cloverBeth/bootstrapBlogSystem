"use strict";
angular.module('ZJSY_WeChat').controller('AllActivityController',function($scope,$state,$http,$stateParams){

    console.log($stateParams.isAuth);

    $scope.isAuth = $stateParams.isAuth;

    $scope.total = 0;

    $scope.page = 1;

    $scope.activities = [];
    $scope.bannerList = [];

    $scope.goDetail = function(id){
        $state.go('activityDetail',{activityId : id})
    }

    let first = true;

    $http.post(X_context.api + 'activity/listAll',
        {
            "page" : $scope.page,
            "pageSize" : 5,
            "showBanner" : 1
        }).success(function(data){
            _.forEach(data.data,function(order,i){
                $scope.bannerList.push({
                    name : order.title,
                    img : X_context.devHost + order.image,
                    content : order.subtitle,
                    showBanner : order.showBanner == 1,
                    bannerImg : X_context.devHost + order.banner,
                    id : order.activityId,
                    submitted : $scope.isAuth && order.memberId == X_context.memberId,
                    expired : order.enddate < Date.now()
                })
            });

            $scope.$$postDigest(function(){
                if(!first)return;
                first = false;
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 1
                });
            });
        });

    $scope.getOrder = function(){
        $http.post(X_context.api + 'activity/listAll',
            {
                "page" : $scope.page,
                "pageSize" : 8
            }).success(function(data){
                if(!data.data[0])return;
                $scope.total = data.data[0].countTotal;
                _.forEach(data.data,function(order,i){
                    $scope.activities.push({
                        name : order.title,
                        img : X_context.devHost + order.image,
                        content : order.subtitle,
                        showBanner : order.showBanner == 1,
                        bannerImg : X_context.devHost + order.banner,
                        id : order.activityId,
                        submitted : $scope.isAuth && order.memberId == X_context.memberId,
                        expired : order.enddate < Date.now()
                    })
                });

            });
    };

    $scope.getOrder();

    $scope.goMy = function(){
        if(!$scope.isAuth){
            $state.go('login');
        }else{
            $state.go('myActivity');
        }
    }

    $(".main").on('scroll',function() {

        if( $('.actitity-sec').scrollTop() + $('.actitity-sec').height() > $('.activityList').height() + 200){
            $scope.page++;
            if($scope.activities.length >= $scope.total)return;
            $scope.getOrder();
            $scope.$digest();
        }
    });

})