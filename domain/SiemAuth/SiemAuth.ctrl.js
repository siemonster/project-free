SiemApp.controller('SiemAuth', function($scope, $location) {

    $scope.do_login = function() {
        if($scope.login == 'test' && $scope.password == 'test') {
            localStorage.loggedIn = true;
            $location.path('/app');
        } else {
            $scope.message = 'Login and password does not match'
        }
    };

});