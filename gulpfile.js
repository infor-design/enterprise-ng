var gulp = require('gulp');
var merge = require('merge-stream');

/**
 * Angular-CLI does not support copying assets from outside the
 * source folder, so this gulp target will copy the necessary files
 * from the sohoxi dist folder to the assets folder in the src folder.
 */
gulp.task("copy-assets", function () {
    var css = gulp.src('./node_modules/@infor/sohoxi/dist/css/**/*.css')
        .pipe(gulp.dest('./src/assets/css'))

    var svg = gulp.src('./node_modules/@infor/sohoxi/dist/svg/**/*.html')
        .pipe(gulp.dest('./src/assets/svg'))

    return merge(css, svg);
});
