var gulp   = require('gulp');
var babel  = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var sources = ["./src/bootstrap.js", "./src/**/*.js"];

gulp.task('babel', function () {
  gulp.src(sources)
    .pipe(babel())
    .pipe(concat('store-api-client-foodio.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  return gulp.watch(sources, ['babel']);
});

gulp.task('default', ['babel', 'watch']);
