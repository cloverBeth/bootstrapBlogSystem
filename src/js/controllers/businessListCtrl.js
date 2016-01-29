"use strict";

angular.module('ZJSY_WeChat').controller('BusinessListController', function($rootScope,$http,$scope,$state){
    $scope.title="商家列表";
    $scope.businesslist=[];

    $http.post(X_context.api+"store/list",{})
    .success(function (data) {
        if (data.data.length==0 || !data.data){return;}
            //console.log(data.data);
        _.forEach(data.data, function (item, index) {
            $scope.businesslist.push({
                image: X_context.devHost + item.listImage,
                advas: item.propaganda,
                id : item.id,
                closed : item.flag1 == 0

            });
            console.log(item.listImage);

        })


        //for (var i in data.data) {
        //    $scope.businesslist.image = data.data[i].listImage;
        //    $scope.businesslist.advas = data.data[i].propaganda;
        // }

    })
    $scope.gotoStore = function(id){
        //check closed
        if(_.find($scope.businesslist,{id:id}).closed){
            return $rootScope.$broadcast('alerts', {type: 'danger', message: '该店铺已经关闭！'});
        }
        //if not goto store
        $state.go('store.product',{storeId : id})
    }

})


