"use strict";
angular.module('ZJSY_WeChat').controller('AddressAccountController',function($scope){
    $scope.address={
        title:'收货地址',
        user:'张三丰',
        telphhone:'13890876674',
        city:'苏州市',
        district:'吴中区',
        garden:'青溪花园',
        house:'72#',
        room:'101室'
    }
    console.log('hahah');
});