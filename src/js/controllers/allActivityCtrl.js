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

    $scope.getOrder = function(){
        $http.post(X_context.api + 'activity/listAll',
            {
                "page" : $scope.page,
                "pageSize" : 6
            }).success(function(data){
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
    //var activities = [
    //    {
    //        name : "美妙圣诞Party成功举办",
    //        img : "images/activity-new1.jpg",
    //        content : "@Our Christmas Story",
    //        show : false,
    //        link : " https://mp.weixin.qq.com/s?__biz=MzIzOTEwNjgzNg==&mid=403202011&idx=1&sn=5c854fa5803e53f5db52f3bd1dfea43a&scene=1&srcid=1231WWcUyx6rlWZ6kfCSOkKx&key=62bb001fdbc364e50c6da4a5c39611f804b5422c1fb72aa114fafe6f03e7b3392a12862b3c39f94ff0c8cc66c1b02012&ascene=0&uin=MTQzNTQxNzQ2Mg%3D%3D&devicetype=iMac+MacBookAir7%2C1+OSX+OSX+10.10.5+build(14F27)&version=11000006&pass_ticket=3SoZ9BT2BUbmRowouI7iDv6mvx0ZeScPrN7UIdzoTwiUVjIDfaFas9FsK0VwK9h1"
    //    },
    //    {
    //        name : "星云互联 上实智慧",
    //        img : "images/activity-new2.jpg",
    //        content : '源于“天人合一”的中华传统文化',
    //        show : false,
    //        link : "https://mp.weixin.qq.com/s?__biz=MzIzOTEwNjgzNg==&mid=403202011&idx=2&sn=1ae82164314b8e2f8ca1bb3bfc73b6ef&scene=1&srcid=12318HsOSzsrdq1TZDeqHd6N&key=62bb001fdbc364e5a8e8263a37bc9cc7744d24f3b7555f708229b110c1cb5566467bcf289816ad5da554f06bb4ef209c&ascene=0&uin=MTQzNTQxNzQ2Mg%3D%3D&devicetype=iMac+MacBookAir7%2C1+OSX+OSX+10.10.5+build(14F27)&version=11000006&pass_ticket=3SoZ9BT2BUbmRowouI7iDv6mvx0ZeScPrN7UIdzoTwiUVjIDfaFas9FsK0VwK9h1"
    //    },
    //    {
    //        name : "圣诞Party登场，大奖来袭",
    //        img : "images/activity-new3.jpg",
    //        content : "Are you ready?",
    //        show : false,
    //        link : "https://mp.weixin.qq.com/s?__biz=MzIzOTEwNjgzNg==&mid=402231688&idx=1&sn=636d171fa309cca236f52ea1e8541b37&scene=1&srcid=12311vSm1M4fuJB1gPPilRWM&key=62bb001fdbc364e5e1172d55e8c9117c5af9a86075c6ad8e04f7dbf8cc55a67b52917fe3a80f0bc30aa04fea9a50c222&ascene=0&uin=MTQzNTQxNzQ2Mg%3D%3D&devicetype=iMac+MacBookAir7%2C1+OSX+OSX+10.10.5+build(14F27)&version=11000006&pass_ticket=3SoZ9BT2BUbmRowouI7iDv6mvx0ZeScPrN7UIdzoTwiUVjIDfaFas9FsK0VwK9h1"
    //    },
    //    {
    //        name : "辞旧迎新共迎双旦，星云驾到",
    //        img : "images/activity-new4.jpg",
    //        content : "共迎双旦，星云驾到，敬请期待",
    //        show : false,
    //        link : "https://mp.weixin.qq.com/s?__biz=MzIzOTEwNjgzNg==&mid=402231688&idx=2&sn=aa8a2398caae182f78e9f1a27aad32a0&scene=1&srcid=1231683OycMSS8y4moYchFRW&key=62bb001fdbc364e5bcf8ea0fb117ac45aafebbf7f236a6b604a64ac18ba4181f9a15e79a9505a975ec46184527205728&ascene=0&uin=MTQzNTQxNzQ2Mg%3D%3D&devicetype=iMac+MacBookAir7%2C1+OSX+OSX+10.10.5+build(14F27)&version=11000006&pass_ticket=3SoZ9BT2BUbmRowouI7iDv6mvx0ZeScPrN7UIdzoTwiUVjIDfaFas9FsK0VwK9h1"
    //    },
    //    {
    //        name : "关爱您的眼睛，我们用心呵护",
    //        img : "images/activity-new5.jpg",
    //        content : "体验活动之爱眼篇",
    //        link : "https://mp.weixin.qq.com/s?__biz=MzIzOTEwNjgzNg==&mid=401851776&idx=1&sn=5354de8b31e986b37607afe2ebb917fb&scene=1&srcid=1231K2gtvSzX3N0gJnfBkNDK&key=62bb001fdbc364e5c647d63a01252c7e357aea0aee250b172af5d4159d60005962ad82cc86cf15dd5e723881ef2100db&ascene=0&uin=MTQzNTQxNzQ2Mg%3D%3D&devicetype=iMac+MacBookAir7%2C1+OSX+OSX+10.10.5+build(14F27)&version=11000006&pass_ticket=3SoZ9BT2BUbmRowouI7iDv6mvx0ZeScPrN7UIdzoTwiUVjIDfaFas9FsK0VwK9h1"
    //    },
    //    {
    //        name : "瑜伽活动、营养午餐马上开始",
    //        img : "images/activity-new6.jpg",
    //        content : "瑜伽活动就等你了哦",
    //        show : false,
    //        link : "https://mp.weixin.qq.com/s?__biz=MzIzOTEwNjgzNg==&mid=401475815&idx=1&sn=f48c969a1e073652fc5073efd907a323&scene=1&srcid=1231pphke70xIVd9UV2tfC09&key=62bb001fdbc364e5ce4990ee15db007cf70793ad3edf0ce361c3e75575378983c98a3e9c7b4d268a287e0a0bde790220&ascene=0&uin=MTQzNTQxNzQ2Mg%3D%3D&devicetype=iMac+MacBookAir7%2C1+OSX+OSX+10.10.5+build(14F27)&version=11000006&pass_ticket=3SoZ9BT2BUbmRowouI7iDv6mvx0ZeScPrN7UIdzoTwiUVjIDfaFas9FsK0VwK9h1"
    //    }
    //];
})