var less = require('gulp-less');
var uglify = require('gulp-uglify');
var path = require('path');
var gulp = require('gulp'); 
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var mkdirp = require('mkdirp');
var exec = require('child_process').exec;

var scripts = [
    './static/'
];

gulp.task('delete-static', function() {
    return gulp.src('./static', { read: false }) // much faster
        .pipe(rimraf());
});

gulp.task('create-static', ['delete-static'], function(callback) {
    return mkdirp('./static/js', function(error) {
        callback();
    });
});

gulp.task('less', ['clean'], function () {
    return gulp.src('./client/less/**/*.less')
    .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./static/'));
});

gulp.task('images', ['clean'], function() {
    return gulp.src('./client/img/**/*')
    .pipe(gulp.dest('./static/img/'));    
});

gulp.task('browserify', ['clean'], function(cb) {
    return exec('browserify -t reactify -e ./client/src/app.jsx -o ./static/js/all.js', function(error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(error);
    });
});

gulp.task('clean', ['delete-static', 'create-static']);

gulp.task('build', ['clean', 'images', 'browserify', 'less']);

gulp.task('watch', function() {
    gulp.watch(['./client/**/*'], ['build'])
});

gulp.task('default', ['build', 'watch']);