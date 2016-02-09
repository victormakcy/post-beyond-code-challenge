var gulp = require('gulp'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat');

var config = {
    lib: './client/assets/lib'
}

gulp.task('bower', function() {
    return bower().pipe(gulp.dest(config.lib));
});

gulp.task('uglify', function () {
    return gulp.src('client/app/**/*.js') //select all javascript files under js/ and any subdirectory
        .pipe(concat('application.min.js')) //the name of the resulting file
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('client/public/js')); //the destination folder
});

gulp.task('minify-css', function() {
    return gulp.src('client/assets/css/*.css')
        .pipe(concat('application.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('client/public/css'));
});

gulp.task('dist', ['uglify', 'minify-css']);

gulp.task('watch', function () {
    var watchFiles = [
        'client/**/*'
    ]

    return gulp.watch(watchFiles, ['dist']);
});

gulp.task('default', ['watch']);
