SiemApp.controller('SiemProfile', function($scope, $mongoSitesApi, $state, SiemAuth) {
    $scope.SiemAuth = SiemAuth;
    SiemAuth.checkLogin();

    $scope.am = {};


    $scope.requestChangePassword = function() {
        $mongoSitesApi.auth_update({
            _id: SiemAuth.User._id,
            old_password: $scope.am.old_password,
            password: $scope.am.password
        })
    }

});