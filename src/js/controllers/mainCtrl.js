
angular.module('ZJSY_WeChat')
.controller('MainController', function($scope,$location,$http){
        "use strict";
        $scope.memberPromise = null;
        $scope.cart = {
            products : [
                //{
                //    id: 0,
                //    name: "雀巢麦片",
                //    num: 156,
                //    img: "images/ph_1.jpg",
                //    detail: "营养高，味道好",
                //    cateId: 1,
                //    price: 30,
                //    buyNum: 1
                //}
            ],
            min : 0,
            freightFee : 0
        };
        $scope.order = {
            product : [
                //{
                //    id: 0,
                //    name: "雀巢麦片",
                //    num: 156,
                //    img: "images/ph_1.jpg",
                //    detail: "营养高，味道好",
                //    cateId: 1,
                //    price: 30,
                //    buyNum: 1
                //}
            ]
        };
        if(X_context.authorization && X_context.authorization!=X_context.guest){
            $scope.memberPromise = $http.get(X_context.api + 'member/getCurMem')
                .success(function(data){
                    if(!data.data[0])return;
                    X_context.memberId = data.data[0]._id;
                    X_context.memberPhone = data.data[0].mobile;
                });
        }



});