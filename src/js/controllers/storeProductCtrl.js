"use strict";
angular.module('ZJSY_WeChat').controller('StoreProductController', function($scope,$timeout,$http,$q){

    $scope._ = _;
    

    $scope.$parent.title = $scope.$parent.storeTitle;

    console.log($scope.$parent.$parent.cart,$scope.$parent.$parent.storeId);

    $scope.cart = $scope.$parent.$parent.cart;

    $scope.notice = {
        title :  "本店推出30元起送货上门服务，欢迎预定!",
        content : `本地现在冲100元送10元，欢迎充值！\n
                    本地现在冲100元送10元，欢迎充值！\n
                    本地现在冲100元送10元，欢迎充值！\n
                    本地现在冲100元送10元，欢迎充值！\n
                    本地现在冲100元送10元，欢迎充值！`
    };

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
            storeId : $scope.$parent.storeId
        }).success(function(data){
            _.forEach(data.data,function(pro,index){
                $scope.proList.push({
                    id : pro.id,
                    name : pro.name,
                    num : pro.amount,
                    img : pro.img ? pro.img : "images/ph_1.jpg",
                    detail : pro.specification,
                    cateId : pro.category,
                    price : pro.marketPrice
                });
            })
        })
    });

    $scope.hotList = [];
    $scope.$parent.storePromise.then(function(){
        return $http.post(X_context.api + 'product/list',{
            storeId : $scope.$parent.storeId,
            isHot : true
        }).success(function(data){
            _.forEach(data.data,function(pro,index){
                $scope.hotList.push({
                    id : pro.id,
                    name : pro.name,
                    num : pro.amount,
                    img : pro.img ? pro.img : "images/ph_1.jpg",
                    detail : pro.specification,
                    cateId : pro.category,
                    price : pro.marketPrice
                });
            })
        })
    });

    $q.all([catePromise,productPromise]).then(function(){

        console.log('$scope.cateList',$scope.cateList)
        _.forEach($scope.cateList,function(item,index){
            item.products = _.filter($scope.proList,{cateId : item.id});
        });
    });

    $scope.hots = $scope.hotList;
    //    [
    //    {
    //        id : 7,
    //        name : "中餐盒饭1",
    //        price : "18.5",
    //        num : "5",
    //        img : "images/ph_1.jpg",
    //        detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //    },
    //    {
    //        id : 10,
    //        name : "中餐盒饭4",
    //        price : "18.5",
    //        num : "5",
    //        img : "images/ph_1.jpg",
    //        detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //    },
    //    {
    //        id : 11,
    //        name : "中餐盒饭5",
    //        price : "18.5",
    //        num : "5",
    //        img : "images/ph_1.jpg",
    //        detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //    },
    //    {
    //        id : 12,
    //        name : "中餐盒饭6",
    //        price : "18.5",
    //        num : "5",
    //        img : "images/ph_1.jpg",
    //        detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //    },
    //    {
    //        id : 13,
    //        name : "西餐咖啡1",
    //        price : "18.5",
    //        num : "5",
    //        img : "images/ph_1.jpg",
    //        detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //    },
    //    {
    //        id : 14,
    //        name : "西餐咖啡2",
    //        price : "18.5",
    //        num : "5",
    //        img : "images/ph_1.jpg",
    //        detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //    }
    //]

    $scope.cates = $scope.cateList;
    //    [
    //    {
    //        name : "中式快餐",
    //        sec : "cate1",
    //        products : [
    //            {
    //                id : 7,
    //                name : "中餐盒饭1",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 8,
    //                name : "中餐盒饭2",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 9,
    //                name : "中餐盒饭3",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 10,
    //                name : "中餐盒饭4",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 11,
    //                name : "中餐盒饭5",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 12,
    //                name : "中餐盒饭6",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //        ]
    //    },
    //    {
    //        name : "西餐咖啡",
    //        sec : "cate2",
    //        products : [
    //            {
    //                id : 13,
    //                name : "西餐咖啡1",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 14,
    //                name : "西餐咖啡2",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 15,
    //                name : "西餐咖啡3",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 16,
    //                name : "西餐咖啡4",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            }
    //        ]
    //    },
    //    {
    //        name : "面食面条",
    //        sec : "cate3",
    //        products : [
    //            {
    //                id : 17,
    //                name : "面食面条1",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 18,
    //                name : "面食面条2",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 19,
    //                name : "面食面条3",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 20,
    //                name : "面食面条4",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 21,
    //                name : "面食面条5",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 22,
    //                name : "面食面条6",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //        ]
    //    },
    //    {
    //        name : "馄饨砂锅",
    //        sec : "cate4",
    //        products : [
    //            {
    //                id : 23,
    //                name : "馄饨砂锅1",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 24,
    //                name : "馄饨砂锅2",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 25,
    //                name : "馄饨砂锅3",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 26,
    //                name : "馄饨砂锅4",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 27,
    //                name : "馄饨砂锅5",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //            {
    //                id : 28,
    //                name : "馄饨砂锅6",
    //                price : "18.5",
    //                num : "5",
    //                img : "images/ph_1.jpg",
    //                detail : "鸡腿饭是一道菜，使用鸡腿、青椒、黄瓜、米饭做成。依据食谱步骤来完成这道料理。照烧（照り焼き，てりやき，Teriyaki），知名日本菜肴及烹饪方法。"
    //
    //            },
    //        ]
    //    }
    //];






    $scope.productDetail = {};
    $scope.productShown = false;

    //$scope.showCart = false;
    //$scope.toggleCart = function(){
    //   $scope.showCart =  !$scope.showCart;
    //   $scope.$parent.showCart = $scope.showCart;
    //};


    $scope.mainHeight = $('body').css('height').split('px')[0] -
        $('.navTop').css('height').split('px')[0] -
        150-
        $('header').css('height').split('px')[0];

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
            $scope.cart.products.push(
                _.clone(_.find($scope.proList,{id:id}))
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
        if($scope.cart.products.length == 0){
            $scope.showCart = false;
        }
    };

    $scope.showProduct = function(id){
        //get data from api instead
        $scope.productDetail = _.find($scope.proList,{id:id});
        if($scope.productDetail){
            $scope.productShown = true;
        }
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