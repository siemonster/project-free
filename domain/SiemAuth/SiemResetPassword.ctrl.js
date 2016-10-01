SiemApp.controller('SiemResetPassword', function($scope, $mongoSitesApi) {
    $scope.requestResetPassword = function() {
        $mongoSitesApi.reqest_reset_password();
    }
});