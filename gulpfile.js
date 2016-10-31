// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');

// Compile Stylesheets
gulp.task('css', function () {
  var processors = [ autoprefixer({browsers: ['last 1 version']}) ];
    return gulp.src('./scss/all.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['css']);
});

// Default Task
gulp.task('default', ['css', 'watch']);