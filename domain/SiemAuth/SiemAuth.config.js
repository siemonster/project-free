SiemApp.config(function ($stateProvider) {

    $stateProvider
        .state('auth', {
            url: '/auth',
            templateUrl: './domain/SiemAuth/SiemAuth.html'
        })
        .state('register_activate', {
            url: '/register_activate',
            templateUrl: './domain/SiemAuth/SiemRegisterActivate.html'
        })
        .state('reset_password', {
            url: '/reset_password',
            templateUrl: '/domain/SiemAuth/SiemResetPassword.html'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: '/domain/SiemAuth/SiemProfile.html'
        })
    ;
});