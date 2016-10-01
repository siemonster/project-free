SiemApp.controller('SiemAuth', function($scope, $location, SiemAuth, $state) {

    $scope.am = {
        login: '', password: '', login_error: ''
    };

    SiemAuth.checkLogin(function(loggedin) {
        if(loggedin) {
            $state.go('app');
        }
    });

    $scope.do_login = function() {
        SiemAuth.loginUser(
            $scope.am.login, $scope.am.password,
            function(data) {
                $state.go('welcome');
                $scope.$$phase || $scope.$apply();
            },
            function(message) {
                $scope.am.login_error = 'Login and password do not match.';
                $scope.$$phase || $scope.$apply();
            }
        );
    };
});