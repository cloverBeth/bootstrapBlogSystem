"use strict";

angular.module('ZJSY_WeChat').controller('BusinessListController', function($rootScope,$http,$scope,Upload){
    $scope.title="商家列表";
    $scope.businesslist=[];

    $http.post(X_context.api+"store/list",{})
    .success(function (data) {
        if (data.data.length==0 || !data.data){return;}
            console.log(data.data);
        _.forEach(data.data, function (item, index) {
            $scope.businesslist.push({
                image: X_context.devHost + item.listImage,
                advas: item.propaganda,
                id : item.id

            });
            console.log(item.listImage);
        })


        //for (var i in data.data) {
        //    $scope.businesslist.image = data.data[i].listImage;
        //    $scope.businesslist.advas = data.data[i].propaganda;
        // }

    })

})


