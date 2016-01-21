"use strict";
angular.module('ZJSY_WeChat').controller('GetOrderController', function($scope,$location,$state,$stateParams,$http,$rootScope){
    $scope.order = $scope.$parent.order;
    $scope.cart = $scope.$parent.cart[X_context.storeId || 1];
    $scope.freight = 0;
    $scope.showToggle = false;
    $scope.couponId = null;
    $scope.couponProductId = null;
    $scope._ = _;
    $scope.showCouponProduct = false;

    //$scope.username = "陈冠希";
    //$scope.phone = "13232311009";
    //$scope.address = "香港XX摄影工作室";
    //买赠券 买送券

    $scope.payOption = "delivery";
    $scope.couponList = [];


    var posted = false;
    $scope.totalPrice = 0;
    _.forEach($scope.order.product, function (item, index) {
            $scope.totalPrice += item.price * item.buyNum;
    });

    $scope.freight = $scope.totalPrice < $scope.cart.min ? $scope.cart.freightFee : 0;


    $scope.$parent.memberPromise.then(function () {
        $http.post(X_context.api + "addr/list", {
            memberId: X_context.memberId,
            addrId:$stateParams.addrId,
        })
            .success(function (data) {

                var datas = data.data;
                if(!datas[0])return;
                $scope.username = datas[0].receiver;
                $scope.phone = datas[0].mobile;
                $scope.address = datas[0].addressFullname;
            })

        //coupon
        $http.get(X_context.api + `coupon/myCouponForStore/${$scope.order.storeId}/${$scope.totalPrice}`)
        .success(function(data){
                console.log(data)
                _.forEach(data.data,function(item,i){
                    $scope.couponList.push(item);
                })
            });
    });

    $scope.$watch('couponId',function(couponId,old){
        if(couponId == old)return;
        let coupon = _.find($scope.couponList,{couponId : couponId});
        if(coupon
            &&coupon.type == "买赠券"
            &&coupon.products
            &&coupon.products.length > 0){
            $scope.showCouponProduct = true;
            $scope.couponProductId = _.find($scope.couponList,{couponId : couponId}).products[0].productId;
        }else{
            $scope.showCouponProduct = false;
        }
    });

    $scope.postOrder = function(){
        if(posted == true)return;
        posted = true;
        var orderList = [];
        _.forEach($scope.order.product,function(item,index){
            orderList.push({
                productId : item.id,
                quantity : item.buyNum,
                unitPrice : item.price
            });
        });
        if(orderList.length == 0
            || !$scope.order.storeId
            || !$scope.address
            || !$scope.payOption
            || !$scope.phone
            || !$scope.username){
            $rootScope.$broadcast('alerts',{type:'danger',message:'请填写订单必要字段。'});
            return;
        }

        $http.post(X_context.api + 'order/add',{
                "storeId" : $scope.order.storeId,
                "address" : $scope.address,
            "orderStatus" : "未处理",
              "payMethod" : $scope.payOption=="delivery"?"现金":"一卡通",
                  "phone" : $scope.phone,
               "receiver" : $scope.username,
             "orderItems" : orderList

        }).success(function(data){
            $scope.cart.products = [];
            $scope.order.product = [];
            $state.go('orderSucceed',{orderId:data.data[0]._id});

            });

        $http.post(X_context.api+'product/list',{
            "storeId" : $scope.order.storeId,
             "productId":$stateParams.productId
        }).success(function(data){
            var amount=data.data[0].amount;
            $scope.amount=data.data[0].amount;
            console.log($scope.amount);
            if(parseInt($scope.amount.length)<=0){
                $rootScope.$broadcast('alerts',{type:'danger',message:'商品被抢光啦～'});
                return;
            }

        });

    };



    $scope.postOrderAndPay = function(){

        if(posted == true)return;
        posted = true;
        var orderList = [];
        _.forEach($scope.order.product,function(item,index){
            orderList.push({
                productId : item.id,
                quantity : item.buyNum,
                unitPrice : item.price
            });
        });
        if(orderList.length == 0
            || !$scope.order.storeId
            || !$scope.address
            || !$scope.payOption
            || !$scope.phone
            || !$scope.username){
            $rootScope.$broadcast('alerts',{type:'danger',message:'请填写订单必要字段。'});
            return;
        }
        $http.post(X_context.api + 'order/add',{
            "storeId" : $scope.order.storeId,
            "address" : $scope.address,
            "orderStatus" : "未处理",
            "payMethod" : $scope.payOption=="delivery"?"现金":"一卡通",
            "phone" : $scope.phone,
            "receiver" : $scope.username,
            "orderItems" : orderList

        }).success(function(data){
            $scope.cart.products = [];
            $scope.order.product = [];
            if(!$scope.couponId){
                return $state.go('cardLogin',{from:{fromOrder : true,orderId : data.data[0]._id}});
            }
            $http.post(X_context.api + 'coupon/useWeixinCoupon',
                {
                    couponId : $scope.couponId,
                    orderId : data.data[0]._id,
                    items : [
                        {
                            productId : $scope.couponProductId,
                            price : 0
                        }
                    ]
                }).success(function(){
                    $state.go('cardLogin',{from:{fromOrder : true,orderId : data.data[0]._id}});
                })

        });
    }


    $scope.goIndex=function(){
        $state.go('store.product',{storeId:X_context.storeId});
    }


});