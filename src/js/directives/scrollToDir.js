/**
 * Created by gujun on 15/12/2.
 */
angular.module('ZJSY_WeChat').directive('scrollOnClick', function() {
    return {
        restrict: 'A',
        link: function(scope, $elm, attrs) {
            var idToScroll = attrs.scrollhref;
            var scrollBase = attrs.scrollbase;
            var scrollFirst = attrs.scrollfirst;
            $elm.on('click', function() {
                var $target;
                if (idToScroll) {
                    $target = $(idToScroll);
                }
                $(scrollBase).animate({scrollTop: ($target.offset().top-$(scrollFirst).offset().top)}, 200);
            });
        }
    }
});