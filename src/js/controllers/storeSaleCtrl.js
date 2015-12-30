"use strict";
angular.module('ZJSY_WeChat').controller('StoreSaleController',function($scope,$http){
    "use strict";
    $scope._ = _;

    $scope.$parent.title = $scope.$parent.storeTitle;

    console.log($scope.$parent.$parent.cart,$scope.$parent.$parent.storeId);

    $scope.cart = $scope.$parent.$parent.cart;

    $scope.hots = [];
    $scope.$parent.storePromise.then(function(){
        return $http.post(X_context.api + 'product/list',{
            storeId : $scope.$parent.storeId,
            isFav : "true",
            isMarketable : true
        }).success(function(data){
            _.forEach(data.data,function(pro,index){
                $scope.hots.push({
                    id : pro.id,
                    name : pro.name,
                    num : pro.amount,
                    img : pro.image,
                    detail : pro.specification,
                    cateId : pro.category,
                    price : pro.marketPrice,
                });
            })
            $scope.hots = _.filter($scope.hots,function(n){
                return n.num && (n.num > 0);
            })
        })
    });

    //$scope.hots = [
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

    $scope.productDetail = {};
    $scope.prodectShown = false;


    $scope.mainHeight = X_context.bodyHeight -
        $('.navTop').css('height').split('px')[0];


    $scope.addProduct = function(id){
        console.log(id);
        var exist = _.find($scope.cart.products,{id:id});
        if(exist){
            if(exist.buyNum < exist.num)
                exist.buyNum ++;
        }else{
            $scope.cart.products.push(
                _.clone(_.find($scope.hots,{id:id}))
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
        console.log(id);
        $scope.productDetail = _.find($scope.hots,{id:id});
        if($scope.productDetail){
            $scope.prodectShown = true;
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

});