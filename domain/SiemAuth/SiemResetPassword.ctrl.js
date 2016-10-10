SiemApp.controller('SiemResetPassword', function($scope, $mongoSitesApi, $state) {

    $scope.am = {
        login: '',
        sent: false,
        password: '',
        token: (location.hash.match(/\?token=(.+)/) || [] )[1]
    };

    setTimeout(function() {
        var el = document.querySelector('.g-recaptcha');
        grecaptcha.render(el, {sitekey: el.getAttribute('data-sitekey')});
    }, 0);

    $scope.requestResetPassword = function() {


        $mongoSitesApi.auth_request_reset_password({_id: $scope.am.login, "g-recaptcha-response": grecaptcha.getResponse()  }, function() { console.log('don') }).then(function(data) {
            console.log('con');
            $scope.am.sent = true;
            $scope.$$phase || $scope.$apply();
        }).catch(function(msg) {
            console.log('ton');
            $scope.am.login_error = msg;
            $scope.$$phase || $scope.$apply();
        });
    };


    $scope.resetPassword = function() {
        $mongoSitesApi.auth_reset_password({password: $scope.am.password}, $scope.am.token).then(function() {
            console.log(123);
            $state.go('auth');
        });
    }

});