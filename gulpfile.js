var gulp = require('gulp');

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

// gulp clean: 
// deleted everything in dist
gulp.task('clean');

// gulp build:
// clean (first), scripts, styles, images
gulp.task('build');

// gulp:
// = gulp build (default)
gulp.task('default');
