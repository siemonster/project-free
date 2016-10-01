SiemApp.config(function ($stateProvider) {

    $stateProvider
        .state('auth', {
            url: '/auth',
            templateUrl: './domain/SiemAuth/SiemAuth.html'
        })
        .state('reset_password', {
            url: '/reset_password',
            templateUrl: '/domain/SiemAuth/SiemResetPassword.html'
        })
    ;
});