'use strict';

var sourcemaps = require('gulp-sourcemaps');
require('es6-promise').polyfill();

var
	  gulp 			= require('gulp')
	, sass         	= require('gulp-sass')
	, pkg 			= require('./package.json')
	, plumber      	= require('gulp-plumber')
	, autoprefixer 	= require('gulp-autoprefixer')
	, concat 		= require('gulp-concat')
	, tap 			= require('gulp-tap')
	, uglify 		= require('gulp-uglify')
	, ngAnnotate 	= require('gulp-ng-annotate')
	, minifyCss 	= require('gulp-minify-css');

var
	  running_task 	= process.argv[2] || 'default'
	, _bypass 		= function() {
		return tap(function () {})
	};

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

var path_libs_js = [
	// libs
	'bower_components/es6-promise/es6-promise.auto.js',
	'bower_components/angular/angular.min.js',

	// angular modules
	'bower_components/angular-ui-router/release/angular-ui-router.js',
	'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',

	 // internal project files,
	'domain/SiemApp/SiemApp.app.js',
	'domain/**/*.config.js',

	'domain/SiemApp/SiemAPI.js',

	'domain/**/*.ctrl.js',
	'domain/**/*.comp.js',
	'domain/**/*.dir.js',
	'domain/**/*.srv.js'
];

var path_libs_css = [
	  'bower_components/angular-bootstrap/ui-bootstrap-csp.css'
	, 'bower_components/bootstrap/dist/css/bootstrap.css'
	, 'bower_components/bootstrap/dist/css/bootstrap-theme.css'
];

gulp.task('js-build', function () {
	gulp.src(path_libs_js)
		.pipe(sourcemaps.init())
		.pipe(ngAnnotate())
		.pipe(running_task != 'js-build' ? _bypass() : tap(function(f) { f.contents = new Buffer('document.write(\'<script src="' + f.path.replace(process.cwd(), '')
				.replaceAll('\\','/') // fix paths for windows
			+ '"><\/script>\')') }))
		.pipe(concat(pkg.name + '.js', {newLine: '\n;'}))
		.pipe(running_task != 'js-build' ? _bypass() : uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'))
		.on('end', function () {
			console.log('[' + new Date + '] js compiled')
		})
});

// styles build

gulp.task('css-externals-build', function () {
	gulp.src(path_libs_css)
		.pipe(running_task == 'css-externals-build' ? _bypass() : minifyCss())
		.pipe(concat('external-styles.css'))
		.pipe(gulp.dest('dist'));
});


gulp.task('sass-build', function () {
	gulp.src('domain/main.scss')
		.pipe(plumber())
		.pipe(sass({sass: 'sass', css: 'css'}))
		.pipe(autoprefixer())
		.pipe(running_task == 'sass-build' ? _bypass() : minifyCss())
		.pipe(gulp.dest('dist'))
		.on('end', function () {
			console.log('[' + new Date + '] scss compiled for sass')
		});
});

gulp.task('default', ['js-build', 'css-externals-build', 'sass-build']);

gulp.task('watch'  , ['js-build', 'sass-build', 'css-externals-build'], function () {
  gulp.watch( '**/*.scss', ['sass-build']);
  gulp.watch(['**/*.js', '!dist/*.js', '**/*.html'], ['js-build']) // decrease CPU usage
      .on('change', function(file) {
        console.log('changed', file);
      });
});

