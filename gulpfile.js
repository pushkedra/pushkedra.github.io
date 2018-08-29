/*Lets bring es6 to es5 with this.
 Babel - converts ES6 code to ES5 - however it doesn't handle imports.
 Browserify - crawls your code for dependencies and packages them up
 into one file. can have plugins.
 Babelify - a babel plugin for browserify, to make browserify
 handle es6 including imports.*/

let gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    buffer = require('vinyl-buffer');

gulp.task('es6-home_page', function () {
    browserify({ debug: true })
        .transform("babelify", {presets: ['es2015']})
        .require(['./_assets/js/reusable/polyfills.js', './_assets/js/global.js', `./_assets/js/home-page.js`], { entry: true })
        .bundle()
        .on('error', gutil.log)
        .pipe(source(`home-page.min.js`))
        .pipe(buffer()) // convert from streaming to buffered vinyl file object
        .pipe(uglify()) // now gulp-uglify works
        .pipe(size({
            title: `size of home-page.min.js`
        }))
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function () {
    gulp.watch('./_assets/js/**/*.js', ['es6-home_page']);
});

gulp.task('default', ['clean'], function () {
    gulp.start('es6-home_page', 'watch');
});

gulp.task('clean', function () {
    return gulp.src(['js'], {read: false})
        .pipe(clean());
});