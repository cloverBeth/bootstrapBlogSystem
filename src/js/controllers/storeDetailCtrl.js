"use strict";
angular.module('ZJSY_WeChat').controller('StoreDetailController',function($scope){

    console.log('parent',$scope.$parent);

    $scope.$parent.storePromise.then(function(){
        $scope.storeDetail = {
            name : $scope.$parent.storeDetail.storeName,
            startrule : $scope.$parent.storeDetail.start || '30',
            distribution : $scope.$parent.storeDetail.post || '6',
            intro : $scope.$parent.storeDetail.post || 'the shop is a restaurnt has a long history,' +
                                                'they have delious food,sweet cakes and very good wine,' +
                                                'many rich people go there and enjoy foods.',
            addr : $scope.$parent.storeDetail.address || 'JinJiHu road 1355 park district',
            openTime : $scope.$parent.storeDetail.open || '7:00AM-10:00PM',
            tel : $scope.$parent.storeDetail.telephone
        }
    })
});