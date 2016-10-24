SiemApp.controller('SiemAppWelcome', function($scope, SiemAuth, $state) {

    $scope.links = [];

    $scope.vm = {};
    $scope.vm.loading = true;

    SiemAuth.checkLogin(function(loggedin) {

        $scope.vm.loading = false;

        if(!loggedin) {
            $state.go('auth');
            return;
        }

        $scope.vm.SiemAuth = SiemAuth;

        var j = 1;
        for(var i in SiemAuth.User.frames) if(SiemAuth.User.frames.hasOwnProperty(i)) {
            if(typeof SiemAuth.User.frames[i] == 'string') {
                $scope.links.push({title: i, url: SiemAuth.User.frames[i], id: 'link' + j});
            } else if (typeof SiemAuth.User.frames[i] == 'object') {

                $scope.links.push({
                      title: i
                    , type: SiemAuth.User.frames[i].type || ''
                    , login: SiemAuth.User.frames[i].login || ''
                    , password: SiemAuth.User.frames[i].password || ''
                    , url: SiemAuth.User.frames[i].url
                    , id: 'link' + j
                    , sub_links: SiemAuth.User.frames[i].sub_links || null
                });
            }
            j++;
        }

        $scope.$$phase || $scope.$apply();
    });

    $scope.logout = function() {
        SiemAuth.logout(function() {
            $state.go('auth');
        });
    };

});