SiemApp.controller('SiemAppInit', function($scope, $location) {
    if(localStorage.loggedIn) {
        $location.path('/app');
    } else {
        $location.path('/auth');
    }
});