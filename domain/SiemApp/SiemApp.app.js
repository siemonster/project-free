var SiemApp = angular.module('siem-app', ['ui.router', 'ui.bootstrap', 'mongoSitesApi']);

SiemApp.directive('dynamicIframe', function($compile) {
    return {
        restrict: 'E',
        compile: function() {
            return {
                post: function(scope, el, attr) {
                    console.log(el[0].innerHTML='<iframe name="' + attr.name  + '"'+ (attr.dynamicIframeSrc ? ' src="' + attr.dynamicIframeSrc + '"' : '') +'></iframe>');
                }
            }
        }
    }
});