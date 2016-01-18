/**
 * Created by Rick on 15/7/20.
 */
angular.module('ZJSY_WeChat')
    .directive('infiniteScroll', function () {
        return {
            restrict: 'A',
            link:function (scope, element, attrs) {
                var offset = parseInt(attrs.threshold) || 0;
                var e = element[0];

                element.bind('scroll', function () {
                    if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
                        scope.$apply(attrs.infiniteScroll);
                    }
                });
            }
        };
    });
