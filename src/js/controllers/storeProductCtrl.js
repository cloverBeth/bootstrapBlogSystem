"use strict";
angular.module('ZJSY_WeChat').controller('StoreProductController', function($scope,$timeout){

    $scope._ = _;

    $scope.notice = {
        title :  "本店推出30元起送货上门服务，欢迎预定!"
    };

    $scope.hots = [
        {
            id : 7,
            name : "中餐盒饭1",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg"
        },
        {
            id : 10,
            name : "中餐盒饭4",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg"
        },
        {
            id : 11,
            name : "中餐盒饭5",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg"
        },
        {
            id : 12,
            name : "中餐盒饭6",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg"
        },
        {
            id : 13,
            name : "西餐咖啡1",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg"
        },
        {
            id : 14,
            name : "西餐咖啡2",
            price : "18.5",
            num : "5",
            img : "images/ph_1.jpg"
        }
    ]

    $scope.cates = [
        {
            name : "中式快餐",
            sec : "cate1",
            products : [
                {
                    id : 7,
                    name : "中餐盒饭1",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 8,
                    name : "中餐盒饭2",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 9,
                    name : "中餐盒饭3",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 10,
                    name : "中餐盒饭4",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 11,
                    name : "中餐盒饭5",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 12,
                    name : "中餐盒饭6",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
            ]
        },
        {
            name : "西餐咖啡",
            sec : "cate2",
            products : [
                {
                    id : 13,
                    name : "西餐咖啡1",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 14,
                    name : "西餐咖啡2",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 15,
                    name : "西餐咖啡3",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 16,
                    name : "西餐咖啡4",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                }
            ]
        },
        {
            name : "面食面条",
            sec : "cate3",
            products : [
                {
                    id : 17,
                    name : "面食面条1",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 18,
                    name : "面食面条2",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 19,
                    name : "面食面条3",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 20,
                    name : "面食面条4",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 21,
                    name : "面食面条5",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 22,
                    name : "面食面条6",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
            ]
        },
        {
            name : "馄饨砂锅",
            sec : "cate4",
            products : [
                {
                    id : 23,
                    name : "馄饨砂锅1",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 24,
                    name : "馄饨砂锅2",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 25,
                    name : "馄饨砂锅3",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 26,
                    name : "馄饨砂锅4",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 27,
                    name : "馄饨砂锅5",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
                {
                    id : 28,
                    name : "馄饨砂锅6",
                    price : "18.5",
                    num : "5",
                    img : "images/ph_1.jpg"
                },
            ]
        }
    ];


    $scope.cart = {
        min : 30,
        products  : [
            //{
            //    id : 27,
            //    name : "馄饨砂锅5",
            //    price : "18.5",
            //    num : "5",
            //    img : "images/ph_1.jpg",
            //    buyNum : 2
            //}
        ]
    };

    $scope.totalPrice = 0;

    $scope.showCart = false;
    $scope.toggleCart = function(){
       $scope.showCart =  !$scope.showCart;
    };

    $scope.$watch('cart.products',function(cart){
        $scope.totalPrice = 0;
        _.forEach($scope.cart.products,function(prod,key){
            $scope.totalPrice += prod.price * prod.buyNum;
        });
    },true);

    $scope.mainHeight = $('body').css('height').split('px')[0] -
        $('.navTop').css('height').split('px')[0] -
        150-
        $('header').css('height').split('px')[0];

    $scope.proLIst = [];
    _.forEach($scope.cates,function(cate,index){
        $scope.proLIst = $scope.proLIst.concat(cate.products);
    })

    $scope.addProduct = function(id){
        if(_.find($scope.cart.products,{id:id})){
            _.find($scope.cart.products,{id:id}).buyNum ++;
        }else{
            $scope.cart.products.push(
                _.clone(_.find($scope.proLIst,{id:id}))
            );
            _.find($scope.cart.products,{id:id}).buyNum = 1;
        }

    };

    $scope.removeProduct = function(id){
        if(!_.find($scope.cart.products,{id:id}))return;
        if(_.find($scope.cart.products,{id:id}).buyNum > 1){
            _.find($scope.cart.products,{id:id}).buyNum --;
        }else{
            $scope.cart.products = _.reject($scope.cart.products,{id:id});
        }
    };

    $scope.fly = function($event){
        flyItem($event);
    }

    function flyItem(event){
        if($('.cart-img-zero').offset().top == 0){
            var offset = $('.cart-img').offset();
        }else{
            var offset = $('.cart-img-zero').offset();
        }

        var flyer = $('<img class="flyer" src="images/bg_5.png"/>');
        flyer.fly({
            start: {
                left: event.pageX,
                top: event.pageY
            },
            end: {
                left: offset.left,
                top: offset.top+10,
                width:0,
                height:0
            },
            peed: 10, //越大越快，默认1.2
            vertex_Rtop:100,
            onEnd: function(){
                $('.flyer').remove();
                $(".shop em").addClass("a-shake");

                setTimeout(function() {
                    $(".shop em").removeClass("a-shake");
                },300)

            }
        });
    }


//jquery
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1

    });

    $(".greens").on('scroll',function() {
        for(var i=0;i<$(".greens ul").length;i++)
        {
            var top = parseInt($(".greens ul:eq("+i+")").offset().top);
            if(top < $(".header").height()+$(".swiper-container").height()+$(".sound").height()+$(".navTop").height()+30)
            {
                $(".sideNav li a").removeClass("hover");
                $(".sideNav li:eq("+i+") a").addClass("hover")
            }

        }

    });

});