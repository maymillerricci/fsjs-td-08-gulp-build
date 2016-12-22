var gulp = require('gulp'),
     del = require('del');

var options = {
  dist: 'dist'
}

// gulp scripts:
// concatenate, minify, copy all js -> all.min.js
// -> copy -> dist/scripts
// with source map
gulp.task('scripts');

// gulp styles:
// complie scss files -> css,
// concatenate all and minify -> all.min.css
// -> copy -> dist/styles
// with source map
gulp.task('styles');

// gulp images:
// optimize size of jpeg & png files
// -> copy -> dist/content
gulp.task('images');

// delete everything in dist directory
gulp.task('clean', function() {
  del(options.dist);
});

// run clean task first, then run scripts, styles, & images tasks
gulp.task('build', ['clean'], function() {
  // scripts, styles, images
});

// run build task
gulp.task('default', function() {
  gulp.start('build');
});
