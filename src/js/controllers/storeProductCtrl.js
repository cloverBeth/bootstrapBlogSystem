
"use strict";
angular.module('ZJSY_WeChat').controller('StoreProductController', function($scope,$timeout,$http,$q,$stateParams,$rootScope){

    if(!X_context.loaded){
        $rootScope.$broadcast('showLoading');
        X_context.loaded = true;
    }
    $scope._ = _;


    $scope.$parent.title = $scope.$parent.storeTitle;

    $scope.cart = $scope.$parent.cart;

    $scope.cateList = [];
    $scope.proList = [];


    var catePromise =
    $scope.$parent.storePromise.then(function(){
        return  $http.post(X_context.api + 'category/list',{
                storeId : $scope.$parent.storeId
            }).success(function(data){
            _.forEach(data.data,function(cate,index){
                $scope.cateList.push({
                    name : cate.categoryName,
                    sort : cate.sort,
                    id : cate.id
                });
                _.sortBy($scope.cateList,function(n){
                    return n.sort;
                })
                for(let i in $scope.cateList){
                    $scope.cateList[i].sec = `sec${parseInt(i)+1}`;
                }
            })
        })
    });

    var productPromise =
    $scope.$parent.storePromise.then(function(){
        return $http.post(X_context.api + 'product/list',{
            storeId : $scope.$parent.storeId,
            isMarketable : true
        }).success(function(data){
            _.forEach(data.data,function(pro,index){
                $scope.proList.push({
                    id : pro.id,
                    name : pro.name,
                    num : pro.amount,
                    img : pro.image ? X_context.devHost+pro.image : "images/ph_1.jpg",
                    detail : pro.specification,
                    cateId : pro.category,
                    price : pro.marketPrice,

                });
            })

            $scope.proList = _.filter($scope.proList,function(n){
                return n.num && (n.num > 0);
            })
        })
    });

    $scope.hotList = [];
    $scope.$parent.storePromise.then(function(){
        return $http.post(X_context.api + 'product/list',{
            storeId : $scope.$parent.storeId,
            isHot : true,
            isMarketable : true
        }).success(function(data){
            _.forEach(data.data,function(pro,index){
                $scope.hotList.push({
                    id : pro.id,
                    name : pro.name,
                    num : pro.amount,
                    img : pro.image ? X_context.devHost+pro.image : "images/ph_1.jpg",
                    detail : pro.specification,
                    cateId : pro.category,
                    price : pro.marketPrice,

                });
            })
            $scope.hotList = _.filter($scope.hotList,function(n){
                return n.num && (n.num > 0);
            })
        })
    });

    $q.all([catePromise,productPromise]).then(function(){

        _.forEach($scope.cateList,function(item,index){
            item.products = _.filter($scope.proList,{cateId : item.id});
        });
        if($stateParams.productId){
            console.log('hahaha',$scope.proList);
            $scope.showProduct($stateParams.productId);
        }
        $rootScope.$broadcast('hideLoading');
        $scope.hots = $scope.hotList;

        $scope.cates = $scope.cateList;

    });






    $scope.productDetail = {};
    $scope.productShown = false;

    //$scope.showCart = false;
    //$scope.toggleCart = function(){
    //   $scope.showCart =  !$scope.showCart;
    //   $scope.$parent.showCart = $scope.showCart;
    //};


    //$scope.mainHeight = $('body').css('height').split('px')[0] -
    //    $('.navTop').css('height').split('px')[0] -
    //    $scope.$parent.navHeight-
    //    $('header').css('height').split('px')[0];
    $scope.$parent.bannerPromise.then(function(){
        $scope.$watch('$parent.navHeight',function(){
            console.log($('.footer').css('height').split('px')[0]);
            $scope.mainHeight = X_context.bodyHeight -
                47-//$('.navTop').css('height').split('px')[0] -
                $scope.$parent.navHeight-
                43;//$('header').css('height').split('px')[0];
        })
    })


    //$scope.proList = [];
    //_.forEach($scope.cates,function(cate,index){
    //    $scope.proList = $scope.proList.concat(cate.products);
    //});

    $scope.addProduct = function(id){
        var exist = _.find($scope.cart.products,{id:id});
        if(exist){
            if(exist.buyNum < exist.num)
                exist.buyNum ++;
        }else{
            if(_.find($scope.proList,{id:id})){
                $scope.cart.products.push(
                    _.clone(_.find($scope.proList,{id:id}))
                );
            }else if(_.find($scope.hotList,{id:id})){
                $scope.cart.products.push(
                    _.clone(_.find($scope.hotList,{id:id}))
                );
            }

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
        if($scope.cart.products.length == 0){
            $scope.showCart = false;
        }
    };

    $scope.showProduct = function(id){
        //get data from api instead
        $scope.productDetail = _.find($scope.proList,{id:parseInt(id)});
        if($scope.productDetail){
            $scope.productShown = true;
        }
    }

    $scope.scrolled = false;

    $scope.setFocus = function($index){
        $scope.scrolled = true;
        var index = parseInt($index)+1;
        $(".sideNav li a").removeClass("hover");
        $(".sideNav li:eq("+index+") a").addClass("hover");
        setTimeout(function() {$scope.scrolled = false;}, 250);
    }



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

    var scrollPass = true;
    $scope.$$postDigest(function(){
        scrollPass = true;
    });
    $scope.$parent.$$postDigest(function(){
        scrollPass = true;
    });


    $(".greens").on('scroll',function() {

        if(!scrollPass){
            return;
        }else{
            scrollPass = false;
        }

        var headerTop = $(".header").height()+$scope.$parent.navHeight+$(".sound").height()+$(".navTop").height();

        if($scope.$parent.navHeight == 150){
            if(parseInt($(".greens ul:eq(0)").offset().top) < (headerTop)){
                $scope.$parent.navHeight = 0;
                //$scope.$apply();
                $scope.$digest();
                $scope.$parent.$digest();

            }
            scrollPass = true;
        }
        else if($scope.$parent.navHeight == 0 && !$scope.$parent.noBanner) {
            if (parseInt($(".greens ul:eq(0)").offset().top) >= (headerTop)) {
                $scope.$parent.navHeight = 150;
                //$scope.$apply();
                $scope.$digest();
                $scope.$parent.$digest();
            }
            scrollPass = true;
        }else{
            scrollPass = true;
        }



        if(!$scope.scrolled) {
            for(var i=0;i<$(".greens ul").length;i++)
            {
                var top = parseInt($(".greens ul:eq("+i+")").offset().top);

                if(top < headerTop + 30)
                {
                    $(".sideNav li a").removeClass("hover");
                    $(".sideNav li:eq("+i+") a").addClass("hover");

                }
            }
        }

        //var cateHeight = $('.sideNav li .hover').offset().top;
        //
        //if(cateHeight + 45 > X_context.bodyHeight - 42) { //cateHeight:45, footerHeight:42
        //    $('.sideNav').scrollTop( $('.sideNav').scrollTop() + 45 );
        //} else if(cateHeight < headerTop) {
        //    $('.sideNav').scrollTop( $('.sideNav').scrollTop() - 45 );
        //}

    });

    $scope.hideProduct = function(){
        $scope.productShown=false;
        $stateParams.productId = null;
    }

});
