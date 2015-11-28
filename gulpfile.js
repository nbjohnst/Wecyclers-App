var gulp = require('gulp');
var sass = require('gulp-sass');
// var browserify = require('browserify');
// var gutil = require('gulp-util');
// var hbsfy = require('hbsfy');
// var del = require('del');
// var source = require('vinyl-source-stream');

// var bundler = browserify({
//   entries: ['./js/index.js'],
//   debug: true
// });

// bundler.transform(hbsfy);
// bundler.on('log', gutil.log); // output build logs to terminal

// gulp.task('build', ['clean'], function () {
//   return bundler.bundle()
//     // log errors if they happen
//     .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('./public/sripts'));
// });

// gulp.task('clean', function (cb) {
//   del('js/bundle.js');
//   cb();
// });

gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']); 
  // gulp.watch('./src/**/*.scss', ['build']);
});

gulp.task('default', ['sass', 'watch'])


