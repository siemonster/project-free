SiemApp.controller('SiemResetPassword', function($scope, $mongoSitesApi, $http, $location) {

    $scope.am = {
        login: '',
        sent: false,
        password: '',
        token: (location.hash.match(/\?token=(.+)/) || [] )[1]
    };

    if($scope.am.token) {
        $http(mongoSitesApi._server + '/api/auth/activate?code=' + $scope.am.token).then(function() {
            $location.url('/login');
        })
    }

});