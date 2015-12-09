"use strict";
angular.module('ZJSY_WeChat').controller('StoreDetailController',function($scope){

    console.log('parent',$scope.$parent);

    $scope.$parent.storePromise.then(function(){
        $scope.storeDetail = {
            name : $scope.$parent.storeDetail.storeName,
            startrule : $scope.$parent.storeDetail.freight || 0,
            distribution : $scope.$parent.storeDetail.freightfee || 0,
            intro : $scope.$parent.storeDetail.post || 'the shop is a restraunt has a long history',
            addr : $scope.$parent.storeDetail.address,
            openTime : $scope.$parent.storeDetail.worktime,
            tel : $scope.$parent.storeDetail.telephone,
            storeImage : $scope.$parent.storeDetail.image || 'images/ph_3.jpg'

        }
    })
});