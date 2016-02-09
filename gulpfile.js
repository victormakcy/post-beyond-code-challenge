var gulp = require('gulp'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat');

var config = {
    lib: './client/assets/lib'
}

gulp.task('bower', function() {
    return bower().pipe(gulp.dest(config.lib));
});

gulp.task('uglify', ['bower'], function () {
    return gulp.src('client/app/**/*.js') //select all javascript files under js/ and any subdirectory
        .pipe(concat('application.min.js')) //the name of the resulting file
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('client/public/js')); //the destination folder
});

gulp.task('minify-css', ['bower'], function() {
    return gulp.src('client/assets/css/*.css')
        .pipe(concat('application.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('client/public/css'));
});

gulp.task('dist', ['uglify', 'minify-css']);

gulp.task('watch', ['bower', 'dist'], function () {
    var watchFiles = [
        'client/**/*'
    ]

    return gulp.watch(watchFiles, ['dist']);
});

gulp.task('default', ['bower', 'dist', 'watch']);
