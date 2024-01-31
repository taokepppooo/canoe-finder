const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');

gulp.task('minify-css', () => {
  return gulp.src('../*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('../dist'))
})
