"use strict";
angular.module('ZJSY_WeChat').controller('StoreProductController', function($scope){
        var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 1,

        });

        $(".sideNav li a").on("click",function(){
                $(".sideNav li a").removeClass("hover")
                $(this).addClass("hover");

        })
        $(".productList").scroll(function() {
                for(var i=0;i<$(".greens ul").length;i++)
                {
                        var offtop = parseInt($(".greens").offset().top);
                        var top = parseInt($(".greens ul:eq("+i+")").offset().top);
                        if(top < $(".header").height()+$(".swiper-container").height()+$(".sound").height()+$(".navTop").height()+10)
                        {
                                $(".sideNav li a").removeClass("hover")
                                $(".sideNav li:eq("+i+") a").addClass("hover")
                        }

                }

        });

});