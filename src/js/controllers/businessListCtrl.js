"use strict";

angular.module('ZJSY_WeChat').controller('BusinessListController', function($rootScope,$scope){
    $scope.title="商家列表";

    //
    //$scope.upload = function (files) {
    //    if(!files[0])return;
    //    var file = files[0];
    //    Upload.upload({
    //        url: '/api/'+X_context.ver + '/member/uploadAvatar',
    //        file: file
    //    }).progress(function (evt) {
    //
    //    }).success(function (data, status, headers, config) {
    //        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
    //        $rootScope.$broadcast('avatarChange');
    //    }).error(function (data, status, headers, config) {
    //        console.log('error status: ' + status);
    //    })
    //}

})