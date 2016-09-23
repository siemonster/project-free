SiemApp.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

    $stateProvider
        .state('init', {
            url: '/init',
            templateUrl: '/domain/SiemApp/SiemAppInit.html'
        })
        .state('app', {
            url: '/app',
            templateUrl: '/domain/SiemApp/SiemApp.html'
        })
    ;

    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get("$state");
        $state.go("init");
    });

    $httpProvider.interceptors.push(function ($q) {
        return {
            request: function (config) {
                return config;

            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    location.href = '/';
                } else {
                    return $q.reject(rejection);
                }
            }
        };
    });
});