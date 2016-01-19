"use strict";
angular.module('ZJSY_WeChat').controller('CompanyShowController',function($scope,$state,$http,$stateParams){

    console.log($stateParams.isAuth);

    $scope.isAuth = $stateParams.isAuth;

    $scope.total = 0;

    $scope.page = 1;

    $scope.activities = [];
    $scope.bannerList = [];

    $scope.goDetail = function(id){
        $state.go('activityDetail',{activityId : id,showSubmit:false})
    }

    $scope.getOrder = function(){
        $http.post(X_context.api + 'info/listCompanyShow',
            {
                "page" : $scope.page,
                "pageSize" : 6
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
                        id : order.activityId
                    })
                });
                $scope.bannerList = _.filter($scope.activities,{showBanner : true});
                $scope.$$postDigest(function(){
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 1
                    });
                });
            });
    }
    $scope.getOrder();


    $(".main").on('scroll',function() {

        if( $('.actitity-sec').scrollTop() + $('.actitity-sec').height() > $('.activityList').height() + 200){
            $scope.page++;
            if($scope.activities.length >= $scope.total)return;
            $scope.getOrder();
            $scope.$digest();
        }
    });

})