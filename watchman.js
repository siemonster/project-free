var watchman = require('fb-watchman');
var client = new watchman.Client();
var colors = require('colors');

var sys = require('sys');
var exec = require('child_process').exec;

var dir_of_interest = process.env.PROJECTPATH + '/domain';
var app_relative_path = 'domain';

client.capabilityCheck({optional: [], required: ['relative_root']},
    function(error, resp) {
        if (error) {
            console.log(error);
            client.end();
            return;
        }

        // Initiate the watch
        client.command(['watch-project', dir_of_interest],
            function(error, resp) {
                if (error) {
                    console.error('Error initiating watch:', error);
                    return;
                }

                if ('warning' in resp) {
                    console.log('warning: ', resp.warning);
                }

                console.log(('watch established on ' + resp.watch +
                    ' | relative_path' + resp.relative_path).green);

                make_subscriptions(client, resp.watch, app_relative_path);
            });


        // todo: watch gulpfile
    });


function make_subscriptions(client, watch, relative_path) {
    var sub_js = {
        expression: ['allof', ['match', '*.js']],
        fields: ['name', 'size', 'exists', 'type']
    };

    var sub_css = {
        expression: ['anyof', ['match', '*.css'], ['match', '*.scss']],
        fields: ['name', 'size', 'exists', 'type']
    };

    var sub_gulpfile = {
        expression: ['allof', ['match', 'Gulpfile.js']],
        fields: ['name', 'size', 'exists', 'type']
    };

    if (relative_path) {
        sub_js.relative_root = relative_path;
        sub_css.relative_root = relative_path;
        sub_gulpfile.relative_root = process.env.PROJECTPATH;
    }

    client.command(['subscribe', watch, 'js_build_subscription', sub_js],
        function(error, resp) {
            if (error) {
                // Probably an error in the subscription criteria
                console.error('failed to subscribe: ', error);
                return;
            }
            console.log(('\nsubscription ' + resp.subscribe + ' established').magenta);
        });

    client.command(['subscribe', watch, 'css_build_subscription', sub_css],
        function(error, resp) {
            if (error) {
                // Probably an error in the subscription criteria
                console.error('failed to subscribe: ', error);
                return;
            }
            console.log(('\nsubscription ' + resp.subscribe + ' established').magenta);

            // run build for external css files on the lunch
            exec('gulp css-externals-build', function (err, stdout, stderr) {
                console.log('stdout: ' + stdout);
                if (stderr) console.log('stderr: ' + stderr);
            });
        }
    );

    client.command(['subscribe', watch, 'gulpfile_subscription', sub_gulpfile],
        function(error, resp) {
            if (error) {
                // Probably an error in the subscription criteria
                console.error('failed to subscribe: ', error);
                return;
            }
            console.log(('\nsubscription ' + resp.subscribe + ' established').magenta);
        });

    client.on('subscription', function(resp) {
        if (resp.subscription == 'js_build_subscription') {
            exec('gulp js-build', function(err, stdout, stderr) {
                console.log('stdout: \n' + stdout);
                if(stderr) console.log('stderr: \m' + stderr);
            });
        }

        if (resp.subscription == 'css_build_subscription') {
            exec('gulp sass-build', function(err, stdout, stderr) {
                console.log('stdout: \n' + stdout);
                if(stderr) console.log('stderr: \m' + stderr);
            });
        }

        if (resp.subscription == 'gulpfile_subscription') {
            exec('gulp css-externals-build', function(err, stdout, stderr) {
                console.log('stdout: \n' + stdout);
                if(stderr) console.log('stderr: \m' + stderr);
            });

            exec('gulp js-build', function(err, stdout, stderr) {
                console.log('stdout: \n' + stdout);
                if(stderr) console.log('stderr: \m' + stderr);
            });
        }

        for (var i in resp.files) {
            var f = resp.files[i];
            console.log('Changed file: ' + f.name);
        }
    });

    client.on('connect', function(res) {
        exec('gulp css-externals-build', function(err, stdout, stderr) {
            console.log('stdout: \n' + stdout);
            if(stderr) console.log('stderr: \m' + stderr);
        });
    });
}