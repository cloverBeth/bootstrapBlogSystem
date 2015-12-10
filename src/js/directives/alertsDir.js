/**
 * Created by gujun on 15/7/8.
 */

angular.module('ZJSY_WeChat')
    .directive('alerts', function ($interval,$timeout) {
        return {
            restrict: 'E',
            template: '<div class="site-alert col-sm-12 ">\
                <div ng-repeat="alert in alerts" class="alert alert-danger alert-dismissible" role="alert">\
                    <button type="button" class="close" data-dismiss="alert" ng-click="closeAlert($index)" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                    <strong>{{alert.msg}}</strong></div>\
                </div>',
            scope: true,
            link: function (scope) {
                scope.alerts = [
                ];


                scope.closeAlert = function(index) {
                    scope.alerts.splice(index, 1);
                };


                //var interval = $interval(function(){scope.alerts = _.drop(scope.alerts)},5000);

                scope.$on(
                    "$destroy",
                    function(  ) {
                        //$interval.cancel(interval);

                    }
                );

                scope.$on('alerts',function(event, alert){
                    scope.alerts.push({type: alert.type, msg: alert.message});
                    $timeout(function(){
                        scope.alerts = _.drop(scope.alerts);
                    },5000);
                })
            }
        };
    });
