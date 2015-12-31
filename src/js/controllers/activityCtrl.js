"use strict";
angular.module('ZJSY_WeChat').controller('ActivityController',function($scope,$state,$http){

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1

    });


    $scope.hots = [
        {
            id : 7,
            name : "中餐盒饭1",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg",
            detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
        },
        {
            id : 10,
            name : "中餐盒饭4",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg",
            detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"

        },
        {
            id : 11,
            name : "中餐盒饭5",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg",
            detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"

        },
        {
            id : 12,
            name : "中餐盒饭6",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg",
            detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"

        },
        {
            id : 13,
            name : "西餐咖啡1",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg",
            detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"

        },
        {
            id : 14,
            name : "西餐咖啡2",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg",
            detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"

        }
    ]
})