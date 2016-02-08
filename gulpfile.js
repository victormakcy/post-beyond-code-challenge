var gulp = require('gulp'),
    bower = require('gulp-bower');

var config = {
     bowerDir: './public/bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('default', ['bower']);