
angular.module('ZJSY_WeChat')
.controller('MainController', function($scope,$location){
        "use strict";
        $scope.cart = {
            products : [
                {
                    id: 0,
                    name: "雀巢麦片",
                    num: 156,
                    img: "images/ph_1.jpg",
                    detail: "营养高，味道好",
                    cateId: 1,
                    price: 30,
                    buyNum: 1
                }
            ],
            min : 0,
            freightFee : 0
        };
        $scope.order = [
            {
                id: 0,
                name: "雀巢麦片",
                num: 156,
                img: "images/ph_1.jpg",
                detail: "营养高，味道好",
                cateId: 1,
                price: 30,
                buyNum: 1
            }
        ];
        X_context.authorization = cookieTool.readCookie('authorization') || X_context.authorization;
});