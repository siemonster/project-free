SiemApp.controller('SiemApp', function ($scope, $window, $timeout, SiemAuth, $state, $stateParams) {

    $scope.vm = {};
    $scope.links = [];
    $scope.vm.SiemAuth = SiemAuth;

    $scope.windowWidth = $window.innerWidth;
    $window.onresize = function(event) {
        $timeout(function() {
        $scope.windowWidth = $window.innerWidth;
        });
    };

    $scope.replace_http = function(it) { return it.replace(/^https?:/,'');};

    var handlers411, handlers_ir, handlers_minemeld;

    function createQueue(array) {
        array.reduce(function (current, next) {
            return current.then(function() {
                return next.fn();
            }, function() {
                return current.fn();
            });
        }, new Promise(function(res, rej) { res() }) ).then(function () {
            //all executed
        });
    }

    var waitIframeIdReady = function(iframe_el) {
        return new Promise(function(res, rej) {
            (function waitForElement() {
                if (!iframe_el) {
                    setTimeout(waitForElement, 200);
                } else {
                    var ready = false;

                    (function waitForWindowReady() {
                        if (!ready) {
                            iframe_el.contentWindow.postMessage('console.log(window.disableAgent);if(!window.disableAgent)top.postMessage("ready", "*")', '*');
                            setTimeout(waitForWindowReady, 250);
                        }
                    })();

                    window.addEventListener('message', function eh(event) {
                        if (event.data == 'ready') {
                            ready = true;
                            window.removeEventListener('message', eh);
                            res();
                        }
                    });
                }
            })();
        })
    };

    SiemAuth.checkLogin(function (loggedin) {

        if (!loggedin) {
            $state.go('auth');
            return;
        }

        $scope.linksWidth = 0;

        var j = 1;
        for (var i in SiemAuth.User.frames) if (SiemAuth.User.frames.hasOwnProperty(i)) {

            $scope.linksWidth += 40 + (i.length * 7);

            if (typeof SiemAuth.User.frames[i] == 'string') {
                $scope.links.push({title: i, url: SiemAuth.User.frames[i], id: 'link' + j});
            } else if (typeof SiemAuth.User.frames[i] == 'object') {

                $scope.links.push({
                      title: i
                    , type: SiemAuth.User.frames[i].type || ''
                    , url: SiemAuth.User.frames[i].url
                    , login: SiemAuth.User.frames[i].login || ''
                    , password: SiemAuth.User.frames[i].password || ''
                    , id: 'link' + j
                    , sub_links: SiemAuth.User.frames[i].sub_links || null
                });
            }
            j++;
        }

        $scope.linksWidth += 40 + ("Home".length * 8);
        $scope.linksWidth += 40 + ("Logout".length * 10);
        $scope.linksWidth += 40 + ("Profile".length * 10);

        if ($stateParams.slinkId) {
            var link = $scope.links.filter(function (it) {
                return it.title == $stateParams.linkId
            })[0];

            $scope.vm.active_link = link.sub_links.filter(function (it) {
                return it.title == $stateParams.slinkId
            })[0].title;
        } else if ($stateParams.linkId) {
            $scope.vm.active_link = $scope.links.filter(function (it) {
                return it.title == $stateParams.linkId
            })[0].title;
        } else {
            $scope.vm.active_link = ($scope.links[0] || {}).title;
        }

        function serializable_operation(fn) {
            this.fn = fn;
            this.args = [].map.call(arguments, function (it) {
                return it;
            });
            this.args.shift();
            this.args = angular.copy(this.args);
        }

        serializable_operation.prototype.postToFrame = function (frame) {
            document.querySelector(frame).contentWindow.postMessage('(' + this.fn.toString() + ')(' + JSON.stringify(this.args).replace(/^\[|\]$/g, '') + ')', '*');

            return new Promise(function (resolve, reject) {
                window.addEventListener('message', function eh(e) {
                    window.removeEventListener('message', eh);
                    resolve(e);

                    //if(e.data == 'page_reload') reject(e);
                }, false);
            });
        };

        var frame;

        $scope.links.map(function (link) {
            if (link.type == '411') {

                handlers411 = [
                    { // wait
                        fn: function() {
                            return waitIframeIdReady(document.querySelector('iframe[src="' + $scope.replace_http(link.url) + '"]'));
                        }
                    },
                    {
                        fn: function() {
                            new serializable_operation(
                                function () { // will be executed in iframe
                                    top.postMessage('Redirecting to login page...', '*');
                                    location.href = '/login';
                                },
                                link
                            ).postToFrame('iframe[src="' + $scope.replace_http(link.url) + '"]');
                        }
                    },
                    {
                        fn: function() {
                            return new Promise(function(res, rej) {
                                setTimeout(function() {res()}, 1000);
                            })
                        }
                    },
                    { // wait
                        fn: function() {
                            return waitIframeIdReady(document.querySelector('iframe[src="' + $scope.replace_http(link.url) + '"]'));
                        }
                    },
                    {
                        fn: function() {
                            new serializable_operation(
                                function (link) {

                                    //window.addEventListener('beforeunload', function b() {
                                    //    console.log(321321);
                                    //    window.removeEventListener('beforeunload', b);
                                    //    top.postMessage('page_reload', '*');
                                    //});
                                    //
                                    //console.log(document.querySelector('#login-form input[name="name"]'));


                                    (function waitForm() {
                                        if (document.querySelector('#login-form input[name="name"]')) {
                                            document.querySelector('#login-form input[name="name"]')    .value = link.login;
                                            document.querySelector('#login-form input[name="password"]').value = link.password;
                                            $('#login-button').trigger('click');
                                        } else {
                                            setTimeout(waitForm, 250);
                                        }
                                    })();
                                },
                                link
                            ).postToFrame('iframe[src="' + $scope.replace_http(link.url) + '"]')
                        }
                    }
                ];
            } else if (link.type == 'ir') {
                handlers_ir = [
                    { // wait
                        fn: function() {
                            return waitIframeIdReady(document.querySelector('iframe[src="' + $scope.replace_http(link.url) + '"]'));
                        }
                    },
                    {
                        fn: function() {
                            new serializable_operation(
                                function (link) {
                                    (function waitFormOrLogoutButton() {
                                        if (document.querySelector('.form-signin input[name="username"]')) {
                                            document.querySelector('.form-signin input[name="username"]').value = link.login;
                                            document.querySelector('.form-signin input[name="password"]').value = link.password;
                                            $('.form-signin button').trigger('click');
                                        } else if(document.querySelector('.usergreet a[href="/logout/"]')) {
                                            console.log('Nothing to do...');
                                        } else {
                                            setTimeout(waitFormOrLogoutButton, 250);
                                        }
                                    })();
                                },
                                link
                            ).postToFrame('iframe[src="' + $scope.replace_http(link.url) + '"]')
                        }
                    }
                ];
            } else if (link.type == 'minemeld') {
                handlers_minemeld = [
                    { // wait
                        fn: function() {
                            return waitIframeIdReady(document.querySelector('iframe[src="' + $scope.replace_http(link.url) + '"]'));
                        }
                    },
                    {
                        fn: function() {
                            return new serializable_operation(
                                function () { // will be executed in iframe
                                    (function waitForAngular() {
                                        if(!window.angular) setTimeout(waitForAngular, 150);
                                        else {
                                            disableAgent = true;
                                            window.angular.reloadWithDebugInfo();
                                            top.postMessage('Reloading angular', '*');
                                        }
                                    })();
                                },
                                link
                            ).postToFrame('iframe[src="' + $scope.replace_http(link.url) + '"]');
                        }
                    },
                    {
                        fn: function() {
                            return new Promise(function(res, rej) {
                                setTimeout(function() {res()}, 1000);
                            })
                        }
                    },
                    { // wait
                        fn: function() {
                            return waitIframeIdReady(document.querySelector('iframe[src="' + $scope.replace_http(link.url) + '"]'));
                        }
                    },
                    {
                        fn: function() {
                            return new serializable_operation(
                                function () { // will be executed in iframe
                                    (function waitForAngular() {
                                        if(!window.angular) setTimeout(waitForAngular, 150);
                                        else {
                                            top.postMessage('Angular ready', '*');
                                            //window.angular.reloadWithDebugInfo();
                                        }
                                    })();
                                },
                                link
                            ).postToFrame('iframe[src="' + $scope.replace_http(link.url) + '"]');
                        }
                    },
                    {
                        fn: function() {
                            return new serializable_operation(
                                function (link) {
                                    (function waitFormOrLogoutButton() {

                                        if (document.querySelector('#username') && document.querySelector('#username').getBoundingClientRect()) {
                                            angular.element(document.querySelector('#username')).scope().login.username = link.login;
                                            angular.element(document.querySelector('#password')).scope().login.password = link.password;
                                            $('#login-form button').trigger('click');
                                        } else if(document.querySelector('a[title="logout"]')) {
                                            console.log('Nothing to do...');
                                        } else {
                                            setTimeout(waitFormOrLogoutButton, 250);
                                        }
                                    })();
                                },
                                link
                            ).postToFrame('iframe[src="' + $scope.replace_http(link.url) + '"]')
                        }
                    }
                ];
            }
        });

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

                switch (link.type) {
                    case '411':
                        (function waitHandlers() {
                            if(!handlers411.length) {
                                setTimeout(waitHandlers, 150);
                            } else {
                                createQueue(handlers411);
                            }
                        })();
                        break;
                    case 'ir':
                        (function waitHandlers() {
                            if(!handlers_ir.length) {
                                setTimeout(waitHandlers, 150);
                            } else {
                                createQueue(handlers_ir);
                            }
                        })();
                        break;
                    case 'minemeld':
                        (function waitHandlers() {
                            if(!handlers_minemeld.length) {
                                setTimeout(waitHandlers, 150);
                            } else {
                                createQueue(handlers_minemeld);
                            }
                        })();
                        break;
                }

                if(link.type == '411')  {
                    (function waitHandlers() {
                        if(!handlers411.length) {
                            setTimeout(waitHandlers, 150);
                        } else {
                            createQueue(handlers411);
                        }
                    })();
                }
            } else {
                for (var i = 0; i < $scope.links.length; i++) {
                    if ($scope.links[i].sub_links && (link = $scope.links[i].sub_links.filter(function (it) {
                            return it.title == nV
                        })[0])) {
                        $state.go('app', {linkId: $scope.links[i].title, slinkId: link.title}, {notify: false});
                        break;
                    }
                }
            }
        }
    })
});
