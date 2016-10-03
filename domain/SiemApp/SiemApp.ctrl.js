SiemApp.controller('SiemApp', function($scope, SiemAuth, $state, $stateParams) {

    $scope.vm = {};
    $scope.links = [];
    $scope.vm.SiemAuth = SiemAuth;

    SiemAuth.checkLogin(function(loggedin) {

        if(!loggedin) {
            $state.go('auth');
            return;
        }

        var j = 1;
        for(var i in SiemAuth.User.frames) if(SiemAuth.User.frames.hasOwnProperty(i)) {
            $scope.links.push({title: i, url: SiemAuth.User.frames[i], id: 'link' + j});
            j++;
        }

        $scope.vm.active_link = (($stateParams.linkId ? $scope.links.filter(function(it) { return it.id == $stateParams.linkId })[0] : $scope.links[0]) || {}).title;
        $scope.$$phase || $scope.$apply();
    });

    $scope.logout = function() {
        SiemAuth.logout(function() {
            $state.go('auth');
        });
    };

    $scope.$watch('vm.active_link', function(nV, oV) {
        if(oV !== nV) {
            $state.go('app', { linkId: $scope.links.filter(function(it) { return it.title == nV })[0].id }, {notify: false});
        }
    })
});