/**
 * Created by gujun on 15/4/28.
 */
angular.module('ZJSY_WeChat').factory('ajaxInterceptor', function ($q,$rootScope,$location) {
  return {
    response: function (response) {
      if(response.headers()['content-type'] === "application/json; charset=utf-8"){
        // Validate response, if not ok reject
        if( response.data.code && response.data.status ){
          if(response.data.status == "ok" && (response.data.code == "200")){
            return response;
          }else{
              $rootScope.$broadcast('alerts',{type:'danger',message:response.data.message || "系统错误。"});
              return response;
        }
      }
      }
      if(response.data.status == 404 ){
        $rootScope.$broadcast('alerts',{type:'danger',message:'资源不存在。'});
        $location.path('/');
        return response;
      }
      return response;
    },
    responseError: function(response) {
      console.log(response)
      $rootScope.$broadcast('alerts',{type:'danger',message:response.data.message || "系统错误。"});
      return response;
    }
  };
});
