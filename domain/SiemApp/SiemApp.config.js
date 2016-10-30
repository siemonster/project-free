SiemApp.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

    $stateProvider
        .state('init', {
            url: '/init',
            templateUrl: '/domain/SiemApp/SiemAppInit.html'
        })
        .state('app', {
            url: '/app/:linkId/:slinkId',
            templateUrl: '/domain/SiemApp/SiemApp.html'
        })
        .state('welcome', {
            url: '/welcome',
            templateUrl: '/domain/SiemApp/SiemAppWelcome.html'
        })
    ;

    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get("$state");
        $state.go("welcome");
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