var gulp = require('gulp');
var merge = require('merge-stream');
var clean = require('gulp-clean');
var replace = require('gulp-string-replace');
var del = require('del');

gulp.task('clean', function() {
  return gulp.src('./src/assets/sohoxi', {read:false})
    .pipe(clean());
});

/**
 * Angular-CLI does not support copying assets from outside the
 * source folder, so this gulp target will copy the necessary files
 * from the sohoxi dist folder to the assets folder in the src folder.
 */
gulp.task("copy-assets", gulp.series('clean', function () {
  var css = gulp.src('./node_modules/ids-enterprise/dist/css/**/*.css')
    .pipe(gulp.dest('./src/assets/sohoxi/css'));

  var css_map = gulp.src('./node_modules/ids-enterprise/dist/css/**/*.css.map')
    .pipe(gulp.dest('./src/assets/sohoxi/css'));

  var svg = gulp.src('./node_modules/ids-enterprise/dist/svg/**/*.html')
    .pipe(gulp.dest('./src/assets/sohoxi/svg'));

  return merge(css, css_map, svg);
}));

/**
 * Generate a folder with just the needed files for an npm publish.
 * The publish action is in the npm scripts (npm run publish-setup)
 */
gulp.task('publish-clean', function() {
 return del(['publish/**/*', '!publish/package.json']);
});

gulp.task('publish-copy', function() {
  var folder = gulp.src('./src/soho/**/!(*.spec.ts)')
      .pipe(gulp.dest('./publish/soho'));

  var idx = gulp.src(['./index.d.ts'])
    .pipe(replace(/src\//g, function () {
        return '';
    }))
    .pipe(gulp.dest('./publish'));

  var ts = gulp.src(['./index.ts'])
    .pipe(replace(/src\//g, function () {
        return '';
    }))
    .pipe(gulp.dest('./publish'));

  var other = gulp.src(['./src/polyfills.ts', 'README.MD', './src/typings.d.ts'])
      .pipe(gulp.dest('./publish'));

  return merge(folder, idx, ts, other);
});

gulp.task('publish-replace', function() {
  var icons = gulp.src(['./publish/soho/icon/soho-icons.component.ts'])
    .pipe(replace('../../../node_modules/ids-enterprise/dist/svg/svg.html', '../../../ids-enterprise/dist/svg/svg.html'))
    .pipe(gulp.dest('./publish/soho/icon/'));

  var extended = gulp.src(['./publish/soho/icon/soho-icons-extended.component.ts'])
    .pipe(replace('../../../node_modules/ids-enterprise/dist/svg/svg-extended.html', '../../../ids-enterprise/dist/svg/svg-extended.html'))
    .pipe(gulp.dest('./publish/soho/icon/'));

  var empty = gulp.src(['./publish/soho/icon/soho-icons-empty.component.ts'])
    .pipe(replace('../../../node_modules/ids-enterprise/dist/svg/svg-empty.html', '../../../ids-enterprise/dist/svg/svg-empty.html'))
    .pipe(gulp.dest('./publish/soho/icon/'));

  return merge(empty, extended, icons);
});

gulp.task('publish', gulp.series('publish-clean', 'publish-copy', 'publish-replace'));
