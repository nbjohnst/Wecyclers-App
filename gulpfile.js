var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'sass'])

