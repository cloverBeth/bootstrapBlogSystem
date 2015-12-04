"use strict";
angular.module('ZJSY_WeChat').controller('GetOrderController', function($scope,$location,$state,$stateParams){
    $scope.order = $scope.$parent.order;
    console.log('$scope.order',$scope.order);

    $scope.username = "陈冠希";
    $scope.phone = "13232311009";
    $scope.address = "香港XX摄影工作室";

    $scope.order = [
        {
            id : 7,
            name : "中餐盒饭1",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg",
            buyNum : 3,
            detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
        },
        {
            id : 10,
            name : "中餐盒饭4",
            price : "18.5",
            buyNum : 4,
            num : "5",
            img : "images/ph_1.jpg",
            detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"

        },
        {
            id : 11,
            name : "中餐盒饭5",
            price : "18.5",
            buyNum : 4,
            num : "5",
            img : "images/ph_1.jpg",
            detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"

        }
    ];
});