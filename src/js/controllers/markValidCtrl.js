"use strict";
angular.module('ZJSY_WeChat').controller('MarkValidController',function($scope,$http,$stateParams){
    "use strict";
    $scope._ = _;
    $scope.proList = [];
    $scope.canLoad = true;
    $scope.page = 1;

    $scope.api = 'mark/list';
    console.log($stateParams.invalid)
    if($stateParams.invalid){
        $scope.api = 'mark/listInvaild';
    }

    $scope.addItems =  function(){
        if(!$scope.canLoad)return;
        $scope.$parent.$parent.memberPromise.then(function(){
            $http.post(X_context.api + $scope.api,
                {
                    "page" : $scope.page,
                    "pageSize" : "7",
                }).success(function(data){
                    if(data.data.length == 0)return;
                    if($scope.proList >= data.data[0].count)return;
                    _.forEach(data.data,function(item,i){
                        $scope.proList.push({
                            name : item.product.name,
                            id : item.productId,
                            price : item.product.marketPrice,
                            img : item.product.image,
                            mark : true
                        });
                    });
                })
        });
    };

    $scope.addItems();

    var markFlag = true;

    $scope.mark = function(id){
        if(!markFlag)return;
        markFlag = false;

        _.find($scope.proList,{id:parseInt(id)}).mark = true;

        $http.post(X_context.api + 'mark/add',{
            productId : id
        }).success(function(){
            markFlag = true;
        });
    }

    $scope.unmark = function(id){
        if(!markFlag)return;
        markFlag = false;

        _.find($scope.proList,{id:parseInt(id)}).mark = false;

        $http.post(X_context.api + 'mark/delete',{
            productId : id
        }).success(function(){
            markFlag = true;
        });
    }


});