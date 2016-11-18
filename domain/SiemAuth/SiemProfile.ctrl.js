SiemApp.controller('SiemProfile', function($scope, $mongoSitesApi, $state, SiemAuth) {
    $scope.SiemAuth = SiemAuth;
    SiemAuth.checkLogin();

    $scope.am = {};

    $scope.requestChangePassword = function() {
        $mongoSitesApi.auth_change_password({
            old_password: $scope.am.old_password,
            new_password: $scope.am.password
        })
    }

});