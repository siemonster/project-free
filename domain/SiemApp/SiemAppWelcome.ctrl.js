SiemApp.controller('SiemAppWelcome', function($scope, $window, $timeout, SiemAuth, $state) {

    $scope.links = [];

    $scope.windowWidth = $window.innerWidth;
    $window.onresize = function(event) {
        $timeout(function() {
        $scope.windowWidth = $window.innerWidth;
        });
    };

    $scope.vm = {};
    $scope.vm.loading = true;

    $scope.replace_http = function(it) { return it.replace(/^https?:/,'');};

    SiemAuth.checkLogin(function(loggedin) {

        $scope.vm.loading = false;

        if(!loggedin) {
            $state.go('auth');
            return;
        }

        $scope.vm.SiemAuth = SiemAuth;

        $scope.linksWidth = 0;

        var j = 1;
        for(var i in SiemAuth.User.frames) if(SiemAuth.User.frames.hasOwnProperty(i)) {

            $scope.linksWidth += 40 + (i.length * 7);

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

        $scope.linksWidth += 40 + ("Home".length * 8);
        $scope.linksWidth += 40 + ("Logout".length * 10);
        $scope.linksWidth += 40 + ("Profile".length * 10);
        
        $scope.$$phase || $scope.$apply();
    });

    $scope.logout = function() {
        SiemAuth.logout(function() {
            $state.go('auth');
        });
    };

});
