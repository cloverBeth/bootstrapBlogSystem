/**
 * Created by gujun on 15/12/4.
 */
angular.module('ZJSY_WeChat').factory('checkAuth', function () {
    return {
        check : function () {
            return X_context.authorization != "guest"
        }
    };
});