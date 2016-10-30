SiemApp.controller('SiemAppInit', function($scope, $state) {
    if(localStorage.loggedIn) {
        $state.go('/app');
    } else {
        $location.path('/auth');
    }

    $state.go('welcome');
});