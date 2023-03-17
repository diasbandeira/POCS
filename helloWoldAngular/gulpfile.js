var gulp = require('gulp');
var concat = require('gulp-concat');

var js = [
    './node_modules/angular/angular.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js'
];

gulp.task('default', async function() {
    gulp.src(js)
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('./js/'));
});