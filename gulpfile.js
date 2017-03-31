var gulp = require('gulp');
var merge = require('merge-stream');
var clean = require('gulp-clean');

/**
 * Angular-CLI does not support copying assets from outside the
 * source folder, so this gulp target will copy the necessary files
 * from the sohoxi dist folder to the assets folder in the src folder.
 */
gulp.task("copy-assets", ["clean"], function () {
    var css = gulp.src('./node_modules/@infor/sohoxi/dist/css/**/*.css')
        .pipe(gulp.dest('./src/assets/sohoxi/css'))

    var css_map = gulp.src('./node_modules/@infor/sohoxi/dist/css/**/*.css.map')
        .pipe(gulp.dest('./src/assets/sohoxi/css'))

    var svg = gulp.src('./node_modules/@infor/sohoxi/dist/svg/**/*.html')
        .pipe(gulp.dest('./src/assets/sohoxi/svg'))

    return merge(css, css_map, svg);
});

gulp.task('clean', function(){
    return gulp.src('./src/assets/sohoxi', {read:false})
      .pipe(clean())
});
