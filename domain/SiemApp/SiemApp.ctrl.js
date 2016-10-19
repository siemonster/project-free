SiemApp.controller('SiemApp', function ($scope, SiemAuth, $state, $stateParams) {

    $scope.vm = {};
    $scope.links = [];
    $scope.vm.SiemAuth = SiemAuth;

    SiemAuth.checkLogin(function (loggedin) {

        if (!loggedin) {
            $state.go('auth');
            return;
        }

        var j = 1;
        for (var i in SiemAuth.User.frames) if (SiemAuth.User.frames.hasOwnProperty(i)) {
            if (typeof SiemAuth.User.frames[i] == 'string') {
                $scope.links.push({title: i, url: SiemAuth.User.frames[i], id: 'link' + j});
            } else if (typeof SiemAuth.User.frames[i] == 'object') {
                $scope.links.push({
                    title: i,
                    url: SiemAuth.User.frames[i].url,
                    id: 'link' + j,
                    sub_links: SiemAuth.User.frames[i].sub_links
                });
            }
            j++;
        }

        if ($stateParams.slinkId) {
            var link = $scope.links.filter(function (it) {
                return it.title == $stateParams.linkId
            })[0];

            $scope.vm.active_link = link.sub_links[$stateParams.slinkId].title;
        } else if ($stateParams.linkId) {
            $scope.vm.active_link = $scope.links.filter(function (it) {
                return it.title == $stateParams.linkId
            })[0].title;
        } else {
            $scope.vm.active_link = ($scope.links[0] || {}).title;
        }

        $scope.$$phase || $scope.$apply();
    });

    $scope.logout = function () {
        SiemAuth.logout(function () {
            $state.go('auth');
        });
    };

    $scope.$watch('vm.active_link', function (nV, oV) {
        if (oV !== nV) {
            var link;
            if (link = $scope.links.filter(function (it) {
                    return it.title == nV
                })[0]) {
                $state.go('app', {linkId: link.title, slinkId: null}, {notify: false});
            } else {
                for (var i = 0; i < $scope.links.length; i++) {
                    if ($scope.links[i].sub_links && (link = $scope.links[i].sub_links.filter(function (it) {
                            return it.title == nV
                        })[0])) {
                        $state.go('app', {slinkId: link.title}, {notify: false});
                        break;
                    }
                }
            }
        }
    })
});