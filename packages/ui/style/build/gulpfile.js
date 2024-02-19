import { task, src, dest } from 'gulp';
import cleanCss from 'gulp-clean-css';

task('minify-css', () => {
  return src('../*.css').pipe(cleanCss()).pipe(dest('../dist'));
});
