SiemApp.config(function ($stateProvider) {

    $stateProvider
        .state('auth', {
            url: '/auth',
            templateUrl: './domain/SiemAuth/SiemAuth.html',
            //abstract: true
        })
        //.state('auth.signin', {
        //    url: '/signin',
        //    template: '<siem-signin></siem-signin>'
        //})
        //.state('auth.signup', {
        //    url: '/signup',
        //    template: '<siem-signup></siem-signup>'
        //})
        //.state('auth.signup.confirmEmail', {
        //    url: '/confirmEmail',
        //    template: '<siem-confirm-email></siem-confirm-email>'
        //})
        //.state('auth.resetPassword', {
        //    url: '/resetPassword',
        //    template: '<siem-reset-password></siem-reset-password>'
        //})
    ;
});