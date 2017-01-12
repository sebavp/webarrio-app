var gulp = require('gulp');
var jade = require( 'gulp-jade' );
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');  


var paths = {
  sass: ['./scss/**/*.scss'],n
  jade: ['./jade/**/*.jade'],
  jslint: ['./www/js/**/*.js', './www/views/**/*.js']
};

// gulp.task( 'default', ['sass', 'jade'] );
gulp.task('serve:before', ['sass', 'watch', 'jade']);

gulp.task('lint', function() {
  return gulp.src(paths.jslint)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task( 'jade', function (done) {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe( gulp.dest('./www/') )
    .on('end', done);
} );

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jslint, ['lint']);
  gulp.watch(paths.jade, ['jade']);
});


gulp.task('minify-css', function() {
  return gulp.src('./dist/assets/build.css')
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('annotate', function () {
return gulp.src('./dist/assets/build.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/assets/', {overwrite: true}));
});

gulp.task('uglify-js', function() {  
    return gulp.src('./dist/assets/build.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('useref', function (done) {
  gulp.src('./www/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'));
});

var filesToMove = [
        './fonts/*.*',
        './img/**/*.*',
        './templates/**/*.*',
        './browserconfig.xml'
        './favicon.ico'
        './manifest.json'
    ];

gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './www' })
  .pipe(gulp.dest('dist'));
});


gulp.task('build', ['useref', 'minify-css', 'annotate', 'uglify-js', 'move']);

// BUILD => useref, minify-css, annotate, uglify-js

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
