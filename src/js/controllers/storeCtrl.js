"use strict";

angular.module('ZJSY_WeChat').controller('StoreController', function($scope,$location,$state,$stateParams,$http,$rootScope){
    $scope.storeTitle = "";
    $scope.title = "";
    $scope.navHeight = 150;

    console.log('storeId',$stateParams.storeId);
    $scope.storeId = $stateParams.storeId || X_context.storeId || 1;
    X_context.storeId = $scope.storeId;
    $scope.cart = $scope.$parent.cart;
    $scope.notice = {};
    $scope.storeImages={
        businessImage:"images/banner.jpg",
    };


    $scope.storePromise = $http.post(X_context.api + 'store/list',{
        storeId : $scope.storeId
    }).success(function(data){

        $scope.storeDetail = data.data[0];
        $scope.storeTitle = data.data[0].storeName;
        $scope.title = data.data[0].storeName;
        $scope.cart.min = data.data[0].freight;
        $scope.cart.freightFee = data.data[0].freightfee;
        $scope.notice.title = data.data[0].annTitle;
        $scope.notice.content = data.data[0].announcement;
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


    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1

    });



    $scope.showCart = false;
    $scope.toggleCart = function(){
        $scope.showCart =  !$scope.showCart;
    };

    $scope.totalPrice = 0;
    $scope.$watch('cart.products',function(cart){
        $scope.totalPrice = 0;
        _.forEach($scope.cart.products,function(prod,key){
            $scope.totalPrice += prod.price * prod.buyNum;
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
        if($scope.totalPrice == 0)return;
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
        if($scope.totalPrice == 0)return;
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

});