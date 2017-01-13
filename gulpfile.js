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
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

var paths = {
  sass: ['./scss/**/*.scss'],
  jade: ['./jade/**/*.jade'],
  jslint: ['./www/js/**/*.js', './www/views/**/*.js'],
  movefiles: [
    './www/fonts/**/*.*',
    './www/img/**/*.*',
    './www/templates/**/*.*',
    './www/pdf/**/*.*',
    './www/manifest.json',
    './www/browserconfig.xml',
    './www/favicon.ico'
  ]
};

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
  return gulp.src('./www/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'));
});


gulp.task('clean', function(){
  return gulp.src(['dist/*'], {read:false})
  .pipe(clean());
});


gulp.task('movefiles', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  return gulp.src(paths.movefiles, { base: './www/' })
  .pipe(gulp.dest('dist'));
});


// BUILD =>
// This will run in this order: 
// * clean 
// * useref
// * minify-css' and annotate in parallel 
// * uglify-js
// * movefiles
// * Finally call the callback function

gulp.task('build', function(callback) {
  runSequence('clean', 'useref', 'minify-css', 'annotate', 'uglify-js', 'movefiles', callback);
});

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
