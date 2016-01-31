"use strict";

angular.module('ZJSY_WeChat').controller('StoreController', function($scope,$location,$state,$stateParams,$http,$rootScope){
    $scope.storeTitle = "";
    $scope.title = "";
    $scope.navHeight = 150;
    $scope.noBanner = false;

    console.log('storeId',$stateParams.storeId);
    $scope.storeId = $stateParams.storeId || X_context.storeId || 1;
    X_context.storeId = $scope.storeId;
    if($scope.$parent.cart[X_context.storeId]){
        $scope.cart = $scope.$parent.cart[X_context.storeId];
    }else{
        $scope.cart = $scope.$parent.cart[X_context.storeId] = {
            products : [],
            min : 0,
            freightFee : 0
        };
    }

    $scope.isPointStore = false;

    $scope.notice = {};

    $scope.bannerImage = [];

    $scope.storePromise = $http.post(X_context.api + 'store/list',{
        storeId : $scope.storeId,
    }).success(function(data){
        $scope.storeDetail = data.data[0];
        $scope.storeTitle = data.data[0].storeName;
        $scope.title = data.data[0].storeName;
        $scope.cart.min = data.data[0].freight;
        $scope.cart.freightFee = data.data[0].freightfee;
        $scope.notice.title = data.data[0].annTitle;
        $scope.notice.content = data.data[0].announcement;
        X_context.isPointStore = $scope.isPointStore = (data.data[0].flag2 == "1");
    });


    //轮播图
    $scope.bannerPromise = $http.post(X_context.api + 'banner/list',{
        storeId : $scope.storeId
    }).success(function(data){
        //data.data = [];
        if (data.data.length==0 || !data.data){
            $scope.navHeight = 0;
            $scope.noBanner = true;
            return;
        }
        _.forEach(data.data,function(banner,index){
            if(!banner.url || !banner.image)return;
            $scope.bannerImage.push({
                url : _.startsWith(banner.url, 'http') ? banner.url : `${location.pathname == "/" ? "" : location.pathname}/#${banner.url}`,
                proId : _.startsWith(banner.url, 'http') ? null : (banner.url.split('store-product')[1]||null),
                image : X_context.devHost + banner.image
            });
        })
        $scope.$$postDigest(function(){

            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 1
            });
        });
    });


    $("#notice").click(function(){
        $(".notice").show();
    })

    $(".close").click(function(){
        $(".notice").hide();
    })

    $scope.isActive = function (route) {
        if(_.indexOf($location.path().split('/'),route.split('/')[1])>0){
            return true;
        }else{
            return false;
        }
    }



    $scope.showCart = false;
    $scope.toggleCart = function(){
        $scope.showCart =  !$scope.showCart;
    };

    $scope.totalPrice = 0;
    $scope.totalPoint = 0;
    $scope.$watch('cart.products',function(cart){
        $scope.totalPrice = 0;
        $scope.totalPoint = 0;
        _.forEach($scope.cart.products,function(prod,key){
            console.log('adsadsa',prod)
            $scope.totalPrice += prod.price * prod.buyNum;
            $scope.totalPoint += prod.point * prod.buyNum;
        });
    },true);

    $scope.addProduct = function(id){
        console.log('id',id);
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

    $scope.goToCart = function(){
        //if($scope.totalPrice == 0)return;
        $state.go('store.cart',{storeId:X_context.storeId});

    }

    $scope.address = {};

    $scope.$on('addressGet',function(name,data){
        console.log(name,data);
        $scope.address = data;
    });

    $scope.getOrder = function(){
        if(!$scope.address.username || !$scope.address.phone || !$scope.address.address){
            $rootScope.$broadcast('alerts',{type:'danger',message:'地址填写不完整。'});
            return;
        }
        //if($scope.totalPrice == 0)return;
        $scope.$parent.order.product = $scope.cart.products;
        $scope.$parent.order.storeId = $scope.storeId;
        $state.transitionTo('getOrder');

    }

    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }

    $scope.getProductLength = function(){
        var length = 0;
        _.forEach($scope.cart.products,function(item,key){
            length += item.buyNum;
        });
        return length;
    }

    $scope.goToUrl = function(url){
        location.href = url;
    }

    $scope.reloadState = function(){
        $state.reload();
    }

});