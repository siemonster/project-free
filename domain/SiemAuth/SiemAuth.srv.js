SiemApp.service('SiemAuth', function ($mongoSitesApi, $state) {

    var _this = this;

    window.SiemAuth = this;

    this.loggedInPromiseSuccess = null;

    this.loggedInPromise = new Promise(function (cb, fb) {
        _this.loggedInPromiseSuccess = cb;
    });

    this.getLoggedInPromise = function () {
        return this.loggedInPromise;
    };

    this.loginUser = function (email, password, cb, fb) {
        $mongoSitesApi.auth(email, password)
            .then(function (data) {
                _this.User = {login: email};
                _this.loggedInPromiseSuccess();
                cb(data)
            })
            .catch(function (error) {
                fb(error);
            });
    };

    this.logoutUser = function (cb) {
        $mongoSitesApi.auth_logout().then(function () {
            cb();
        })
    };

    this.registerUser = function (login, password, options, cb, fb) {
        var user = {
            _id: login,
            password: password
        };
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                user[i] = options[i]
            }
        }
        $mongoSitesApi.auth_register(user)
            .then(function (result) {
                cb(result);
            })
            .catch(function (error) {
                fb(error);
            });
    };

    this.logout = function(cb) {
        $mongoSitesApi.auth_logout()
            .then(function() {
                cb && cb();
            })
    };

    this.checkLogin = function (cb) {
        $mongoSitesApi.auth_check()
            .then(function (logged_in) {
                _this.User = logged_in;

                if (logged_in) {
                    _this.loggedInPromiseSuccess();
                }

                cb && cb(logged_in);
            });
    };

    return this;

});